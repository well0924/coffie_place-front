"use client"

import { useAuth } from "@/utile/context/AuthContext"
import Link from "next/link"
import { useEffect } from "react";


export default function MyProfilePage() {
    const { user } = useAuth();
    if (!user) return null;

    return <>
        {/* 마이페이지 정보 */}
        <div className="md:col-span-3 bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-bold">마이페이지</h2>
            <p className="text-lg mt-2"><strong>아이디:</strong> {user.userId}</p>
            <p className="text-lg"><strong>이메일:</strong> {user.userEmail}</p>

            <div className="mt-6 flex gap-4">
                <Link
                    href={`/mypage/wishlist/${user.userId}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    위시리스트 보기
                </Link>
                <Link
                    href={`/member/edit/${user.userId}`}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    회원정보 수정
                </Link>
            </div>
        </div>
    </>
}