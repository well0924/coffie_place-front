"use client"

import { commentResponse } from "@/interface/comment";
import { deletePlaceComment, placeCommentList } from "@/utile/api/comment/commentApi";
import { replyLikeCount, replyLikeDown, replyLikeUp } from "@/utile/api/like/likeApi";
import { useEffect, useState } from "react";
import CommentInput from "./commentInput";
import { PlaceCommentInput } from "./placeCommentInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

interface PlaceCommentsProps {
    placeId: number;
}

export function PlaceCommentList({ placeId }: PlaceCommentsProps) {
    const [comments, setComments] = useState<commentResponse[]>([]);
    const [likes, setLikes] = useState<Record<number, number>>({}); // 각 댓글의 좋아요 개수를 저장
    const [likedStatus, setLikedStatus] = useState<Record<number, boolean>>({}); // 사용자가 좋아요를 눌렀는지 저장

    const fetchComments = async () => {
        try {
            const response = await placeCommentList(placeId);
            console.log(response);
            setComments(response.data);

            // 각 댓글의 좋아요 개수 불러오기
            const likesData: Record<number, number> = {};
            const likedStatusData: Record<number, boolean> = {};

            for (const comment of response.data) {
                const likeCount = await replyLikeCount(comment.id);
                likesData[comment.id] = Number(likeCount[0]) || 0; // 좋아요 개수 저장
                likedStatusData[comment.id] = likeCount[1] === "true"; // 사용자가 좋아요를 눌렀는지 저장
            }

            setLikes(likesData);
            setLikedStatus(likedStatusData);
        } catch (error) {
            console.error("Failed to fetch comments:", error);
            setComments([]);
        }
    };

    useEffect(() => {
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placeId]);

    //댓글 삭제
    const handleDeleteComment = async (commentId: number) => {
        if (confirm("댓글을 삭제하시겠습니까?")) {
            try {
                await deletePlaceComment(placeId, commentId);
                fetchComments(); // 목록 업데이트
            } catch (error) {
                console.error("Failed to delete comment:", error);
            }
        }
    };

    // 댓글 좋아요 토글
    const handleLikeToggle = async (commentId: number) => {
        try {
            if (likedStatus[commentId]) {
                await replyLikeDown(commentId);
                setLikes((prev) => ({ ...prev, [commentId]: Math.max((prev[commentId] ?? 1) - 1, 0), }));
                setLikedStatus((prev) => ({ ...prev, [commentId]: false, }));
            } else {
                await replyLikeUp(commentId);
                setLikes((prev) => ({ ...prev, [commentId]: (prev[commentId] ?? 0) + 1, }));
                setLikedStatus((prev) => ({ ...prev, [commentId]: true, }));
            }
        } catch (error) {
            console.error("Failed to toggle like:", error);
        }
    };

    return <>
        <div className="mt-8 bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-4">댓글</h2>

            {/* 댓글 입력창 */}
            <PlaceCommentInput placeId={placeId} onCommentSubmitted={fetchComments} />

            {/* 댓글 목록 */}
            <div className="space-y-4">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <p className="font-semibold text-sm sm:text-base">{comment.replyWriter}</p>
                                    <div className="flex text-yellow-500 text-xs sm:text-sm">
                                        {"★".repeat(comment.reviewPoint)}
                                        {"☆".repeat(5 - comment.reviewPoint)}
                                    </div>
                                </div>
                                <p className="text-gray-700 text-sm sm:text-base">{comment.replyContents}</p>
                            </div>
                            <div className="flex flex-row sm:flex-col items-center space-x-3 sm:space-x-0 sm:space-y-2">
                                {/* 좋아요 버튼 */}
                                <button onClick={() => handleLikeToggle(comment.id)} className="flex items-center space-x-2">
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        className={`w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 transition ${likedStatus[comment.id] ? "text-red-500" : "text-gray-500"}`}
                                    />
                                    <span className="text-sm sm:text-base">{likes[comment.id] ?? 0}</span>
                                </button>

                                {/* 삭제 버튼 */}
                                <button onClick={() => handleDeleteComment(comment.id)} className="text-gray-500 hover:text-red-500">
                                    <FontAwesomeIcon icon={faTrash} className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">아직 댓글이 없습니다.</p>
                )}
            </div>
        </div>
    </>

}