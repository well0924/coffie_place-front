import MemberSignForm from "@/components/member/signForm";
import MemberEmailCheck from "@/components/member/userEmailCheck";
import MemberIdCheck from "@/components/member/userIdCheck";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "회원가입 페이지",
    description: "회원가입 페이지",
};

export default function memberJoinPage() {
    return <>
        <MemberSignForm></MemberSignForm>
    </>
}