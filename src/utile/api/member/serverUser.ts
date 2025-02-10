import { cookies } from "next/headers";
import { api } from "../axios";
import { CommonResponse } from "@/interface/common";
import { User } from "@/interface/member";

//회원 정보 가져오기.
export const getServerUser = async (): Promise<User | null> => {
    try {
        const userSession = cookies().get("sessionId"); // 쿠키에서 세션 ID 가져오기
        if (!userSession) return null; // 세션이 없으면 로그인하지 않은 상태
        
        const sessionId = userSession.value;
        console.log(sessionId);
        // 서버에서 회원 정보 API 요청
        const response = await api.get<CommonResponse<User>>('/member/current-user', {
            params: { sessionId },
        });
        console.log(response.data);
        console.log(response.data.data);
        if (response.data.httpStatus === "OK") {
            return response.data.data; // 성공적으로 회원 정보를 가져옴
        }
        return null; // API 응답이 실패한 경우
    } catch (error) {
        console.error("서버에서 회원 정보를 가져오는 중 오류 발생:", error);
        return null;
    }
};