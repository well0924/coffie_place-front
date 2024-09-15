import { noticeRequest, noticeResponse } from "@/interface/notice";
import { api } from "../axios";
import { CommonResponse, handleError, Page, SearchType } from "@/interface/common";


//공지 게시판 목록
export const getNoticeList = async (
    page: number = 0,
    size: number = 5) :Promise<CommonResponse<Page<noticeResponse>>> => {

    try {
        const boardList = await api.get<CommonResponse<Page<noticeResponse>>>(`/notice/`, {
            params: {
                page,
                size
            }
        });
        const response = boardList.data;
        // 서버 응답 상태 확인 
        console.log(response.data);
        if(response.httpStatus === `OK`) {
            return response;
        } else {
            // 서버 오류 응답 처리
            console.error('서버 오류:', response.message);
            return response;
        }
    } catch (error) {
        console.log(error);
        return handleError(error);
    }
}

//공지 게시판 검색
export const noticeListSearch = async (
    searchType: SearchType,
    searchVal: string,
    page: number = 0,
    size: number = 5): Promise<CommonResponse<Page<noticeResponse>>> => {

    try {
        const noticeListSearch = await api.get(`/notice/search`, {
            params: {
                searchType,
                searchVal,
                page,
                size
            }
        });
        const response = noticeListSearch.data;
        console.log(response);
        if(response.status === 200) {
            return response;
        } else {
            return response;
        }
    } catch (error) {
        return handleError(error);
    }
}

//공지 게시판 단일 조회
export const noticeDetail = async (id: number): Promise<noticeResponse> => {
    try {
        const response = await api.get<CommonResponse<noticeResponse>>(`/notice/${id}`);
        return await response.data.data;
    } catch (error) {
        console.log(error);
        return handleError(error);
    }
}

//공지 게시판 작성
export const noticeCreate = async (data: noticeRequest, files: File[]): Promise<number> => {

    const formData = new FormData();
    console.log(data);
    
    // BoardRequest 객체를 FormData에 추가
    const noticeDto = new Blob([JSON.stringify(data)], { type: "application/json" });
    console.log(noticeDto);
    formData.append("noticeDto", noticeDto);
    
    // 파일 첨부 제한
    const fileCount = 6;

    if (files.length > fileCount) {
        console.error('파일은 6개까지 첨부할 수 있습니다.');
        throw new Error('파일첨부가 초과되었습니다.');
    }

    // 파일들을 FormData에 추가
    files.forEach(file => {
        formData.append("files", file);
    });
    console.log(formData);
    console.log(files);
    try {
        const createResponse = await api.post<CommonResponse<number>>(`/notice/`,  formData ,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        console.log(createResponse);
        const response = createResponse.data;
        return await response.data;
    } catch (error) {
        console.log(error);
        return handleError(error);
    }
}

//공지 게시판 수정
export const noticeUpdate = async (id: number, data: noticeRequest, files: File[]): Promise<number> => {
    const formData = new FormData();

    // BoardRequest 객체를 FormData에 추가
    formData.append("updateDto", new Blob([JSON.stringify(data)], { type: "application/json" }));

    // 파일들을 FormData에 추가
    files.forEach(file => {
        formData.append("files", file);
    });


    try {
        const updateResponse = await api.put<CommonResponse<number>>(`/notice/${id}`, formData);
        const response = updateResponse.data;
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

//공지 게시판 삭제
export const noticeDelete = async (id: number): Promise<void> => {
    try {
        const response = await api.delete(`/notice/${id}`);
        return await response.data;
    } catch (error) {
        return handleError(error);
    }
}