import { CommonResponse, handleError, Page, SearchType, Slice } from "@/interface/common";
import { placeImageList, PlaceRecentSearch, placeResponse } from "@/interface/place";
import { api } from "../axios";

//가게 목록
export const placeList = async (
    page: number = 0,
    size: number = 10,
    placeId: number | null = null,
    sortedType:string ="placeName,DESC"): Promise<{ content: placeResponse[]; hasNext: boolean }> => {

    try {
        const listResult = await api.get<CommonResponse<Slice<placeResponse>>>(`/place/`, {
            params: { page, size, placeId,sortedType },
        });
        const { content, last } = listResult.data.data; // API가 Slice로 응답할 경우 last 필드 사용
        return { content, hasNext: !last };
    } catch (error) {
        throw handleError(error);
    }
};

//가게 검색
export const placeListSearch = async (
    searchType: SearchType,
    searchVal: string,
    page: number = 0,
    size: number = 5
): Promise<{ content: placeResponse[]; hasNext: boolean }> => {
    try {
        const searchResult = await api.get<CommonResponse<Slice<placeResponse>>>(`/place/search`, {
            params: { searchType, searchVal, page, size },
        });
        const { content, last } = searchResult.data.data;
        return { content, hasNext: !last };
    } catch (error) {
        throw handleError(error);
    }
};

//가게 단일조회
export const placeDetail = async (id: number): Promise<placeResponse> => {
    try {
        const placeResponse = await api.get<CommonResponse<placeResponse>>(`/place/${id}`);
        const response = await placeResponse.data.data;
        return response;
    } catch (error) {
        throw handleError(error);
    }
}

//가게 이미지 조회 
export const placeDetailImageList = async (placeId: number): Promise<placeImageList> => {
    try {
        const placeImageList = await api.get(`/place/image-list/${placeId}`);
        return placeImageList.data.data;
    } catch(error) {
        throw handleError(error);
    }
}

//가게 평점top5
export const palceReviewTop5List = async (): Promise<placeResponse[]> => {
    try {
        const palceResponse = await api.get<CommonResponse<placeResponse[]>>(`/place/top5list`);
        console.log("가게목록::" + palceResponse.data.data);
        return palceResponse.data.data;
    } catch (error) {
        throw handleError(error);
    }
}

//최근 검색어 추가
export const createRecentSearchLog = async (name: string): Promise<void> => {
    try {
        const createSearchLog = await api.post(`/place/search-log`, null, { params: { name } });
        return createSearchLog.data;
    } catch (error) {
        throw handleError(error);
    }
}

//최근 검색어 목록
export const recentSearchList = async (): Promise<PlaceRecentSearch[]> => {
    try {
        const recentList = await api.get<CommonResponse<PlaceRecentSearch[]>>(`/place/search-logs-list`);
        return recentList.data.data;
    } catch (error) {
        throw handleError(error);
    }
}

//최근 검색어 전체 삭제
export const recentSearchLogDeleteAll = async (): Promise<void> => {
    try {
        const response = await api.delete(`/place/search-log`);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
}

//최근 검색어 삭제
export const recentSearchDelete = async (placeName: string): Promise<void> => {
    try {
        const deleteResult = await api.delete(`/palce/search-log/${placeName}`);
        return deleteResult.data;
    } catch (error) {
        throw handleError(error);
    }
}

