"use client"

import { deleteWish, wishPlaceLists } from "@/utile/api/my-page/my-page";
import { useAuth } from "@/utile/context/AuthContext";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


interface WishlistItem {
    id: number;
    placeId: number;
    placeName: string;
    placeAddr: string;
    reviewRate: number;
    thumbFileImagePath: string;
}

export default function WishList() {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const SERVER_PORTS = [8081, 8082, 8083]; // 사용할 포트 목록

    const getImageSrc = (relativePath: string | null | StaticImport): string => {

        if (typeof relativePath === "string") {
            for (const port of SERVER_PORTS) {
                const fullPath = `http://localhost:${port}${relativePath}`;
                return fullPath; // Always return the first port for now
            }
        }
        return ""; // 모든 포트에서 이미지가 없을 경우
    };

    useEffect(() => {
        if (!user) return; // 로그인 안 되어 있으면 실행 안 함
        loadWishlist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]); // `user`가 변경될 때만 실행

    // 초기 위시리스트 불러오기
    const loadWishlist = async () => {
        try {
            if (!user) return;
            const response = await wishPlaceLists(user.userId);
            setWishlist(response?.data?.content || []);
        } catch (error) {
            console.error("위시리스트 불러오기 실패:", error);
        }
    };

    const handleDeleteWish = async (placeId: number) => {
        if (!confirm("위시리스트에서 삭제하시겠습니까?")) return;
        try {
            await deleteWish(placeId);
            const updatedWishlist = wishlist.filter(item => item.placeId !== placeId);
            setWishlist(updatedWishlist);
            if (updatedWishlist.length === 0) setHasMore(false); // 삭제 후 목록이 없으면 더 보기 버튼 숨김
        } catch (error) {
            console.error("위시리스트 삭제 실패:", error);
        }
    };


    const loadMoreWishes = async () => {
        if (loading || !hasMore || !user) return;
        setLoading(true);
        try {
            const nextPage = page + 1;
            const response = await wishPlaceLists(user.userId, nextPage); // 전체 객체 반환

            const newWishes = response.data.content; // content 추출
            if (newWishes.length === 0) {
                setHasMore(false); // 더 이상 불러올 데이터가 없을 경우
            } else {
                setWishlist(prev => [...prev, ...newWishes]);
                setPage(nextPage);
            }
        } catch (error) {
            console.error("더 많은 위시리스트 불러오기 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    return <>
        <div className="md:col-span-3 bg-white p-4 md:p-6 shadow rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
                내가 찜한 카페 리스트
            </h2>

            {!user ? (
                <p className="text-gray-500 text-center mt-4">로그인이 필요합니다.</p>
            ) : wishlist.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {wishlist.map((item) => (
                            <div key={item.id} className="bg-gray-100 p-3 md:p-4 shadow rounded-lg w-full sm:w-72 md:w-auto mx-auto">
                                <Image
                                    src={getImageSrc(item.thumbFileImagePath) || "/default-image.jpg"}
                                    alt={item.placeName}
                                    width={200}
                                    height={150}
                                    className="rounded-md w-full h-40 object-cover"
                                />
                                <h3 className="text-sm md:text-lg font-semibold mt-2 text-center md:text-left">
                                    {item.placeName}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 text-center md:text-left">{item.placeAddr}</p>
                                <p className="text-yellow-500 text-sm md:text-base text-center md:text-left">
                                    ⭐ {item.reviewRate}
                                </p>
                                <div className="flex flex-col md:flex-row justify-center md:justify-between mt-4 gap-2">
                                    <Link
                                        href={`/place/${item.placeId}`}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm md:text-base text-center hover:bg-blue-600"
                                    >
                                        상세보기
                                    </Link>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md text-sm md:text-base hover:bg-red-600"
                                        onClick={() => handleDeleteWish(item.placeId)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 더 보기 버튼 */}
                    {hasMore && (
                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-gray-300 text-black px-6 py-2 rounded-md text-sm md:text-base hover:bg-gray-400"
                                onClick={loadMoreWishes}
                                disabled={loading}
                            >
                                {loading ? "불러오는 중..." : "더 보기"}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-gray-500 text-center mt-4">위시리스트가 없습니다.</p>
            )}
        </div>
    </>
}