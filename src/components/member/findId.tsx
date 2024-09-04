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
        {/* ID 찾기*/}
        <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="text-lg font-semibold mb-4">회원 아이디 찾기</div>
            <h3 className="text-xl font-medium mb-4">아이디 찾기</h3>
            <form>
                <div className="mb-4">
                    <label htmlFor="user_name" className="block text-sm font-medium mb-1">이름</label>
                    <input
                        type="text"
                        id="user_name"
                        name="memberName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="user_email" className="block text-sm font-medium mb-1">이메일</label>
                    <input
                        type="text"
                        id="user_email"
                        name="userEmail"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                </div>
                <div className="text-right mb-4">
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={handleFindId}>
                        아이디 찾기
                    </button>
                </div>
                <div>
                    <div className={`text-lg ${message.includes('찾으시는 아이디는') ? 'text-blue-500' : 'text-red-500'}`}>
                        {message}
                    </div>
                </div>
            </form>
        </div>
    </>
}