import axios, { AxiosError } from "axios";

//공통응답 관련
export interface CommonResponse<T> {
    length: number;
    status: number;
    message?: string;
    data: T;
    httpStatus?: string;
    errorcode?: string;
}

//페이징 관련 
export interface Page<T> {
    content: T[];
    pageable: any;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: any;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

//가게 목록 무한 스크롤
export interface Slice<T> {
    content: T[];          
    number: number;
    size: number;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
}

//검색 enum
export enum SearchType {
    TITLE = 't', //글 제목
    CONTENTS = 'c',//글 내용
    WRITER = 'w',//작성자
    USER_ID = 'i',//회원 아이디
    USER_EMAIL = 'e',//회원 이메일
    USER_NAME = 'n',//회원 이름
    PLACE_NAME = 'p',//가게명
    PLACE_ADDRESS = 'a',//가게 주소
    ALL = 'all'
}

//페이징 관련 
export interface SearchParams {
    page?: string;
    searchType?: SearchType; // 검색 타입
    searchVal?: string;     // 검색 값
    sort?: string; //정렬 타입
}

//검색어 컴포넌트 관련
export interface SearchFormProps {
    initialSearchType: SearchType;
    initialSearchVal: string;
    basePath: string;
}

//validate 체크(게시글,공지게시글)
export const handleError = (error: unknown): CommonResponse<string>  => {
    
    console.error('Error:', error);

    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<CommonResponse<any>>;

        if (axiosError.response) {
            const serverResponse = axiosError.response.data;
            console.error(`서버 오류: ${serverResponse.message}`);

            // 상태 코드에 따른 처리
            if (axiosError.response.status === 400) {
                const errors = serverResponse.data; // 400 상태 코드일 때의 오류 데이터를 가져옵니다.

                if (errors && typeof errors === 'object') {
                    // 특정 필드에 대한 오류 처리
                    if ('valid_boardTitle' in errors) {
                        console.error('Title Error:', errors['valid_boardTitle']);
                    }
                    if ('valid_boardContents' in errors) {
                        console.error('Contents Error:', errors['valid_boardContents']);
                    }
                    if ('valid_noticeGroup' in errors) {
                        console.error('noticeGroup Error:', errors['valid_noticeGroup']);
                    }
                    if ('valid_noticeFixed' in errors) {
                        console.error('noticeFixed Error:', errors['valid_noticeFixed']);
                    }
                    if ('valid_noticeTitle' in errors) {
                        console.error('Title Error:', errors['valid_noticeTitle']);
                    }
                    if ('valid_noticeContents' in errors) {
                        console.error('Contents Error:', errors['valid_noticeContents']);
                    }
                }
            } else if (axiosError.response.status === 500) {
                // 500 상태 코드에 대한 처리
                console.error('서버 내부 오류 발생');
            }
            // 다른 상태 코드에 대한 처리가 필요할 경우 추가

            // 에러코드 처리
            if (serverResponse.errorcode) {
                console.error('에러 코드:', serverResponse.errorcode);
            }
        } else {
            console.error('응답이 없습니다. 네트워크 오류일 수 있습니다.');
        }
    } else {
        console.error('알 수 없는 오류 발생:', error);
    }

    throw error; // 필요에 따라 에러를 다시 던지거나 처리
};
