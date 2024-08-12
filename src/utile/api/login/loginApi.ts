import { handleError } from "@/interface/common";
import { LoginRequest } from "@/interface/member";
import exp from "constants";
import { api } from "../axios";

//로그인
export const loginProc = async (login:LoginRequest) :Promise<string> => {
    try {
        const loginProc = await api.post(`/member/login`,login,{ headers: {
            'Content-Type': 'application/json',
        }});

        console.log(loginProc.data);
        return loginProc.data;
    } catch(error) {
        return handleError(error);
    }
}

export const logout = async () :Promise<void> => {
    try {
        const logoutProc = await api.post(`/member/logout`);
    } catch(error) {
        return handleError(error);
    }
}