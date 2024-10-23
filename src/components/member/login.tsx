"use client"
import {useAuth} from "@/utile/context/AuthContext";
import { loginProc } from "@/utile/api/login/loginApi";
import Link from "next/link"
import { useState } from "react";

interface LoginRequest {
    userId: string;
    password: string;
}

export default function LoginProcPage() {
    const { login } = useAuth(); // AuthContext에서 login 함수 사용
    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLoginProc = async () => {
        setErrorMessage(null); // 에러 메시지 초기화

        const loginData: LoginRequest = {
            userId,
            password,
        };
        console.log(loginData);
        try {
            const response = await loginProc(loginData);
            console.log(response);

            // 로그인 성공 시
            console.log("로그인 성공:", response.data);
            if (response.httpStatus === "OK") {
                // 로그인 성공 시 세션 ID를 쿠키에 저장
                document.cookie = `sessionId=${response.data}; path=/; max-age=${7 * 24 * 60 * 60};`; // 7일 동안 유지
                console.log("로그인 성공:", response.data);
                login(response.data);//세션 아이디를 AuthProvider에 보내기.        
            
            } else {
                // 로그인 실패 시
                setErrorMessage(response.message || "로그인에 실패했습니다.");
            }
        } catch (error) {
            setErrorMessage("로그인 중 오류가 발생했습니다.");
        }
    };

    return <>
        <div className="container mx-auto mt-24">
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <div className="card shadow-lg rounded-lg overflow-hidden">
                        <div className="bg-gray-800 text-white text-center py-4">
                            <h2 className="text-xl font-semibold">로그인</h2>
                        </div>
                        <div className="p-6">
                            {errorMessage && (
                                <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
                            )}
                                <div className="mb-4">
                                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                                        아이디
                                    </label>
                                    <input
                                        type="text"
                                        id="user_id"
                                        name="userId"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="user_pw" className="block text-sm font-medium text-gray-700">
                                        비밀번호
                                    </label>
                                    <input
                                        type="password"
                                        id="user_pw"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <Link href="/login/tmpid" className="text-sm text-blue-600 hover:underline">
                                    <>아이디 비밀번호 찾기</>
                                </Link>
                                <div className="mt-6 flex justify-end space-x-4">
                                    <button 
                                    type="button" 
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    onClick={handleLoginProc}>
                                        로그인
                                    </button>
                                    <Link href="/member/join" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                                        <>회원가입</>
                                    </Link>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}