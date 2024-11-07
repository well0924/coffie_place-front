import { commentRequest, commentResponse } from "@/interface/comment";
import { CommonResponse, handleError, Slice } from "@/interface/common";
import { api } from "../axios";

//게시글 댓글 목록
export const boardCommentList = async (boardId:number) :Promise<CommonResponse<commentResponse[]>> => {
    try {
        const commentList = await api.get<CommonResponse<commentResponse[]>>(`/comment/${boardId}`);
        const response = await commentList;
        return response.data;
    } catch(error) {
        throw handleError(error);
    }
}

//게시글 댓글 작성
export const createBoardComment = async (data:commentRequest,boardId:number) :Promise<number> => {

    try {
        const createResult = await api.post<CommonResponse<number>>(`/comment/${boardId}`,data);
        return createResult.data.data;
    } catch(error) {
        throw handleError(error);
    }
}

//게시글 댓글 삭제
export const deleteBoardComment = async (id:number) :Promise<void> => {

    try {
        const response = await api.delete(`/comment/${id}`);
        return response.data;
    } catch(error) {
        throw handleError(error);
    }
}

//가게 댓글 목록
export const placeCommentList = async (placeId:number) :Promise<commentResponse[]> => {
    
    try {
        const response = await api.get<CommonResponse<Slice<commentResponse>>>(`/place/${placeId}`);
        return await response.data.data.content;
    } catch(error) {
        throw handleError(error);
    }
}

//가게 댓글 작성
export const createPlaceComment = async (placeId:number,data:commentRequest) :Promise<number> => {
    
    try {
        const response = await api.post(`/comment/place/${placeId}`,data);
        return response.data;
    } catch(error) {    
        throw handleError(error);
    }
}

//가게 댓글 삭제
export const deletePlaceComment = async (placeId:number,commentId:number) :Promise<void> => {
    try {
        const response = await api.delete(`/comment/place/${placeId}/${commentId}`);
        return response.data;
    } catch(error) {
        throw handleError(error);
    }
}