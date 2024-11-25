"use client"

import { boardLikeProps } from "@/interface/like"
import { boardLikeDown } from "@/utile/api/like/likeApi"



export default function BoardLikeMinus({ boardId }: boardLikeProps) {

    const boardLikeDownProc = async () => {
        const response = await boardLikeDown(boardId);
    }

    return <>
        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={boardLikeDownProc}>
            좋아요 취소
        </button>
    </>
}