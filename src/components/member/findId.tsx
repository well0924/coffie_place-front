"use client"

import { findUserId } from "@/utile/api/member/memberApi";
import { useState } from "react";


export default function FindIdPage() {

    const [memberName, setMemberName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('');

    // 이름과 아이디의 유효성 검사
    const validateInputs = () => {
        console.log(memberName);
        if (memberName.trim().length === 0) {
            alert('이름을 입력해주세요.');
            return false;
        }
        console.log(userEmail);
        if (userEmail.trim().length === 0) {
            alert('이메일을 입력해주세요.');
            return false;
        }

        return true;
    };

    // 이메일 형식 체크
    const validateEmailFormat = () => {
        const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

        if (!regEmail.test(userEmail)) {
            alert('이메일 형식이 아닙니다.');
            return false;
        }
        return true;
    };

    // 아이디 찾기 기능
    const handleFindId = async () => {
        if (validateInputs() && validateEmailFormat()) {
            try {
                const response = await findUserId(memberName, userEmail);
                const data = response.data;
                if (data) {
                    setMessage(`찾으시는 아이디는 ${data}입니다.`);
                } else {
                    setMessage('찾으시는 아이디가 없거나 이름을 잘못 입력하셨습니다.');
                }
            } catch (error) {
                console.error(error);
                setMessage('오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    return <>
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
                <div className="text-lg font-semibold mb-4 text-center sm:text-left">회원 아이디 찾기</div>
                <h3 className="text-lg sm:text-xl font-medium mb-4 text-center">아이디 찾기</h3>
                <form>
                    <div className="mb-4">
                        <label htmlFor="user_name" className="block text-sm sm:text-base font-medium mb-1">이름</label>
                        <input
                            type="text"
                            id="user_name"
                            name="memberName"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base"
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="user_email" className="block text-sm sm:text-base font-medium mb-1">이메일</label>
                        <input
                            type="text"
                            id="user_email"
                            name="userEmail"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </div>
                    <div className="text-center sm:text-right mb-4">
                        <button
                            type="button"
                            className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                            onClick={handleFindId}>
                            아이디 찾기
                        </button>
                    </div>
                    <div>
                        <div className={`text-sm sm:text-base text-center ${message.includes('찾으시는 아이디는') ? 'text-blue-500' : 'text-red-500'}`}>
                            {message}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>

}