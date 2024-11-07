//권한
export enum Role {
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN"
}


//회원 요청
export interface memberRequest {
    userId: string;
    password?: string; //회원 수정시에는 사용을 하지 않기.
    memberName: string;
    userPhone: string;
    userGender: string;
    userAge: string;
    userEmail: string;
    userAddr1: string;
    userAddr2: string;
    memberLat: number;
    memberLng: number;
    role: Role;
}

export interface MemberDetailProps {
    id: number;
    userId: string;
    password: string;
    userEmail: string;
    memberName: string;
    userAge: string;
    userGender: string;
    userPhone: string;
    memberLat: number;
    memberLng: number;
    userAddr1: string;
    userAddr2: string;
    role: Role; 
}

//회원 응답
export interface memberResponse {
    id: number;
    userId: string;
    password: string;
    memberName: string;
    userPhone: string;
    userGender: string;
    userAge: string;
    userEmail: string;
    userAddr1: string;
    userAddr2: string;
    memberLng: number;
    memberLat: number;
    role: Role;
    createdTime: Date;
}

//로그인 요청
export interface LoginRequest {
    userId: string;
    password: string;
}

export interface User {
    id: number;
    userId: string;
    memberLat: number;
    memberLng: number;
    memberName: string;
    role: Role;
    userAge: number;
    userEmail: string;
    userGender: string;
    userPhone: string;
    httpStatus: string;
}

export interface AuthContextType {
    sessionId: string | null;
    user: User | null;
    login: (sessionId: string) => void;
    logout: () => void;
}