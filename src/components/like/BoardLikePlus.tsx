"use client"

import { boardLikeProps } from "@/interface/like";
import { boardLikeUp } from "@/utile/api/like/likeApi";

export default function BoardLike({boardId } : boardLikeProps) {

    //게시글 좋아요 추가.
    const boardLikePlusProc = async () => {
       const response = await boardLikeUp(boardId);
    }
    
    return <>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={boardLikePlusProc}>
            좋아요
        </button>
    </>;
}