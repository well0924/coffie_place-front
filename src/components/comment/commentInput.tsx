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


export default function CommentInput({boardId,boardReplyList}:CommentInputProps) {
    {/**댓글 작성 폼.**/ }
    const { user } = useAuth();
    const [replyContents,setReplyContents] = useState("");

    const replyWriteProc = async () => {
        const data : commentRequest = {
            replyWriter: user?.userId,
            replyContents,
        }

        try {
            const response = await createBoardComment(data,boardId);
            alert('댓글이 작성이 되었습니다.');
            setReplyContents(""); // 입력란 초기화
            boardReplyList();//댓글 목록
        } catch(error) {
            console.log(error);
        }
    }
    return <>
        {/**Comments section**/}
        <div className="bg-white shadow-md rounded-lg mb-2">
            <div className="bg-gray-200 p-3 rounded-t-lg flex items-center">
                <FontAwesomeIcon icon={faComment} className="mr-2" /> REPLY
            </div>
            <div className="p-4">
                <ul className="list-none">
                    <li className="mb-4">
                        <textarea
                            className="w-full h-20 p-2 border border-gray-300 rounded-lg"
                            id="contents"
                            name="replyContents"
                            value={replyContents}
                            onChange={e => setReplyContents(e.target.value)}
                            placeholder="댓글 내용을 입력하세요." // 플레이스홀더 추가
                        />
                        <button
                            type="button"
                            className="bg-black text-white px-4 py-2 mt-3 rounded-lg hover:bg-gray-800"
                            onClick={() => replyWriteProc()} // 클릭 이벤트 추가
                        >
                            댓글 작성
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </>
}