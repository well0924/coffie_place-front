"use client"

import { commentResponse } from "@/interface/comment";
import { getUserComments } from "@/utile/api/my-page/my-page";
import { useAuth } from "@/utile/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyGetUserCommentList() {
    const { user } = useAuth(); // 현재 로그인한 사용자 정보
    const [comments, setComments] = useState<commentResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!user) return;

        const fetchMyComments = async () => {
            try {
                const response = await getUserComments(user.userId); // API 호출
                console.log(response);
                setComments(response ?? []); // 데이터 설정
            } catch (error) {
                console.error("내가 작성한 댓글 불러오기 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyComments();
    }, [user]);
    console.log(comments);
    if (!user) {
        return <div className="text-center mt-12 text-lg">로그인이 필요합니다.</div>;
    }

    return <>
        <div className="md:col-span-3 bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">내가 작성한 댓글</h2>

            {loading ? (
                <p className="text-center text-gray-500">로딩 중...</p>
            ) : comments.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-center hidden md:table-cell">글번호</th>
                                <th className="px-4 py-2 w-50">댓글 내용</th>
                                <th className="px-4 py-2 text-center hidden md:table-cell">댓글 작성자</th>
                                <th className="px-4 py-2 text-center hidden md:table-cell">작성날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((comment) => (
                                <tr key={comment.id} className="border-b">
                                    <td className="px-4 py-2 text-center hidden md:table-cell">{comment.id}</td>
                                    <td className="px-4 py-2">{comment.replyContents}</td>
                                    <td className="px-4 py-2 text-center hidden md:table-cell">{comment.replyWriter}</td>
                                    <td className="px-4 py-2 text-center hidden md:table-cell">
                                        {new Date(comment.createdTime).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-4">조회된 댓글이 없습니다.</p>
            )}

            <div className="mt-6">
                <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    메인으로 가기
                </Link>
            </div>
        </div>
    </>
}