"use client"

import { SearchParams, SearchType } from "@/interface/common";
import { placeResponse } from "@/interface/place";
import { placeList, placeListSearch } from "@/utile/api/place/placeApi";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface PlaceListProps {
    searchParams: SearchParams;
    userId?: string | null; // 
}

export function PlaceList({ searchParams, userId }: PlaceListProps) {
    const [places, setPlaces] = useState<placeResponse[]>([]); // 가게 목록
    const [page, setPage] = useState(0); // 페이지 번호
    const [hasNext, setHasNext] = useState(true); // 다음 페이지 존재 여부
    const [loading, setLoading] = useState(false); // 로딩 상태

    const observerRef = useRef<IntersectionObserver | null>(null); // 스크롤 감지를 위한 옵저버
    const lastPlaceRef = useRef<HTMLDivElement | null>(null); // 마지막 아이템 참조
    const placesRef = useRef<placeResponse[]>([]); // places 상태를 보존하는 useRef 추가
    const fetchPlacesRef = useRef<(pageNum: number) => void>(); // fetchPlaces를 useRef로 저장

    // 검색 타입과 검색어
    const searchType = searchParams.searchType || SearchType.ALL;
    const searchVal = searchParams.searchVal || "";
    const sortedType = searchParams.sort || "placeName,DESC"; // 정렬 방식 추가

    // 데이터 불러오기 함수 (useRef 활용하여 `fetchPlaces`의 의존성 제거)
    const fetchPlaces = useCallback(async (pageNum: number) => {
        if (!hasNext || loading) return;
        setLoading(true);

        try {
            let response;
            if (searchVal) {
                response = await placeListSearch(searchType, searchVal, pageNum, 10);
            } else {
                const lastPlaceId = placesRef.current.length > 0 ? placesRef.current[placesRef.current.length - 1].id : 0;
                response = await placeList(pageNum, 10, lastPlaceId, sortedType);
            }
            
            if (response && response.content) {
                // 상태를 업데이트하면서 useRef에도 최신 데이터 저장
                setPlaces((prev) => {
                    const updatedPlaces = pageNum === 0 ? response.content : [...prev, ...response.content];
                    placesRef.current = updatedPlaces; // useRef에 저장
                    return updatedPlaces;
                });

                setHasNext(response.hasNext);
            } else {
                setHasNext(false);
            }
        } catch (error) {
            console.error("Failed to fetch places:", error);
        } finally {
            setLoading(false);
        }
    }, [hasNext, loading, searchVal, searchType, sortedType]); //  places 제거

    // `fetchPlacesRef`에 `fetchPlaces` 저장 (의존성 제거 목적)
    useEffect(() => {
        fetchPlacesRef.current = fetchPlaces;
    }, [fetchPlaces]);

    // 검색어 변경 시 목록 초기화
    useEffect(() => {
        setPlaces([]); // 목록 초기화
        placesRef.current = []; //  useRef도 초기화
        setPage(0); // 페이지 초기화
        setHasNext(true); // 다음 페이지 가능 여부 초기화
        fetchPlaces(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchType, searchVal, sortedType]); // fetchPlaces 실행 X

    // 무한 스크롤 감지 (IntersectionObserver 최적화)
    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNext && !loading) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (lastPlaceRef.current) {
            observerRef.current.observe(lastPlaceRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [hasNext, loading]);

    //  페이지 변경 시 데이터 로드 (`fetchPlacesRef.current` 사용하여 의존성 제거)
    useEffect(() => {
        if (fetchPlacesRef.current) {
            fetchPlacesRef.current(page);
        }
    }, [page]); // fetchPlaces 자체가 아니라 useRef를 통해 호출

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

    return <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.length === 0 && !loading && <p className="text-center">검색 결과가 없습니다.</p>}
            {places.map((place, index) => (
                <div key={`${place.id}-${index}`} ref={index === places.length - 1 ? lastPlaceRef : null} className="col-span-1">
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
                                <a href={`/place/${place.id}`} className="text-blue-600 hover:underline">
                                    {place.placeName}
                                </a>
                            </h5>
                            <p className="text-gray-600">{place.placeAddr}</p>
                            <div className="flex text-yellow-500">
                                {"★"+place.reviewRate}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {loading && <p className="text-center">Loading...</p>}
            {!hasNext && places.length > 0 && <p className="text-center mt-4 text-gray-500">No more places to show.</p>}
        </div>
    </>;
}