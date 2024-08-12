//위시 리스트 추가에 필요한 dto 
export interface addWishList{
    userId : string;
    memberId : number;
}
//위시 리스트에 필요한 dto
export interface wishPlaceList{
    id : number;
    placeId : number;
    memberId : number;
    placeName : string;
    reviewRate : number;
    placeStart : string;
    placeClose : string;
    placeAddr : string;
    isTitle : string;
    thumbFileImagePath : string;
}