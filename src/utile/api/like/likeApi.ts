import { CommonResponse, handleError } from "@/interface/common"
import { api } from "../axios";

// 게시글 좋아요 +1
export const boardLikeUp = async (boardId:number) :Promise<string> => {
    try {
        const likeResult = await api.post(`/like/plus/${boardId}`);
        return likeResult.data;
    } catch(error) {
        return handleError(error);
    }
}

// 게시글 좋아요 -1
export const boardLikeDown = async (boardId:number) :Promise<string> => {
    try {
        const likeResult = await api.delete(`/like/minus/${boardId}`);
        return likeResult.data;
    } catch(error) {
        return handleError(error);
    }
}

// 게시글 좋아요 카운트
export const boardLikeCount = async (boardId:number) :Promise<string[]> => {
    try {
        const  likeCount = await api.get<CommonResponse<string[]>>(`/like/board/${boardId}`);
        return likeCount.data.data;
    } catch(error) {
        return handleError(error);
    }
}

// 댓글 좋아요 +1
export const replyLikeUp = async (replyId:number) :Promise<string> => {
    try {
        const likeResult = await api.post(`/like/comment/plus/${replyId}`);
        return likeResult.data;
    } catch(error) {
        return handleError(error);
    }
}

// 댓글 좋아요 -1 
export const replyLikeDown = async (replyId:number) :Promise<string> => {
    try {
        const likeResult = await api.delete(`/like/comment/minus/${replyId}`);
        return likeResult.data;
    } catch(error) {
        return handleError(error);
    }
}

// 댓글 좋아요 카운트
export const replyLikeCount = async (replyId:number) :Promise<string[]> =>{
    try {
        const likeCount = await api.get(`/like/comment/${replyId}`);
        return likeCount.data;
    } catch(error) {
        return handleError(error);
    }
}