"use client"

import { BoardRequest } from '@/interface/board';
import { createBoard } from '@/utile/api/board/boardApi';
import { useAuth } from '@/utile/context/AuthContext';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRef, useState } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';


//게시글 작성시 400에러에 관련된 인터페이스
interface Errors {
    noticeGroup?: string;
    isFixed?: string;
    noticeTitle?: string;
    noticeContents?: string;
    file?: string;
    general?: string;
}

interface ForwardedQuillComponent extends ReactQuillProps {
    forwardedRef: React.Ref<ReactQuill>;
}

const QuillNoSSRWrapper = dynamic(
    async () => {
        const { default: QuillComponent } = await import('react-quill');
        const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
            <QuillComponent ref={forwardedRef} {...props} />
        );
        return Quill;
    },
    { loading: () => <div>...loading</div>, ssr: false },
);

export default function FreeBoardWritePage() {
    const { user } = useAuth();
    const [boardTitle, setBoardTitle] = useState("");//자유 게시글 제목
    const [boardContents, setBoardContents] = useState("");//자유 게시글 내용
    const [boardAuthor] = useState("");//자유 게시글 작성자
    const [passWd, setPassWd] = useState("");//자유 게시글 비밀번호
    const [file, setFile] = useState<File[]>([]);//첨부파일
    const quillRef = useRef<ReactQuill>(null);

    //파일 업로드
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(Array.from(e.target.files)); // 여러 파일 선택 시 배열로 변환
        }
    };

    //자유게시글 작성
    const handleFreeBoard = async () => {
        //file-group-id
        const randomId = `free_${Math.random().toString(36).substring(2, 10)}`;

        const data: BoardRequest = {
            boardTitle,
            boardContents,
            boardAuthor: user?.userId,
            readCount: 0,
            passWd,
            fileGroupId: randomId
        }
        console.log(boardAuthor);
        console.log(data);
        try {
            const response = await createBoard(data, file);

            if (response > 0) {
                alert('게시글이 작성이 되었습니다.');
                console.log(response);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <div className="container mx-auto mt-12 px-4">
            <div className="flex justify-center">
                <div className="w-full max-w-full sm:max-w-3xl">
                    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">게시글 작성</h1>
                    <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
                        <form id="boardform" encType="multipart/form-data">
                            <input type="hidden" id="board_Author" name="boardAuthor" value="current_user" />
                            <input type="hidden" id="fileGroupId" name="fileGroupId" value="fileGroupId" />

                            <div className="mb-4">
                                <label htmlFor="board_Title" className="block text-gray-700 text-sm md:text-base font-bold mb-2">
                                    제목
                                </label>
                                <input
                                    type="text"
                                    id="board_Title"
                                    name="boardTitle"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm md:text-base leading-tight focus:outline-none focus:shadow-outline"
                                    value={boardTitle}
                                    onChange={(e) => setBoardTitle(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="passWd" className="block text-gray-700 text-sm md:text-base font-bold mb-2">
                                    비밀번호
                                </label>
                                <input
                                    type="password"
                                    id="passWd"
                                    name="passWd"
                                    autoComplete="off"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm md:text-base leading-tight focus:outline-none focus:shadow-outline"
                                    value={passWd}
                                    onChange={(e) => setPassWd(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="board_Contents" className="block text-gray-700 text-sm md:text-base font-bold mb-2">
                                    내용
                                </label>
                                <QuillNoSSRWrapper
                                    forwardedRef={quillRef}
                                    value={boardContents}
                                    onChange={setBoardContents}
                                    style={{ width: '100%', height: '170px' }}
                                    theme="snow"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="addfile" className="block text-gray-700 text-sm md:text-base font-bold mb-2">
                                    첨부 파일
                                </label>
                                <input
                                    type="file"
                                    id="addfile"
                                    name="file"
                                    className="block w-full text-sm md:text-base text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-2">
                                <Link
                                    href={"/board"}
                                    className="bg-gray-500 text-white text-sm md:text-base font-bold py-2 px-4 md:py-3 md:px-6 rounded focus:outline-none focus:shadow-outline text-center"
                                >
                                    목록
                                </Link>
                                <button
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-700 text-white text-sm md:text-base font-bold py-2 px-4 md:py-3 md:px-6 rounded focus:outline-none focus:shadow-outline text-center"
                                    onClick={handleFreeBoard}
                                >
                                    작성하기
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}