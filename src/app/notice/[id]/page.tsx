import { noticeDetail } from "@/utile/api/notice/noticeApi";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "공지 게시판 조회 페이지",
    description: "공지 게시판 조회 페이지",
};

export default function noticeDetailPage() {
    //
    
    return <>
        <h1>공지 게시글 조회</h1>
    </>
}