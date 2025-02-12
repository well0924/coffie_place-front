"use client"
import { BoardResponse } from "@/interface/board";
import { commentRequest } from "@/interface/comment";
import { createBoardComment } from "@/utile/api/comment/commentApi";
import { useAuth } from "@/utile/context/AuthContext"
import { faComment } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";

interface CommentInputProps {
    boardId: number; // boardId prop 추가
    boardReplyList: () => void;
}


export default function CommentInput({ boardId, boardReplyList }: CommentInputProps) {
    {/**댓글 작성 폼.**/ }
    const { user } = useAuth();
    const [replyContents, setReplyContents] = useState("");

    const replyWriteProc = async () => {
        const data: commentRequest = {
            replyWriter: user?.userId,
            replyContents,
        }

        try {
            const response = await createBoardComment(data, boardId);
            alert('댓글이 작성이 되었습니다.');
            setReplyContents(""); // 입력란 초기화
            boardReplyList();//댓글 목록
        } catch (error) {
            console.log(error);
        }
    }
    return <>
        <div className="bg-white shadow-md rounded-lg mb-2 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
            <div className="bg-gray-200 p-3 rounded-t-lg flex items-center">
                <FontAwesomeIcon icon={faComment} className="mr-2 text-sm sm:text-base" />
                <span className="text-sm sm:text-base font-semibold">REPLY</span>
            </div>
            <div className="p-4">
                <ul className="list-none">
                    <li className="mb-4">
                        <textarea
                            className="w-full h-20 sm:h-24 md:h-28 p-2 border border-gray-300 rounded-lg resize-none"
                            id="contents"
                            name="replyContents"
                            value={replyContents}
                            onChange={e => setReplyContents(e.target.value)}
                            placeholder="댓글 내용을 입력하세요."
                        />
                        <div className="flex justify-center sm:justify-end">
                            <button
                                type="button"
                                className="bg-black text-white px-4 md:px-6 py-2 md:py-3 mt-3 rounded-lg hover:bg-gray-800 transition-all"
                                onClick={() => replyWriteProc()}
                            >
                                댓글 작성
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </>

}