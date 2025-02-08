"use client"

import { createPlaceComment } from "@/utile/api/comment/commentApi";
import { useAuth } from "@/utile/context/AuthContext";
import { useState } from "react";

interface CommentInputProps {
    placeId: number;
    onCommentSubmitted: () => void;
}

export function PlaceCommentInput({ placeId, onCommentSubmitted }: CommentInputProps) {
    const { user } = useAuth();
    const [newComment, setNewComment] = useState<string>("");
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmitComment = async () => {
        if (!newComment.trim() || selectedRating === null) {
            alert("별점과 댓글을 입력하세요.");
            return;
        }

        setLoading(true);
        try {
            const newCommentData = {
                placeId,
                replyPoint: selectedRating,
                replyContents: newComment,
                replyWriter: user?.userId,
            };
            console.log(newCommentData);
            const response =  await createPlaceComment(placeId, newCommentData);
            console.log(response);
            setNewComment("");
            setSelectedRating(null);
            onCommentSubmitted();
        } catch (error) {
            console.error("Failed to post comment:", error);
        } finally {
            setLoading(false);
        }
    };
    return <>
        <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => setSelectedRating(star)}
                        className={`cursor-pointer text-2xl ${selectedRating && selectedRating >= star ? "text-yellow-500" : "text-gray-300"
                            }`}
                    >
                        ★
                    </span>
                ))}
            </div>

            <textarea
                className="w-full border rounded p-2 mt-2"
                placeholder="댓글을 입력하세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />

            <button
                onClick={handleSubmitComment}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "작성 중..." : "댓글 작성"}
            </button>
        </div>
    </>
}