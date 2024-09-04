//권한
export enum Role {
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN"
}


//회원 요청
export interface memberRequest{
    useId:string;
    password:string;
    memberName:string;
    userPhone:string;
    userGender:string;
    userAge:string;
    userEmail:string;
    userAddr1:string;
    userAddr2:string;
    memberLat:number;
    memberLng:number;
    role:Role;
}

//회원 응답
export interface memberResponse{
    id:number;
    userId:string;
    password:string;
    memberName:string;
    userPhone:string;
    userGender:string;
    userAge:string;
    userEmail:string;
    userAddr1:string;
    userAddr2:string;
    memberLng:number;
    memberLat:number;
    role:Role;
    createdTime:Date;
}

//로그인 응답
export interface LoginRequest{
    userId:string;
    password:string;
}