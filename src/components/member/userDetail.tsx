"use client"

import { useState } from "react";

interface MemberDetailProps {
    userId: string;
    password: string;
    userEmail: string;
    memberName: string;
    userAge: string;
    userGender: string;
    userPhone: string;
    userAddr1: string;
    userAddr2: string;
}

export default function MemberModifyPage({
    userId,
    password,
    userEmail,
    memberName,
    userAge,
    userGender,
    userPhone,
    userAddr1,
    userAddr2,
}: MemberDetailProps) {

    const [gender, setGender] = useState(userGender);

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value);
    };

    return <>
        <div className="container mx-auto mt-24">
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-lg rounded-lg">
                        <div className="bg-gray-800 text-white text-center py-3 rounded-t-lg">
                            회원수정
                        </div>
                        <div className="p-6">
                            <form action="/api/memberupdate" method="POST">
                                <div className="mb-4">
                                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">아이디</label>
                                    <input
                                        type="text"
                                        id="user_id"
                                        name="userId"
                                        defaultValue={userId}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="user_pw" className="block text-sm font-medium text-gray-700">비밀번호</label>
                                    <input
                                        type="password"
                                        id="user_pw"
                                        name="userPw"
                                        defaultValue={password}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">이메일</label>
                                    <input
                                        type="text"
                                        id="user_email"
                                        name="userEmail"
                                        defaultValue={userEmail}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">이름</label>
                                    <input
                                        type="text"
                                        id="user_name"
                                        name="memberName"
                                        defaultValue={memberName}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="user_age" className="block text-sm font-medium text-gray-700">나이</label>
                                    <input
                                        type="text"
                                        id="user_age"
                                        name="userAge"
                                        defaultValue={userAge}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">성별</label>
                                    <div className="mt-2 flex items-center">
                                        <label className="mr-4">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                name="userGender"
                                                checked={gender === "남성"}
                                                onChange={handleGenderChange}
                                            />
                                            남성
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                name="userGender"
                                                checked={gender === "여성"}
                                                onChange={handleGenderChange}
                                            />
                                            여성
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="user_phone" className="block text-sm font-medium text-gray-700">전화번호</label>
                                    <input
                                        type="text"
                                        id="user_phone"
                                        name="userPhone"
                                        defaultValue={userPhone}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="user_addr1" className="block text-sm font-medium text-gray-700">주소</label>
                                    <div className="flex items-center mt-1">
                                        <input
                                            type="text"
                                            id="user_addr1"
                                            name="userAddr1"
                                            defaultValue={userAddr1}
                                            className="w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <button
                                            type="button"
                                            className="ml-2 px-3 py-2 bg-gray-300 rounded-md"
                                        >
                                            <i className="fa fa-search"></i> 주소찾기
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        id="user_addr2"
                                        name="userAddr2"
                                        defaultValue={userAddr2}
                                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div id="map" className="hidden w-72 h-72 mt-4">
                                    <div id="centerAddr"></div>
                                </div>

                                <div className="text-right mt-6">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2"
                                    >
                                        정보수정
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-red-600 text-white rounded-md mr-2"
                                    >
                                        정보삭제
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                    >
                                        취소
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}