import { StaticImport } from "next/dist/shared/lib/get-img-props";


export interface placeRequest {

    placeName: string;
    placeAddr: string;
    placePhone: string;
    placeAuthor: "well4149";
    placeStart: string;
    placeClose: string;
    fileGroupId: string;
    reviewRate: 0.0;
}

export interface placeResponse {
    id: number;
    reviewRate: number;
    placeName: string;
    placeAddr: string;
    placePhone: string;
    placeAuthor: string;
    placeStart: string;
    placeClose: string;
    isTitle: string;
    imgPath: string | StaticImport;
    thumbFileImagePath: string | StaticImport;
}

export interface PlaceRecentSearch {
    name: string;
    createdTime: string;
}

export interface LocationType {
    lat?: string | null;
    lng?: string | null;
    zoom?: number;
}

export interface CafeTop5Props {
    top5: Array<{
        id: number;
        placeName: string;
        placeAddr: string;
        reviewRate: number;
        thumbFileImagePath: string | StaticImport;
    }>;
}

export interface placeImageList {
    images: Array<{
        id: number | null;
        imgPath: string | StaticImport;
        thumbFileImagePath: string | StaticImport;
        isTitle: string;
    }>;
}