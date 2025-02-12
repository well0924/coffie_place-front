"use client"

import { useAuth } from "@/utile/context/AuthContext"
import Link from "next/link";

export default function NoticeWriteButton() {
    const { user } = useAuth();

    return (
        <>
            {user?.role === "ROLE_ADMIN" && (
                <div className="p-4 flex justify-center md:justify-end">
                    <Link href="/notice/write">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm md:text-base hover:bg-blue-700 transition-all">
                            글쓰기
                        </button>
                    </Link>
                </div>
            )}
        </>
    );

}