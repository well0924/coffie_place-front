import { CommonResponse, handleError } from "@/interface/common";
import { LoginRequest } from "@/interface/member";
import { api } from "../axios";
import { deleteCookie } from "cookies-next";

//로그인
export const loginProc = async (login:LoginRequest) :Promise<CommonResponse<string>> => {
    try {
        const response = await api.post<CommonResponse<string>>(`/member/login`,login,{ headers: {
            'Content-Type': 'application/json',
        }});
        return response.data;
    } catch(error:any) {
        return handleError(error);
    }
}

//로그아웃
export const logoutProc = async () :Promise<void> => {
    try {
        console.log('logout');
        await api.post(`/member/logout`);
        deleteCookie("sessionId");
    } catch(error) {
        handleError(error);
    }
}
