"use client"

import { useAuth } from "@/utile/context/AuthContext";
import Link from "next/link";


export default function SideBarPage() {
    const { user } = useAuth();

    if (!user) return null;

    return <>
    <div className="w-full sm:w-64 bg-gray-100 p-4 shadow-lg rounded-md">
      <h3 className="text-lg font-bold mb-4 text-center sm:text-left">{user.userId}님</h3>
      <ul className="space-y-2">
        <li>
          <Link href={`/mypage/wishlist/${user.userId}`} className="block px-4 py-3 md:px-3 md:py-2 hover:bg-gray-200 rounded-md text-center sm:text-left">
            찜한 리스트
          </Link>
        </li>
        <li>
          <Link href={`/member/edit/${user.userId}`} className="block px-4 py-3 md:px-3 md:py-2 hover:bg-gray-200 rounded-md text-center sm:text-left">
            회원정보 수정
          </Link>
        </li>
        <li>
          <Link href={`/mypage/posts/${user.userId}`} className="block px-4 py-3 md:px-3 md:py-2 hover:bg-gray-200 rounded-md text-center sm:text-left">
            내가 쓴 글
          </Link>
        </li>
        <li>
          <Link href={`/mypage/comments/${user.userId}`} className="block px-4 py-3 md:px-3 md:py-2 hover:bg-gray-200 rounded-md text-center sm:text-left">
            내가 쓴 댓글
          </Link>
        </li>
        <li>
          <Link href={`/mypage/nearplace`} className="block px-4 py-3 md:px-3 md:py-2 hover:bg-gray-200 rounded-md text-center sm:text-left">
            가까운 가게
          </Link>
        </li>
        <li>
          <Link href={`/mypage/liked/${user.userId}`} className="block px-4 py-3 md:px-3 md:py-2 hover:bg-gray-200 rounded-md text-center sm:text-left">
            좋아요 한 글
          </Link>
        </li>
        <li>
          <button className="block w-full px-4 py-3 md:px-3 md:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-center"
            onClick={() => alert("회원탈퇴 기능은 추가 예정입니다.")}>
            회원탈퇴
          </button>
        </li>
      </ul>
    </div>
  </>
  
}