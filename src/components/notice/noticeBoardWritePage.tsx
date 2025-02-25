"use client"

import { noticeRequest } from "@/interface/notice";
import { noticeCreate } from "@/utile/api/notice/noticeApi";
import Link from "next/link";
import 'react-quill/dist/quill.snow.css';
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import ReactQuill, { ReactQuillProps } from "react-quill";

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

export default function NoticeBoardWritePage() {
    const [noticeTitle, setNoticeTitle] = useState('');//공지게시글 제목
    const [noticeContents, setNoticeContents] = useState('');//공지게시글 내용
    const [noticeGroup, setNoticeGroup] = useState('');//공지게시글 종류 (자유게시판,공지게시판)
    const [isFixed, setIsFixed] = useState('');//공지게시판 고정여부
    const [file, setFile] = useState<File[]>([]);//첨부파일
    const [errors, setErrors] = useState<Errors>({});
    const quillRef = useRef<ReactQuill>(null);

    //파일 첨부
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(Array.from(e.target.files)); // 여러 파일 선택 시 배열로 변환
        }
    };

    //게시글 작성
    const handleSubmit = async () => {
        const fileGroupId = `notice_${Math.random().toString(36).substring(2, 10)}`; // 랜덤 파일 그룹 ID 생성 notice_랜덤문자8자
        //에디터 적용에 필요한 글
        const data: noticeRequest = {
            noticeGroup,
            isFixed,
            noticeTitle,
            noticeWriter: 'well4149',
            noticeContents,
            fileGroupId: fileGroupId
        }
        console.log(data);

        try {
            const response = await noticeCreate(data, file);
            if (response > 0) {
                alert('공지글이 작성이 되었습니다.');
                console.log(response);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <div className="container mx-auto mt-12 p-6">
            <h1 className="text-2xl font-bold text-center md:text-left">게시글 작성</h1>

            <div className="shadow-lg rounded-lg p-6 bg-white">
                <form id="boardform" encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
                    {/* 숨겨진 필드 */}
                    <input type="hidden" id="noticeAuthor" name="noticeWriter" value="well4149" />
                    <input type="hidden" id="fileGroupId" name="fileGroupId" value="fileGroupId123" />

                    {/* 카테고리 & 고정글 여부 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="noticeGroup" className="block text-sm md:text-base font-medium">게시글 카테고리</label>
                            <select
                                name="noticeGroup"
                                id="noticeGroup"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                                value={noticeGroup}
                                onChange={(e) => setNoticeGroup(e.target.value)}
                            >
                                <option value="">카테고리 그룹</option>
                                <option value="공지게시판">공지게시판</option>
                                <option value="자유게시판">자유게시판</option>
                            </select>
                            {errors.noticeGroup && <p className="text-red-500">{errors.noticeGroup}</p>}
                        </div>

                        <div>
                            <label htmlFor="isFixed" className="block text-sm md:text-base font-medium">고정글 여부</label>
                            <select
                                name="isFixed"
                                id="isFixed"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                                value={isFixed}
                                onChange={(e) => setIsFixed(e.target.value)}
                            >
                                <option value="">고정글 여부</option>
                                <option value="Y">Y</option>
                                <option value="N">N</option>
                            </select>
                            {errors.isFixed && <p className="text-red-500">{errors.isFixed}</p>}
                        </div>
                    </div>

                    {/* 제목 */}
                    <div className="mt-4">
                        <label htmlFor="noticeTitle" className="block text-sm md:text-base font-medium">제목</label>
                        <input
                            type="text"
                            id="noticeTitle"
                            name="noticeTitle"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base h-10 md:h-12"
                            value={noticeTitle}
                            onChange={(e) => setNoticeTitle(e.target.value)}
                        />
                        {errors.noticeTitle && <p className="text-red-500">{errors.noticeTitle}</p>}
                    </div>

                    {/* 내용 */}
                    <div className="mt-4">
                        <label htmlFor="noticeContent" className="block text-sm md:text-base font-medium">내용</label>
                        <QuillNoSSRWrapper
                            forwardedRef={quillRef}
                            value={noticeContents}
                            onChange={setNoticeContents}
                            style={{ width: "100%", height: "200px" }} // 반응형으로 자동 조정
                            theme="snow"
                        />
                        {errors.noticeContents && <p className="text-red-500">{errors.noticeContents}</p>}
                    </div>

                    {/* 파일 업로드 */}
                    <div className="mt-4">
                        <label htmlFor="addfile" className="block text-sm md:text-base font-medium">첨부 파일</label>
                        <input
                            type="file"
                            id="addfile"
                            name="file"
                            className="mt-1 block w-full border border-gray-300 border-dashed p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                            onChange={handleFileChange}
                            multiple
                        />
                        {errors.file && <p className="text-red-500">{errors.file}</p>}
                    </div>

                    {/* 버튼 */}
                    <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-2">
                        <Link href="/notice" className="w-full md:w-auto inline-flex justify-center rounded-md border border-transparent bg-gray-500 py-2 px-4 text-sm md:text-base font-medium text-white hover:bg-gray-600">
                            목록
                        </Link>
                        <button
                            type="button"
                            className="w-full md:w-auto inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm md:text-base font-medium text-white hover:bg-blue-600"
                            onClick={handleSubmit}
                        >
                            작성하기
                        </button>
                    </div>

                    {/* 일반 오류 메시지 */}
                    {errors.general && <p className="text-red-500 mt-4">{errors.general}</p>}
                </form>
            </div>
        </div>
    </>;
}
