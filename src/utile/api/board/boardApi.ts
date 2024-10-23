import { BoardRequest, BoardResponse } from "@/interface/board";
import { api } from "../axios";
import { CommonResponse, handleError, Page, SearchType } from "@/interface/common";

//자유 게시글 전체 목록(페이징 추가)
export const getBoardList = async (
    page: number = 0,
    size: number = 5): Promise<CommonResponse<Page<BoardResponse>>> => {

    try {
        const res = await api.get(`/board/`, {
            params: {
                page,
                size
            }
        });
        const response = res.data;
        console.log(response);
        if(response.status === 200) {
            return response;
        } else {
            console.log('else?');
            return response;
        }
    } catch (error) {
        console.log(error);
        throw handleError(error);
    }
}

//자유 게시글 검색기능 
export const getBoardListSearch = async (
    searchType: SearchType,
    searchVal: string,
    page: number = 0,
    size: number = 5): Promise<CommonResponse<Page<BoardResponse>>> => {

    try {
        const searchResult = await api.get(`/board/search`, {
            params: {
                searchType,
                searchVal,
                page,
                size,
            },
        });
        const response = searchResult.data;
        if(response.httpStatus === `OK`) {
            return response;
        } else {
            // 서버 오류 응답 처리
            console.error('서버 오류:', response.message);
            return response;
        }
    } catch (error) {
        throw handleError(error);
    }
}

//자유 게시글 단일 조회
export const getBoardDetail = async (id: number): Promise<BoardResponse> => {
    try {
        const response = await api.get<CommonResponse<BoardResponse>>(`/board/${id}`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.log(error);
        throw handleError(error);
    }
}

//자유 게시글 이전글/다음글
export const getPreviousNextBoard = async (id:number): Promise<BoardResponse[]> => {
    try {
        const response = await api.get(`/board/previous-next/${id}`);
        return response.data.data;
    } catch(error) {
        throw handleError(error);
    }
}

//자유 게시글 작성
export const createBoard = async (data: BoardRequest, files: File[]): Promise<number> => {

    const formData = new FormData();

    // BoardRequest 객체를 FormData에 추가
    formData.append("boardDto", new Blob([JSON.stringify(data)], { type: "application/json" }));

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

    try {
        //글 작성로직.
        const createResult = await api.post<CommonResponse<number>>(`/board/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const result = createResult.data;
        console.log('글이 작성되었습니다.');
        return result.data;

    } catch (error: unknown) {
        throw handleError(error);
    }
}

//자유 게시글 수정
export const updateBoard = async (id: number, data: BoardRequest, files: File[]): Promise<number> => {

    const formdate = new FormData();

    formdate.append("updateDto", new Blob([JSON.stringify(data)], { type: "application/json" }));

    // 파일들을 FormData에 추가
    files.forEach(file => {
        formdate.append("files", file);
    });

    try {
        const response = await api.put(`/board/`, formdate, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('글이 수정되었습니다.');
        return response.data;
    } catch (error: unknown) {
        console.error('Error:', error);
        throw handleError(error);
    }
}

//자유 게시글 삭제
export const boardDelete = async (id: number): Promise<void> => {

    try {
        const deleteResult = await api.delete<CommonResponse<void>>(`/board/${id}`);
        return deleteResult.data.data;
    } catch (error: unknown) {//해당 부분은 공통응답 부분을 작성해야됨..
        console.error('Error:', error);
        handleError(error);
    }
}

//자유 게시글 비밀번호 확인
export const boardPasswordConfirm = async(id:number,password:string): Promise<BoardResponse> => {
    try {
        const confirmResult = await api.get<CommonResponse<BoardResponse>>(`/board/${id}/${password}`,{withCredentials: true});
        console.log(confirmResult);
        const data = confirmResult.data.data;
        return data;        
    } catch(error) {
        console.log(error);
        throw handleError(error);
    }
}
