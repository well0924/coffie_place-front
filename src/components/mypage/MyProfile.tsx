"use client"

import { useAuth } from "@/utile/context/AuthContext"
import Link from "next/link"
import { useEffect } from "react";


export default function MyProfilePage() {
    const { user } = useAuth();
    if (!user) return null;

    return <>
        <div className="md:col-span-3 bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold text-center md:text-left">마이페이지</h2>

            <p className="text-sm md:text-lg mt-2 text-center md:text-left">
                <strong>아이디:</strong> {user.userId}
            </p>

            <p className="text-sm md:text-lg text-center md:text-left">
                <strong>이메일:</strong> {user.userEmail}
            </p>

            <div className="mt-6 flex flex-col md:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
                <Link
                    href={`/mypage/wishlist/${user.userId}`}
                    className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-md text-sm md:text-base text-center hover:bg-blue-600"
                >
                    위시리스트 보기
                </Link>

                <Link
                    href={`/member/edit/${user.userId}`}
                    className="w-full md:w-auto bg-gray-500 text-white px-4 py-2 rounded-md text-sm md:text-base text-center hover:bg-gray-600"
                >
                    회원정보 수정
                </Link>
            </div>
        </div>
    </>
}