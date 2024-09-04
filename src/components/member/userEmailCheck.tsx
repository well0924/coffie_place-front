"use client"

import { userEmailDuplicate } from "@/utile/api/member/memberApi";
import { useState } from "react";

interface MemberEmailCheckProps {
    onIdCheck: (isDuplicate: boolean | null) => void;
}

export default function MemberEmailCheck({onIdCheck} : MemberEmailCheckProps) {
    //useState를 사용하려면 함수명은 대문자로 시작을 한다.
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
    const [validationMessage, setValidationMessage] = useState('');

    const checkEmail = async () => {
        if(userEmail.trim() === ''){
            setValidationMessage('이메일을 입력하지 않았습니다.');
            setMessage('');
            return;
        }

        try {
            const response  = await userEmailDuplicate(userEmail);
            console.log(response);
            let duplicateResult = (await response).data;

            if (duplicateResult === true) {
                setMessage('이메일이 존재합니다.');
                setIsDuplicate(true);
            } else if (duplicateResult === false) {
                setMessage('사용할 수 있는 이메일입니다.');
                setIsDuplicate(false);
            }
            setValidationMessage(''); // 유효성 메시지 지우기
            onIdCheck(isDuplicate); 
        } catch (error) {
            setMessage('이메일 중복 확인 중 오류가 발생했습니다.');
        }
    }

    return <>
        <div className="mb-4">
            <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">
                이메일
            </label>
            <div className="flex items-center">
                <input
                    type="text"
                    id="user_email"
                    name="userEmail"
                    className="form-input mt-1 block flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    style={{ maxWidth: 'calc(100% - 120px)' }} // 입력창의 최대 너비 조정
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <button
                    type="button"
                    className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    style={{ width: '120px' }} // 버튼의 너비 조정
                    onClick={checkEmail}
                >
                    중복확인
                </button>
            </div>
            {/* 메시지 출력 (색상은 isDuplicate에 따라 다름) */}
            <div
                id="msg"
                className={`text-sm mt-2 ${isDuplicate === true ? 'text-red-600' : isDuplicate === false ? 'text-blue-600' : 'text-gray-600'}`}>
                {message}
            </div>
            <div id="valie_userEmail" className="text-sm text-red-600 mb-4">
                {validationMessage}
            </div>
        </div>
    </>;
}