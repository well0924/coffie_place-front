import { wishPlaceList ,addWishList } from "@/interface/favoritePlace";
import { api } from "../axios";
import { BoardResponse } from "@/interface/board";
import { commentResponse } from "@/interface/comment";
import { placeResponse } from "@/interface/place";
import { CommonResponse, Page } from "@/interface/common";

//위시 리스트 목록
export const wishPlaceLists = async (userId:string, page: number = 0, size: number = 5) :Promise<CommonResponse<Page<wishPlaceList>>> => {
    try{
        const wishList = await api.get<CommonResponse<Page<wishPlaceList>>>(`/my-page/${userId}`, {
            params: { page, size }
        });
        return wishList.data;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

//위시 리스트 중복확인
export const wishDuplicated = async (userId:string,memberId:number) :Promise<boolean> => {

    try {
        const duplicatedResult = await api.get(`/my-page/${userId}/${memberId}`);
        return duplicatedResult.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

//위시 리스트 추가
export const addWish = async (placeId:number,userId:string) :Promise<void> => {
    try {
        const response = await api.post(`/my-page/${userId}/${placeId}`,{placeId : placeId, userId : userId});
        return await response.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

//위시 리스트 삭제
export const deleteWish = async (placeId:number) :Promise<void> => {
    try { 
        const response = await api.delete(`/my-page/${placeId}`);
        return response.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

//로그인한 회원이 작성한 글
export const getUserPosts = async (userId:string) :Promise<BoardResponse[]> => {
    try {
        const userPostsList = await api.get(`/my-page/contents/${userId}`);
        return userPostsList.data.data.content;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

//로그인한 회원이 작성한 댓글
export const getUserComments = async (userId:string) :Promise<commentResponse[]> => {
    try {
        const response = await api.get<CommonResponse<commentResponse[]>>(`/my-page/comment/${userId}`);

        console.log("📌 API 응답:", response.data); // API 응답 확인
        console.log("📌 댓글 데이터:", response.data?.data); // 댓글 목록 확인

        // API 응답이 정상적인 경우, 데이터 반환
        return response.data?.data ?? [];
    } catch(error) {
        console.log(error);
        throw error;
    }
}

//회원 위치에서 가까운 가게 조회
export const placeNearList = async () :Promise<placeResponse[]> => {    
    try {
        const response = await api.get(`/my-page/near-list`);
        return response.data;
    }catch(error) {
        console.log(error);
        throw error;
    }
}

//회원이 좋아요를 누른 게시글 목록
export const likeBoardList = async (userId:string) :Promise<BoardResponse[]> => {
    try {
        const boardList = await api.get(`/my-page/like/${userId}`);
        return boardList.data.contents;
    } catch(error) {
        console.log(error);
        throw error;
    }
}