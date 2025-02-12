"use client"

import { CafeTop5Props } from "@/interface/place";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
// Slick CSS를 해당 컴포넌트에서만 임포트

export default function ReviewTop5PlacePage({ top5 }: CafeTop5Props) {
    // react-slick의 설정
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 640, settings: { slidesToShow: 1 } }, // 모바일
            { breakpoint: 768, settings: { slidesToShow: 2 } }, // 태블릿
            { breakpoint: 1024, settings: { slidesToShow: 3 } }, // 데스크톱
        ],
    };

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

    return <>
        <div className="w-full">
            <h4 className="text-xl md:text-2xl font-semibold text-center mb-6" id="title-top5">
                카페 TOP5
            </h4>
            <Slider {...settings} className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
                {top5.length > 0 ? (
                    top5.map((item, index) => (
                        <div key={index} className="p-2 flex justify-center">
                            <div className="card shadow-lg p-4 w-full md:w-[280px] h-full flex flex-col">
                                {/* 이미지 컨테이너 */}
                                <div className="w-full h-auto">
                                    <Image
                                        src={getImageSrc(item.thumbFileImagePath)}
                                        alt={item.placeName}
                                        width={280} // 기본 크기
                                        height={280} // 기본 크기
                                        priority
                                        className="w-full h-auto max-w-full sm:max-h-48 md:max-h-56 lg:max-h-64 object-cover rounded-md"
                                    />
                                </div>

                                {/* 가게 정보 */}
                                <h5 className="text-base md:text-lg font-bold mt-4 text-center">{item.placeName}</h5>
                                <p className="text-sm md:text-base text-gray-600 text-center">{item.placeAddr}</p>

                                {/* 평점 */}
                                <div className="flex items-center justify-center mt-2">
                                    <span className="text-yellow-500 text-base md:text-lg">★ {item.reviewRate}</span>
                                    <span className="ml-1 text-gray-500 text-sm md:text-base">/ 5.0</span>
                                </div>

                                {/* 상세보기 버튼 */}
                                <div className="flex justify-center mt-4">
                                    <Link
                                        href={`/page/${item.id}`}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md text-center w-auto md:w-3/4"
                                    >
                                        More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-4 text-center text-gray-600">
                        현재 평점이 높은 가게가 없습니다.
                    </div>
                )}
            </Slider>
        </div>
    </>;
}