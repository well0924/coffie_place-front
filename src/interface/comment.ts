//댓글 요청
export interface commentRequest{
    replyWriter:string;
    replyContents:string;
    replyPoint:number;
}
//댓글 응답
export interface commentResponse{
    id:number;
    replyWriter:string;
    replyContents:string;
    replyPoint:number;
    liked:number;
    createdTime:Date;
}