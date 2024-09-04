import { AttachDto } from "@/interface/attach"
import { api } from "../axios"
import { handleError } from "@/interface/common";


//자유 게시글 첨부파일 목록
export const freeBoardAttachList = async (boardId:number) :Promise<AttachDto[]> => {
    try {
        const attachList = await api.get(`/file/board/${boardId}`);
        console.log('첨부파일 목록 ::'+ attachList);
        return attachList.data;
    } catch (error) {
        return handleError(error);
    }
} 

//공지 게시글 첨부파일 목록
export const noticeBoardAttachList = async (noticeId:number) :Promise<AttachDto[]> => {
    try {
        const attachList = await api.get(`/file/notice/${noticeId}`);
        console.log('첨부파일 목록 ::'+ attachList);
        return attachList.data;
    } catch(error) {
        console.log(error);
        return handleError(error);
    }
}

//게시글 파일 다운로드 
 