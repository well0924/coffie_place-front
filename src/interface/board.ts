
//게시글 요청
export interface BoardRequest{
    boardTitle : string;
    boardContents : string;
    boardAuthor?: string; //회원 아이디를 작성자로.
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
    passWd : string;
    readCount : number;
    liked : number;
    fileGroupId : string;
    createdTime : Date;
    updatedTime : Date;
}