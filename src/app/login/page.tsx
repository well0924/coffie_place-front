import LoginProc from "@/components/member/login";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "로그인 페이지",
    description: "로그인 페이지",
};

export default async function loginPage() {

    return <>
        <LoginProc></LoginProc>
    </>
}