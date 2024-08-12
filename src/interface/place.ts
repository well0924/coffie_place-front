

export interface placeRequest {

    placeName:string;
    placeAddr:string;
    placePhone:string;
    placeAuthor:"well4149";
    placeStart:string;
    placeClose:string;
    fileGroupId:string;
    reviewRate: 0.0;
}

export interface placeResponse{
    id:number;
    reviewRate:number;
    placeName:string;
    placeAddr:string;
    placePhone:string;
    placeAuthor:string;
    placeStart:string;
    placeClose:string;
    isTitle:string;
    imgPath:string;
    thumbFileImagePath:string;
}

export interface PlaceRecentSearch {
    name:string;
    createdTime:string;   
}