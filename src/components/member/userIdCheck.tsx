"use client"

import { userIdDuplicate } from "@/utile/api/member/memberApi";
import { useState } from "react";

interface MemberIdCheckProps {
    onIdCheck: (isDuplicate: boolean | null, userId: string) => void;
}

export default function MemberIdCheck({ onIdCheck }: MemberIdCheckProps) {
    //useState를 사용하려면 함수명은 대문자로 시작을 한다.
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
    const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null); // 중복 여부 상태 관리
    const [validationMessage, setValidationMessage] = useState('');

    const checkId = async () => {

        if (userId.trim() === '') {
            setValidationMessage('아이디를 입력하지 않았습니다.');
            setMessage(''); // 입력하지 않았을 때는 다른 메시지 지우기
            return;
        }

        try {
            const response = userIdDuplicate(userId);

            console.log(response);

            let duplicateResult = (await response).data;
            console.log(duplicateResult);
            if (duplicateResult === true) {
                setMessage('아이디가 존재합니다.');
                setIsDuplicate(true);
                onIdCheck(true, userId);
            } else if (duplicateResult === false) {
                setMessage('아이디를 사용할 수 있습니다.');
                setIsDuplicate(false);
                onIdCheck(false, userId);
            }
            setValidationMessage(''); // 유효성 메시지 지우기
            onIdCheck(isDuplicate, userId);
        } catch (error) {
            console.error('아이디 중복 확인 중 오류 발생:', error); // 오류 내용 확인
            setMessage('아이디 중복 확인 중 오류가 발생했습니다.');
        }
    };

    return <>
        {/* 아이디 입력 필드 */}
        <div className="mb-4">
            <label htmlFor="user_id" className="block text-sm sm:text-base font-medium text-gray-700">
                아이디
            </label>
            <div className="flex items-center gap-2 md:gap-4">
                <input
                    type="text"
                    id="user_id"
                    name="userId"
                    className="form-input mt-1 block flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-auto sm:w-28 transition"
                    onClick={checkId}
                >
                    중복확인
                </button>
            </div>

            {/* 메시지 출력 (색상 변경) */}
            <div
                id="msg"
                className={`text-sm mt-2 ${isDuplicate === true ? "text-red-600" : isDuplicate === false ? "text-blue-600" : "text-gray-600"
                    }`}
            >
                {message}
            </div>
        </div>

        {/* 아이디 유효성 메시지 */}
        <div id="valid_userId" className="text-sm text-red-600 mb-4">
            {validationMessage}
        </div>
    </>

}
