import { memberRequest, memberResponse } from "@/interface/member";
import { api } from "../axios";
import { handleError, SearchType } from "@/interface/common";

//회원 목록
export const memberList = async (): Promise<memberResponse[]> => {
    try {
        const memberList = await api.get(`/member`);
        return memberList.data.contents;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//회원 검색
export const memberSearch = async (
    searchType: SearchType,
    searchVal: string,
    page: number = 0,
    size: number = 5): Promise<memberResponse[]> => {

    try {
        const response = await api.get(`/member/search`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

//회원 단일조회
export const memberDetail = async (id: number): Promise<memberResponse> => {
    try {
        const response = await api.get(`/member/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//회원 가입
export const memberCreate = async (data: memberRequest): Promise<number> => {
    try {
        const createResult = await api.post(`/member/`, data);
        console.log(createResult);
        return createResult.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//회원 탈퇴
export const memberDelete = async (id: number): Promise<void> => {
    try {
        const deleteResult = await api.delete(`/member/${id}`);
        return deleteResult.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//회원 정보 수정
export const memberUpdate = async (id: number, data: memberRequest): Promise<number> => {
    try {
        const updateResult = await api.put(`/member/${id}`, data);
        return updateResult.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//회원 아이디 중복
export const userIdDuplicate = async (userId: string): Promise<boolean> => {
    try {
        const duplicateResult = await api.get(`/member/id-check/${userId}`);
        return duplicateResult.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//회원 이메일 중복
export const userEmailDuplicate = async (userEmail: string): Promise<boolean> => {
    try {
        const duplicateResult = await api.get(`/member/email-check/${userEmail}`);
        return duplicateResult.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}