"use client"

import { useAuth } from "@/utile/context/AuthContext";
import Link from "next/link";

export default function BoardWriteButton() {
    //user의 권한 분기 처리.
    const { user } = useAuth();

    return (<>
        {user?.role == 'ROLE_ADMIN' || user?.role == 'ROLE_USER' ? 
        
        (<div className="p-4 flex justify-end">
            <Link href="/board/write">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">글쓰기</button>
            </Link>
        </div>) : (
            <>
            </>
        )}
    </>);
}