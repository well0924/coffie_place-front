import { memberRequest, memberResponse } from "@/interface/member";
import { api } from "../axios";
import { CommonResponse, handleError, Page, SearchType } from "@/interface/common";

//회원 목록(어드민 페이지)
export const memberList = async (
    page: number = 0,
    size: number = 5): Promise<CommonResponse<Page<memberResponse>>> => {
    try {
        const memberList = await api.get(`/member/`,{
            params :{
                page,
                size
            }
        });
        const response = memberList.data;
        console.log(memberList.data);
        if(response.status === 200) {
            return response;
        } else {
            return response;
        }
    } catch (error) {
        console.log(error);
        throw handleError(error);
    }
}

//회원 검색(어드민 페이지)
export const memberSearch = async (
    searchType: SearchType,
    searchVal: string,
    page: number = 0,
    size: number = 5): Promise<CommonResponse<Page<memberResponse>>> => {

    try {
        const searchList = await api.get(`/member/search`,{
            params: {
                searchType,
                searchVal,
                page,
                size
            }
        });
        const response = searchList.data;
        if (response.httpStatus === 'OK'){
            return response;
        } else {
            console.log('Error Message:'+response.message);
            return response;
        }
    } catch (error) {
        return handleError(error);
    }
}

//회원 단일조회(어드민 페이지, 마이 페이지)
export const memberDetail = async (id: number): Promise<memberResponse> => {
    try {
        const response = await api.get<CommonResponse<memberResponse>>(`/member/${id}`);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw handleError(error);
    }
}

//회원 가입
export const memberCreate = async (data: memberRequest): Promise<number | string> => {
    try {
        const createResult = await api.post(`/member/`, data);
        //응답값에 따른 분기처리
        let result = createResult.status;
        console.log(createResult);
        console.log(result);
        return result;
    } catch (error:any) {
        if (error.response) {
            const errorData = error.response.data;

            // 400인 경우 (잘못된 요청)
            if (error.response.status === 400) {
                // 오류 메시지를 반환 (예: 유효성 검사 실패 메시지)
                if (errorData.valid_password || errorData.valid_userId) {
                    return `${errorData.valid_password || ""} ${errorData.valid_userId || ""}`.trim();
                }
            }
        }
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
export const userIdDuplicate = async (userId: string): Promise<CommonResponse<boolean>> => {
    try {
        const duplicateResult = await api.get(`/member/id-check/${userId}`);
        console.log("중복여부::"+duplicateResult.data);
        console.log(duplicateResult.status);
        return duplicateResult.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//회원 이메일 중복
export const userEmailDuplicate = async (userEmail: string): Promise<CommonResponse<boolean>> => {
    try {
        const duplicateResult = await api.get(`/member/email-check/${userEmail}`);
        return duplicateResult.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//회원 아이디 찾기
export const findUserId = async (userName : string,userEmail : string): Promise<CommonResponse<string>> => {
    try {
        const findId = await api.get(`/member/find-id/${userName}/${userEmail}`);
        return findId.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//회원 비밀번호 찾기기능(이메일 전송)
export const temporaryPassword = async (userEmail: string): Promise<void> => {
    try {
        // API 호출
        const response = await api.post(`/member/temporary-email`, null, {
            params: { userEmail }
        });

        // 응답 처리 (예: 성공 메시지 반환)
        if (response.status === 200) {
            console.log('임시 비밀번호가 이메일로 발송되었습니다.');
        } else {
            console.log('서버 오류:', response.status);
        }
    } catch (error) {
        console.error('비밀번호 재설정 요청 중 오류 발생:', error);
        throw error; // 상위 호출자에게 오류 전달
    }
};

//회원 아이디 자동 완성
export const memberIdAutoCompleted = async (userId:string): Promise<CommonResponse<string[]>> => {
    try {
        const response = await api.get(`/member/autocomplete`, {
            params: {
              userId,
            },
          }); 
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//회원 선택 삭제
export const memberSelectDelete = async (): Promise<void> => {
    try {
        
    } catch (error) {
        console.log(error);
        throw handleError(error);
    }
}