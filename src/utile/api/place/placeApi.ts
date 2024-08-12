import { CommonResponse, handleError, Page, SearchType } from "@/interface/common";
import { PlaceRecentSearch, placeResponse } from "@/interface/place";
import { api } from "../axios";

//가게 목록
export const placeList = async () :Promise<placeResponse[]> => {
    try {
        const listResult = await api.get<CommonResponse<Page<placeResponse>>>(`/place/`);
        const response = await listResult.data.data.content;
        return response;
    } catch(error) {
        return handleError(error);
    }
}

//가게 검색
export const placeListSearch = async (searchType: SearchType,
    searchVal: string,
    page: number = 0,
    size: number = 5) :Promise<placeResponse[]> => {
    
        try {
            const searchResult = await api.get<CommonResponse<Page<placeResponse>>>(`/place/search`, {
                params:{searchType,searchVal,page,size}
            });
            const response = await searchResult.data.data.content;
            return response;
        } catch(error) {
            return handleError(error);
        }
}

//가게 단일조회
export const placeDetail = async (id:number) :Promise<placeResponse> => {
    try {
        const placeResponse = await api.get<CommonResponse<placeResponse>>(`/place/${id}`);
        const response = await placeResponse.data.data;
        return response;
    } catch(error) {
        return handleError(error);
    }
}

//가게 평점top5
export const palceReviewTop5List = async () :Promise<placeResponse[]> => {
    try {
        const palceResponse = await api.get<CommonResponse<placeResponse[]>>(`/place/top5list`);
        console.log("가게목록::"+palceResponse.data.data);
        return palceResponse.data.data;
    } catch(error) {
        return handleError(error);
    }
}

//최근 검색어 추가
export const createRecentSearchLog = async (name:string) :Promise<void> => {
    try {
        const createSearchLog = await api.post(`/place/search-log`,null,{params:{name}}); 
        return createSearchLog.data;
    } catch(error) {
        return handleError(error);
    }
}

//최근 검색어 목록
export const recentSearchList = async () :Promise<PlaceRecentSearch[]> => {
    try {
        const recentList = await api.get<CommonResponse<PlaceRecentSearch[]>>(`/place/search-logs-list`);
        return recentList.data.data;
    } catch(error) {
        return handleError(error);
    }
}

//최근 검색어 전체 삭제
export const recentSearchLogDeleteAll = async () :Promise<void> => {
    try {
        const response = await api.delete(`/place/search-log`);
        return response.data;
    } catch(error) {
        return handleError(error);
    }
}

//최근 검색어 삭제
export const recentSearchDelete = async (placeName:string) :Promise<void> => {
    try {
        const deleteResult = await api.delete(`/palce/search-log/${placeName}`);
        return deleteResult.data;
    } catch(error) {
        return handleError(error);
    }
}
