import { createContext, useContext, useState, useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { api } from "../api/axios";
import { CommonResponse } from "@/interface/common";
import { User, AuthContextType } from "@/interface/member"

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedSessionId = getCookie("sessionId");
        console.log(savedSessionId);
        if (savedSessionId) {
            setSessionId(savedSessionId as string);
            fetchCurrentUser(savedSessionId as string);
        } else {
            setLoading(false);
        };
    }, []);

    //현재 회원의 정보
    const fetchCurrentUser = async (sessionId: string) => {
        console.log('세션아이디::'+sessionId);
        try {
            const response = await api.get<CommonResponse<User>>('/member/current-user', {
                params: { sessionId }
            });
            console.log(response.data.httpStatus);
            if(response.data.httpStatus === 'OK') {
                console.log(response.data.data);
                setUser(response.data.data); //회원의 데이터를 저장.
            } else {
                setError('Failed to fetch user information');
                console.log('Failed to fetch user, status not OK');
                setUser(null);
            }
        } catch (error) {
            setError('Error fetching user information');
            console.error('현재 회원 정보를 가져오는 중 오류 발생:', error);
            setUser(null);
        } finally {
            setLoading(false); // Always stop loading
        }
    };

    //로그인
    const login = (newSessionId: string) => {
        console.log('login');
        console.log(newSessionId);
        setSessionId(newSessionId);
        setCookie("sessionId", newSessionId, { maxAge: 7 * 24 * 60 * 60 });
        fetchCurrentUser(newSessionId);
        location.href='/'
    };

    //로그아웃
    const logout = () => {
        console.log('log-out');
        setSessionId(null);
        deleteCookie("sessionId");
        setUser(null); // 로그아웃 시 사용자 정보 초기화
    };

    return (
        <AuthContext.Provider value={{ sessionId, user, login, logout }}>
             {error ? <div>{error}</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};