"use client"

import { boardLikeProps } from "@/interface/like";
import { boardLikeCount } from "@/utile/api/like/likeApi";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"

export interface likeResponse {
    data: [number, boolean];
}

export default function BoardLikeCount({ boardId }: boardLikeProps) {
    const [boardLike, setBoardLike] = useState<number>(0);
    const [liked, setLiked] = useState<boolean>(false);

    useEffect(() => {
        const fetchLikeCount = async () => {
            try {
                const response = await boardLikeCount(boardId);

                if (response.likeCount != null) {
                    setBoardLike(response.likeCount); // 좋아요 수 업데이트
                    setLiked(response.likedStatus); // 좋아요 여부 업데이트
                }
            } catch (error) {
                console.error("Failed to fetch like count:", error);
            }
        }
        //게시글 좋아요수
        fetchLikeCount();
    }, [boardId]);

    return <>
        <FontAwesomeIcon icon={faHeart} />{boardLike} {liked}
    </>
}