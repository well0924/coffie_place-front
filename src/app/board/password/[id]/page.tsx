import PasswordConfirm from "@/components/board/passwordConfirm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "자유 게시판 비밀번호 페이지",
    description: "자유 게시판 비밀번호 입력 페이지",
};

export default function FreeBoardPasswordPage({ params, }: { params: { id: string }; }) {

    const { id } = params;

    return <>
        <PasswordConfirm boardId={parseInt(id)}></PasswordConfirm>
    </>
}