"use client"
import { useAuth } from "@/utile/context/AuthContext";
import { loginProc } from "@/utile/api/login/loginApi";
import Link from "next/link"
import { useState } from "react";
import { LoginRequest } from "@/interface/member";

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
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
                <div className="bg-gray-800 text-white text-center py-4 rounded-t-lg">
                    <h2 className="text-lg sm:text-xl font-semibold">로그인</h2>
                </div>
                <div className="p-4 sm:p-6">
                    {errorMessage && (
                        <div className="mb-4 text-red-500 text-sm sm:text-base">{errorMessage}</div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="user_id" className="block text-sm sm:text-base font-medium text-gray-700">
                            아이디
                        </label>
                        <input
                            type="text"
                            id="user_id"
                            name="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="user_pw" className="block text-sm sm:text-base font-medium text-gray-700">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="user_pw"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="text-center sm:text-right mb-4">
                        <Link href="/login/tmpid" className="text-sm text-blue-600 hover:underline">
                            아이디 비밀번호 찾기
                        </Link>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                        <button
                            type="button"
                            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            onClick={handleLoginProc}>
                            로그인
                        </button>
                        <Link href="/member/join" className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                            회원가입
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>

}