import PlaceDetail from "@/components/place/placeDetail";
import { placeDetail, placeDetailImageList } from "@/utile/api/place/placeApi";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "가게 상세 조회",
    description: "가게의 상세 정보를 확인하세요."
};

export default async function PlaceDetailPage({ params }: { params: { id: number } }) {
    const place = await placeDetail(params.id);
    const placeImageList = await placeDetailImageList(params.id);
        
    if (!place) {
        return <div className="container mx-auto mt-24 text-center">가게 정보를 불러올 수 없습니다.</div>;
    }

    return <>   
        <PlaceDetail place={place} placeImage={placeImageList}></PlaceDetail>
    </>
}