
//게시글 요청
export interface BoardRequest{
    boardTitle : string;
    boardContents : string;
    boardAuthor : string;
    readCount : number;
    passWd : string;
    fileGroupId : string;
}

//게시글 응답
export interface BoardResponse{
    id : number;
    boardTitle : string;
    boardContents : string;
    boardAuthor : string;
    readCount : number;
    liked : number;
    fileGroupId : string;
    createdTime : Date;
    updatedTime : Date;
}