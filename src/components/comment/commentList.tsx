"use client"

import { commentResponse } from "@/interface/comment";
import { boardCommentList, deleteBoardComment } from "@/utile/api/comment/commentApi";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CommentInput from "./commentInput";


interface CommentListProps {
    boardId: number;
}


export default function CommentListPage({ boardId }: CommentListProps) {
    const [comments, setComments] = useState<commentResponse[]>([]);
    const [loading, setLoading] = useState(true);

    //댓글 목록 
    const boardReplyList = async () => {
        try {
            const response = await boardCommentList(boardId);
            if (response?.data) {
                setComments(response.data); // 댓글 데이터 설정
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        boardReplyList();
    }, [boardId]);

    //댓글 삭제 
    const boardReplyDelete = async (commentId: number) => {
        try {
            await deleteBoardComment(boardId);
            setComments((prevComments) =>
                prevComments.filter((comment) => comment.id !== commentId));
            alert("댓글이 삭제되었습니다.");            
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <CommentInput boardId={boardId} boardReplyList={boardReplyList}></CommentInput>
        <div id="replylist" className="space-y-4 p-4">
            <h2 className="text-2xl font-bold mb-4">댓글 목록</h2>
            {loading ? (
                <p>댓글을 불러오는 중입니다...</p>
            ) : comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="bg-white shadow-md rounded-lg p-4">
                        <div className="mb-2 text-gray-500 flex items-center">
                            <FontAwesomeIcon icon={faComment} className="mr-2" />
                            <span>댓글 ID: {comment.id}</span>
                        </div>
                        <ul className="space-y-2">
                            <li className="bg-gray-100 p-3 rounded-lg">
                                <div className="mb-2 flex items-center space-x-2">
                                    <label className="font-bold">작성자:</label>
                                    <span>{comment.replyWriter}</span>
                                </div>
                                <div className="mb-2">
                                    <label className="font-bold">글 내용:</label>
                                    <p>{comment.replyContents}</p>
                                </div>
                                <div className="text-gray-400 text-sm">
                                    <label className="font-bold">작성 시간:</label>
                                    <span>{new Date(comment.createdTime).toLocaleString("ko-KR")}</span>
                                </div>
                                <button
                                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={() => boardReplyDelete(comment.id)}
                                >
                                    삭제
                                </button>
                            </li>
                        </ul>
                    </div>
                ))
            ) : (
                <div className="text-gray-600">
                    <h6><strong>등록된 댓글이 없습니다.</strong></h6>
                </div>
            )}
        </div>
    </>;
}