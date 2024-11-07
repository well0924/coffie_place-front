"use client"

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
// Slick CSS를 해당 컴포넌트에서만 임포트

interface CafeTop5Props {
    top5: Array<{
        id: number;
        placeName: string;
        placeAddr: string;
        reviewRate: number;
        thumbFileImagePath: string | StaticImport;
    }>;
}

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
            <h4 className="text-xl font-semibold text-center" id="title-top5">카페 TOP5</h4>
            <Slider {...settings} className="w-full px-4">
                {top5.length > 0 ? (
                    top5.map((item, index) => (
                        <div key={index} className="p-2 flex justify-center">
                            <div className="card shadow-lg p-4 w-[280px] h-full flex flex-col">
                                <div className="w-full h-40 md:h-48 lg:h-56 overflow-hidden">
                                    <Image
                                        src={getImageSrc(item.thumbFileImagePath)}
                                        alt={item.placeName}
                                        width={100}
                                        height={100}
                                        priority
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <h5 className="text-lg font-bold mt-4">{item.placeName}</h5>
                                <p className="text-sm text-gray-600">{item.placeAddr}</p>
                                <div className="flex items-center mt-2">
                                    <div className="text-yellow-500">{item.reviewRate}</div>
                                    <div className="ml-2 text-gray-500 text-sm">/ 5.0</div>
                                </div>
                                <Link href={`/page/place/detail/${item.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-center">
                                    More
                                </Link>
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