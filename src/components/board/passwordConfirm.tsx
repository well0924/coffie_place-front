"use client"

import { BoardResponse } from "@/interface/board";
import { boardPasswordConfirm } from "@/utile/api/board/boardApi";
import { useAuth } from "@/utile/context/AuthContext";
import { useContext, useState } from "react"


export default function PasswordConfirm({ boardId }: { boardId: number }) {
    const { sessionId } = useAuth();
    const [pWd, setPWd] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handlePasswordSubmit = async () => {
        console.log(pWd);
        try {
            const result: BoardResponse = await boardPasswordConfirm(boardId, pWd);
            console.log(result);
            if (result) {
                location.href = `/board/${boardId}`;
            }
        } catch (error) {
            setErrorMessage('비밀번호가 일치하지 않습니다. 다시 시도해주세요.');
        }
    };

    try {
        return (
            <div className="container mx-auto mt-16 px-4">
                <div className="flex flex-col items-center sm:flex-row justify-center">
                    <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
                        <div className="bg-white shadow-lg rounded-lg">
                            <div className="bg-gray-100 p-6 rounded-t-lg text-center">
                                <h1 className="text-xl md:text-2xl font-bold">비밀번호를 입력해주세요.</h1>
                                <p className="mt-2 text-gray-600 text-sm md:text-base">
                                    비밀번호가 있습니다. 비밀번호를 입력해주세요.
                                </p>
                            </div>
                            <div className="p-6">
                                <div id="pwForm">
                                    <div className="mb-4">
                                        <label
                                            htmlFor="inputnumber"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            비밀번호
                                        </label>
                                        <input
                                            type="password"
                                            name="passWd"
                                            id="inputnumber"
                                            autoComplete="off"
                                            value={pWd}
                                            onChange={(e) => setPWd(e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="flex justify-center sm:justify-end">
                                        <button
                                            type="button"
                                            className="bg-blue-600 text-white text-sm md:text-base px-4 md:px-6 py-2 md:py-3 rounded-md shadow hover:bg-blue-700 transition-colors"
                                            id="pwdButton"
                                            onClick={handlePasswordSubmit}
                                        >
                                            입력
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="container mx-auto mt-16 px-4">
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-md text-center">
                        <h1 className="text-2xl font-bold mb-4">오류 발생</h1>
                        <p className="text-gray-600">게시글을 불러오는 중 문제가 발생했습니다. 나중에 다시 시도해주세요.</p>
                    </div>
                </div>
            </div>
        );
    }
}


