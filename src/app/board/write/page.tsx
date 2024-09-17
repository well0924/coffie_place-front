import FreeBoardWritePage from "@/components/board/boardForm"
import { Metadata } from "next"


export const metaData: Metadata = {
    title: "자유 게시글 작성",
    description: "자유 게시글 작성 페이지 "
}

export default function freeBoardWrite() {
    return <>
        <FreeBoardWritePage></FreeBoardWritePage>        
    </>
}