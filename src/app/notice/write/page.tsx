import NoticeBoardWritePage from "@/components/notice/noticeBoardWritePage";
import { Metadata } from "next";


export const metaData: Metadata = {
    title: "공지 게시글 작성",
    description: "공지 게시글 작성 페이지 "
}

export default function noticeBoardWrite() {
    
    return <>
        <NoticeBoardWritePage/>
    </>;
}