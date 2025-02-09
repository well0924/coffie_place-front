"use client"

import { placeImageList, placeResponse } from "@/interface/place";
import KakaoMap from "../common/kakaoMap";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { PlaceCommentList } from "../comment/placeCommentList";

interface PlaceDetailProps {
    place: placeResponse;
    placeImage: placeImageList;
}

export default function PlaceDetail({ place, placeImage }: PlaceDetailProps) {

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
    const addWishList = () => {

    }

    return (
        <div className="container mx-auto mt-12 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* 가게 이미지 */}
                <div className="flex flex-col items-center">
                    {mainImage ? (
                        <Image
                            src={getImageSrc(mainImage.thumbFileImagePath)}
                            alt="대표 이미지"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-lg"
                            onClick={() => handleImageClick(getImageSrc(mainImage.thumbFileImagePath))}
                        />
                    ) : (
                        <div className="w-[500px] h-[300px] bg-gray-200 flex items-center justify-center rounded-lg">
                            이미지 없음
                        </div>
                    )}
                    {/* 추가 이미지 3개 */}
                    {additionalImages.length > 0 && (
                        <div className="mt-8 flex justify-center space-x-4">
                            {additionalImages.map((img, index) => (
                                <Image
                                    key={index}
                                    src={getImageSrc(img.
                                        thumbFileImagePath
                                    )}
                                    alt={`추가 이미지 ${index + 1}`}
                                    width={150}
                                    height={100}
                                    className="rounded-lg shadow-sm"
                                    onClick={() => handleImageClick(getImageSrc(img.thumbFileImagePath))}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* 가게 상세 정보 */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-center">{place.placeName}</h1>

                    {/* Kakao 지도 */}
                    <div className="mt-8 flex justify-center">
                        <KakaoMap address={place.placeAddr} houseName={place.placeName} width="400px" height="400px" />
                    </div>
                    <p className="text-lg">
                        <strong>주소:</strong> {place.placeAddr}
                    </p>
                    <p className="text-lg">
                        <strong>전화번호:</strong> {place.placePhone || "정보 없음"}
                    </p>
                    <p className="text-lg">
                        <strong>영업시간:</strong> {place.placeStart} ~ {place.placeClose}
                    </p>

                    <div className="flex justify-center items-center gap-4 mt-4">
                        {/*  위시 리스트 추가 버튼 */}
                        <button
                            className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-md text-lg hover:bg-red-600 transition"
                            onClick={() => alert("위시 리스트에 추가됨!")}
                        >
                            ❤️ 위시 리스트 추가
                        </button>

                        {/* 가게 목록 버튼 */}
                        <Link
                            className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600 transition"
                            href = {"/place"}
                        >
                            가게 목록
                        </Link>
                    </div>
                </div>
            </div>

            {/* 댓글 목록 */}
            <div className="mt-10">
                <PlaceCommentList placeId={place.id}></PlaceCommentList>
            </div>
        </div>
    );
}