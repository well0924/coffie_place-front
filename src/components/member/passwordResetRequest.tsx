"use client"

import { temporaryPassword } from "@/utile/api/member/memberApi";
import { useState } from "react";

export default function PasswordResetForm() {

    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('');

    // 유효성 검사
    const validateInputs = () => {
        if (userId.trim().length === 0) {
            alert('아이디를 입력해주세요.');
            return false;
        }
        if (userEmail.trim().length === 0) {
            alert('이메일을 입력해주세요.');
            return false;
        }
        return true;
    };

    const validateEmailFormat = () => {
        const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        if (!regEmail.test(userEmail)) {
            alert('이메일 형식이 아닙니다.');
            return false;
        }
        return true;
    };

    // 비밀번호 변경 요청 핸들러
    const handlePasswordReset = async () => {
        if (validateInputs() && validateEmailFormat()) {
            try {
                await temporaryPassword(userEmail);
                setMessage('임시 비밀번호가 이메일로 발송되었습니다.');
                window.location.href = '/login/tmppwd';
            } catch (error) {
                console.error(error);
                setMessage('오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    return <>
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">회원 비밀번호 찾기</h2>
                <h3 className="text-base sm:text-lg font-medium mb-4">비밀번호 찾기</h3>
                <form id="findPw">
                    <div className="mb-4">
                        <label htmlFor="user_id" className="block text-sm sm:text-base font-medium mb-1">아이디</label>
                        <input
                            type="text"
                            id="user_id"
                            name="userId"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="find_email" className="block text-sm sm:text-base font-medium mb-1">이메일</label>
                        <input
                            type="text"
                            id="find_email"
                            name="userEmail"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-6 flex justify-center sm:justify-end">
                        <button
                            type="button"
                            className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                            onClick={handlePasswordReset}
                        >
                            비밀번호 변경
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>

}