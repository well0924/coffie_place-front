"use client"

import axios from "axios";
import { useState } from "react";



export default function MemberIdCheck() {
    //useState를 사용하려면 함수명은 대문자로 시작을 한다.
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
  
    const checkId = async () => {
      try {
        const response = (await axios.get(`/api/member/id-check${userId}`));
        setMessage(response.data.exists ? '아이디가 이미 존재합니다.' : '사용 가능한 아이디입니다.');
      } catch (error) {
        setMessage('아이디 중복 확인 중 오류가 발생했습니다.');
      }
    };
  
    return <>
        {/* 아이디 */}
        <div className="mb-4">
            <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                아이디
            </label>
            <div className="flex items-center">
                <input
                    type="text"
                    id="user_id"
                    name="userId"
                    className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    style={{ maxWidth: 'calc(100% - 120px)' }}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button
                    type="button"
                    className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    style={{ width: '120px' }} // 버튼의 너비 조정
                    onClick={checkId}
                >
                    중복확인
                </button>
            </div>
            <div id="msg" className="text-sm text-red-600 mt-2">{message}</div>
        </div>
        <div id="valid_userId" className="text-sm text-red-600 mb-4"></div>
    </>
}