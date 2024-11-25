import { CommonResponse, handleError } from "@/interface/common"
import { api } from "../axios";

// 게시글 좋아요 +1
export const boardLikeUp = async (boardId:number) :Promise<string> => {
    try {
        const likeResult = await api.post(`/like/plus/${boardId}`);
        alert('좋아요가 추가되었습니다.');
        return likeResult.data;
    } catch(error) {
        throw handleError(error);
    }
}

// 게시글 좋아요 -1
export const boardLikeDown = async (boardId:number) :Promise<string> => {
    try {
        const likeResult = await api.delete(`/like/minus/${boardId}`);
        return likeResult.data;
    } catch(error) {
        throw handleError(error);
    }
}


interface BoardLikeResponse {
    likeCount: number;
    likedStatus: boolean;
}
// 게시글 좋아요 카운트
export const boardLikeCount = async (boardId:number) :Promise<BoardLikeResponse> => {
    try {
        const  response = await api.get<CommonResponse<string[]>>(`/like/board/${boardId}`);
        
        console.log("게시글 좋아요 수:"+response.data.data);
        
        // 안전하게 data를 처리
        const data = response.data.data || [];
        
        const likeCount = data[0] ? parseInt(data[0], 10) : 0;
        const likedStatus = data[1] === "true";

        return { likeCount, likedStatus }; // Return as an object
    } catch(error) {
        throw handleError(error);
    }
}

// 댓글 좋아요 +1
export const replyLikeUp = async (replyId:number) :Promise<string> => {
    try {
        const likeResult = await api.post(`/like/comment/plus/${replyId}`);
        return likeResult.data;
    } catch(error) {
        throw handleError(error);
    }
}

// 댓글 좋아요 -1 
export const replyLikeDown = async (replyId:number) :Promise<string> => {
    try {
        const likeResult = await api.delete(`/like/comment/minus/${replyId}`);
        return likeResult.data;
    } catch(error) {
        throw handleError(error);
    }
}

// 댓글 좋아요 카운트
export const replyLikeCount = async (replyId:number) :Promise<string[]> =>{
    try {
        const likeCount = await api.get(`/like/comment/${replyId}`);
        return likeCount.data;
    } catch(error) {
        throw handleError(error);
    }
}