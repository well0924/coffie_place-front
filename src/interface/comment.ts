//댓글 요청
export interface commentRequest{
    replyWriter?:string;//댓글 작성자
    replyContents:string;//댓글 내용
    replyPoint?:number;//가게댓글 평점.
}
//댓글 응답
export interface commentResponse{
    id:number;
    replyWriter:string;
    replyContents:string;
    replyPoint:number;
    liked?:number;//가게 댓글 좋아요.
    createdTime:Date;
}