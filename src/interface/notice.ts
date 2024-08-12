

//공지 게시글 요청
export interface noticeRequest {
        noticeGroup:string,
        isFixed:string,
        noticeTitle:string,
        noticeWriter:string,
        noticeContents:string;
        fileGroupId:string;
}

//공지 게시글 응답
export interface noticeResponse {
    id:number,
    noticeGroup:string,
    noticeTitle:string,
    noticeWriter:string,
    noticeContents:string,
    fileGroupId:string,
    isFixed:string,
    createdTime:Date,
    updatedTime:Date
}