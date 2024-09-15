"use client"

import { noticeRequest } from "@/interface/notice";
import { noticeCreate } from "@/utile/api/notice/noticeApi";
import Link from "next/link";
import { useState } from "react";

interface Errors {
    noticeGroup?: string;
    isFixed?: string;
    noticeTitle?: string;
    noticeContents?: string;
    file?: string;
    general?: string;
}

export default function NoticeBoardWritePage() {
    const [noticeTitle, setNoticeTitle] = useState('');//공지게시글 제목
    const [noticeContents, setNoticeContents] = useState('');//공지게시글 내용
    const [noticeGroup, setNoticeGroup] = useState('');//공지게시글 종류 (자유게시판,공지게시판)
    const [isFixed, setIsFixed] = useState('');//공지게시판 고정여부
    const [file, setFile] = useState<File[]>([]);//첨부파일
    const [errors, setErrors] = useState<Errors>({});

    //파일 첨부
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(Array.from(e.target.files)); // 여러 파일 선택 시 배열로 변환
        }
    };

    //게시글 작성
    const handleSubmit = async () => {
        const fileGroupId = `fileGroup_${Math.random().toString(36).substring(2, 15)}`; // 랜덤 파일 그룹 ID 생성

        const data: noticeRequest = {
            noticeGroup,
            isFixed,
            noticeTitle,
            noticeWriter: 'well4149',
            noticeContents,
            fileGroupId : fileGroupId
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
        <div className="container mx-auto mt-24">
            <h1 className="text-2xl font-bold">게시글 작성</h1>
            <div className="shadow-lg rounded-lg p-6 bg-white">
                <form id="boardform" encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
                    {/* 숨겨진 필드 */}
                    <input type="hidden" id="noticeAuthor" name="noticeWriter" value="well4149" />
                    <input type="hidden" id="fileGroupId" name="fileGroupId" value="fileGroupId123" />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="noticeGroup" className="block text-sm font-medium">게시글 카테고리</label>
                            <select
                                name="noticeGroup"
                                id="noticeGroup"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                            <label htmlFor="isFixed" className="block text-sm font-medium">고정글 여부</label>
                            <select
                                name="isFixed"
                                id="isFixed"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

                    <div className="mt-4">
                        <label htmlFor="noticeTitle" className="block text-sm font-medium">제목</label>
                        <input
                            type="text"
                            id="noticeTitle"
                            name="noticeTitle"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={noticeTitle}
                            onChange={(e) => setNoticeTitle(e.target.value)}
                        />
                        {errors.noticeTitle && <p className="text-red-500">{errors.noticeTitle}</p>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="noticeContent" className="block text-sm font-medium">내용</label>
                        <textarea
                            id="noticeContent"
                            name="noticeContents"
                            rows={10}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                            value={noticeContents}
                            onChange={(e) => setNoticeContents(e.target.value)}
                        ></textarea>
                        {errors.noticeContents && <p className="text-red-500">{errors.noticeContents}</p>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="addfile" className="block text-sm font-medium">첨부 파일</label>
                        <input
                            type="file"
                            id="addfile"
                            name="file"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleFileChange}
                            multiple
                        />
                        {errors.file && <p className="text-red-500">{errors.file}</p>}
                    </div>

                    <div className="mt-6 text-right">
                        <Link href={'/notice'} className="inline-flex justify-center rounded-md border border-transparent bg-gray-500 py-2 px-4 text-sm font-medium text-white hover:bg-gray-600">목록</Link>
                        <button
                            type="button"
                            className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600"
                            onClick={handleSubmit} // handleSubmit 함수 사용
                        >
                            작성하기
                        </button>
                    </div>

                    {/* 일반 오류 메시지 */}
                    {errors.general && <p className="text-red-500">{errors.general}</p>}
                </form>
            </div>
        </div>
    </>;
}
