"use client"

import { BoardResponse } from "@/interface/board";
import { getUserPosts } from "@/utile/api/my-page/my-page";
import { useAuth } from "@/utile/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyGetUserBoardList() {
    const { user } = useAuth();
    const [posts, setPosts] = useState<BoardResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!user) return;

        const fetchMyPosts = async () => {
            try {
                const response = await getUserPosts(user.userId); // API 호출
                console.log(response);
                setPosts(response || []); // 데이터 설정
            } catch (error) {
                console.error("내가 작성한 글 불러오기 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyPosts();
    }, [user]);

    if (!user) {
        return <div className="text-center mt-12 text-lg">로그인이 필요합니다.</div>;
    }

    return <>
         <div className="md:col-span-3 bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">내가 작성한 글</h2>

            {loading ? (
                <p className="text-center text-gray-500">로딩 중...</p>
            ) : posts.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm sm:text-base">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-center hidden md:table-cell">글번호</th>
                                <th className="px-4 py-2 w-50">제목</th>
                                <th className="px-4 py-2 text-center hidden md:table-cell">작성자</th>
                                <th className="px-4 py-2 text-center hidden md:table-cell">작성날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2 text-center hidden md:table-cell">{post.id}</td>
                                    <td className="px-4 py-2">
                                        <Link
                                            href={
                                                post.fileGroupId === "Y" || post.fileGroupId === "N"
                                                    ? `/notice/detail/${post.id}`
                                                    : `/board/detail/${post.id}`
                                            }
                                            className="text-blue-600 hover:underline"
                                        >
                                            {post.boardTitle}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2 text-center hidden md:table-cell">{post.boardAuthor}</td>
                                    <td className="px-4 py-2 text-center hidden md:table-cell">
                                        {new Date(post.createdTime).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-4">조회된 게시글이 없습니다.</p>
            )}

            {/* 메인으로 가기 버튼 */}
            <div className="mt-6 flex justify-center">
                <Link
                    href="/"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm sm:text-base"
                >
                    메인으로 가기
                </Link>
            </div>
        </div>
    </>
}