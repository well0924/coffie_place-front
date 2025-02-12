"use client"

import { placeImageList, placeResponse } from "@/interface/place";
import KakaoMap from "../common/kakaoMap";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { PlaceCommentList } from "../comment/placeCommentList";
import { useEffect, useState } from "react";
import { addWish, deleteWish, wishDuplicated } from "@/utile/api/my-page/my-page";
import { useAuth } from "@/utile/context/AuthContext";

interface PlaceDetailProps {
    place: placeResponse;
    placeImage: placeImageList;
    userId?: string;
}

export default function PlaceDetail({ place, placeImage, userId }: PlaceDetailProps) {
    const [isWishListed, setIsWishListed] = useState<boolean>(false);
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);

    const SERVER_PORTS = [8081, 8082, 8083]; // 사용할 포트 목록

    const getImageSrc = (relativePath: string | null | StaticImport): string => {

        if (typeof relativePath === "string") {
            for (const port of SERVER_PORTS) {
                const fullPath = `http://localhost:${port}${relativePath}`;
                console.log(fullPath);
                // You might want to check if the image exists at this URL
                return fullPath; // Always return the first port for now
            }
        }
        return ""; // 모든 포트에서 이미지가 없을 경우
    };

    const handleImageClick = (src: string) => {
        const popup = window.open(
            src,
            "_blank",
            "width=800,height=600,scrollbars=no,resizable=no"
        );
        if (!popup) {
            alert("팝업이 차단되었습니다. 팝업 차단 설정을 확인해주세요.");
        }
    };

    const imagesArray = Array.isArray(placeImage) ? placeImage : [];

    const mainImage = imagesArray.find((img) => img.isTitle === "Y");

    const additionalImages = imagesArray.filter((img) => img.isTitle === "N").slice(0, 3);

    {/** 위시리스트 추가하기*/ }
    useEffect(() => {
        if (!user?.userId) return;// 로그인 안 한 경우, 위시리스트 확인 생략

        const checkWishList = async () => {
            try {
                const exists = await wishDuplicated(user.userId, place.id);
                setIsWishListed(exists);
            } catch (error) {
                console.error("위시리스트 중복 확인 실패:", error);
            } finally {
                setLoading(false);
            }
        };
        checkWishList();
    }, [user, place.id]);

    const handleWishToggle = async () => {
        if (!user) {
            alert("위시리스트를 사용하려면 로그인해야 합니다.");
            return;
        }

        try {
            if (isWishListed === true) {
                console.log(isWishListed);
                await deleteWish(place.id);
                setIsWishListed(false);
                alert("위시리스트에서 제거되었습니다.");
            } else {
                await addWish(place.id, user.userId);
                setIsWishListed(true);
                alert("위시리스트에 추가되었습니다.");
            }
        } catch (error) {
            console.error("위시리스트 변경 실패:", error);
        }
    };
    console.log(isWishListed);

    return (
        <div className="container mx-auto mt-6 p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 가게 이미지 */}
                <div className="flex flex-col items-center">
                    {mainImage ? (
                        <Image
                            src={getImageSrc(mainImage.thumbFileImagePath)}
                            alt="대표 이미지"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-lg object-cover w-full max-w-md md:max-w-full"
                            onClick={() => handleImageClick(getImageSrc(mainImage.thumbFileImagePath))}
                        />
                    ) : (
                        <div className="w-full max-w-md md:max-w-full h-48 md:h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                            이미지 없음
                        </div>
                    )}

                    {/* 추가 이미지 3개 */}
                    {additionalImages.length > 0 && (
                        <div className="mt-4 flex flex-wrap justify-center gap-2 md:gap-4">
                            {additionalImages.map((img, index) => (
                                <Image
                                    key={index}
                                    src={getImageSrc(img.thumbFileImagePath)}
                                    alt={`추가 이미지 ${index + 1}`}
                                    width={120}
                                    height={80}
                                    className="rounded-lg shadow-sm object-cover"
                                    onClick={() => handleImageClick(getImageSrc(img.thumbFileImagePath))}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* 가게 상세 정보 */}
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                    <h1 className="text-xl md:text-2xl font-bold text-center">{place.placeName}</h1>

                    {/* Kakao 지도 */}
                    <div className="mt-4 md:mt-8 flex justify-center">
                        <KakaoMap address={place.placeAddr} houseName={place.placeName} width="100%" height="300px" />
                    </div>

                    <p className="text-sm md:text-lg mt-4">
                        <strong>주소:</strong> {place.placeAddr}
                    </p>
                    <p className="text-sm md:text-lg">
                        <strong>전화번호:</strong> {place.placePhone || "정보 없음"}
                    </p>
                    <p className="text-sm md:text-lg">
                        <strong>영업시간:</strong> {place.placeStart} ~ {place.placeClose}
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
                        {/* 위시 리스트 추가 버튼 */}
                        <button
                            className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-md text-sm md:text-lg transition ${isWishListed ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-400 text-white"
                                }`}
                            onClick={handleWishToggle}
                            disabled={loading} // 로딩 중일 때 비활성화
                        >
                            {isWishListed ? "✔ 위시리스트에 있음" : "❤️ 위시 리스트 추가"}
                        </button>

                        {/* 가게 목록 버튼 */}
                        <Link
                            className="bg-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-md text-sm md:text-lg hover:bg-blue-600 transition text-center"
                            href={"/place"}
                        >
                            가게 목록
                        </Link>
                    </div>
                </div>
            </div>

            {/* 댓글 목록 */}
            <div className="mt-6 md:mt-10">
                <PlaceCommentList placeId={place.id} />
            </div>
        </div>
    );
}