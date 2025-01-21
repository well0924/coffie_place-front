"use client"

import { placeResponse } from "@/interface/place";
import { placeList } from "@/utile/api/place/placeApi";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export function PlaceList() {
    const [places, setPlaces] = useState<placeResponse[]>([]); // 가게 데이터 리스트
    const [hasNext, setHasNext] = useState<boolean>(true); // 더 많은 데이터 여부
    const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
    const [lastPlaceId, setLastPlaceId] = useState<number | null>(null); // 마지막 placeId 저장    

    // 데이터 불러오기
    const fetchPlaces = useCallback(async () => {
        if (!hasNext || loading) return; // 더 가져올 데이터가 없거나 로딩 중일 때 실행 방지
        setLoading(true);

        try {
            const { content, hasNext: next } = await placeList(0, 10, lastPlaceId); // API 호출
            setPlaces((prev) => [...prev, ...content]); // 기존 데이터에 추가
            setHasNext(next); // 다음 데이터 여부 업데이트
            if (content.length > 0) {
                setLastPlaceId(content[content.length - 1].id); // 마지막 placeId 업데이트
            }
        } catch (error) {
            console.error("Failed to fetch places:", error);
        } finally {
            setLoading(false);
        }
    }, [lastPlaceId, hasNext, loading]);


    const SERVER_PORTS = [8081, 8082, 8083]; // 사용할 포트 목록

    const getImageSrc = (relativePath: string | null | StaticImport): string => {

        if (typeof relativePath === "string") {
            for (const port of SERVER_PORTS) {
                const fullPath = `http://localhost:${port}${relativePath}`;
                // You might want to check if the image exists at this URL
                return fullPath; // Always return the first port for now
            }
        }
        return ""; // 모든 포트에서 이미지가 없을 경우
    };

    // 초기 데이터 로드
    useEffect(() => {
        fetchPlaces();
    }, [fetchPlaces]);

    // 무한 스크롤 감지
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 200
            ) {
                fetchPlaces(); // 스크롤 하단 근처에 도달하면 데이터 요청
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [fetchPlaces]);

    return <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place,index) => (
                <div key={`${place.id}-${index}`} className="col-span-1">
                    <div className="card bg-white shadow-lg rounded">
                        <div className="card-body p-4">
                            {place.isTitle && (
                                <Image
                                    src={getImageSrc(place.thumbFileImagePath)}
                                    alt={"place Main Image"}
                                    width={100}
                                    height={100}
                                    className="w-full h-48 object-cover rounded"
                                />
                            )}
                            <h5 className="text-lg font-semibold mt-4">
                                <a href="#" className="text-blue-600 hover:underline">
                                    {place.placeName}
                                </a>
                            </h5>
                            <p className="text-gray-600">{place.placeAddr}</p>
                            <div className="RatingStar mt-2">
                                <div className="RatingScore">
                                    <div className="outer-star">
                                        <div className="inner-star"></div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-500">{place.reviewRate}</p>
                        </div>
                    </div>
                </div>
            ))}
            {loading && <p className="text-center">Loading...</p>}
            {!hasNext && <p className="text-center">No more places to show.</p>}
        </div>
    </>;
}