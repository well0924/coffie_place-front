import { Metadata } from "next";
import FindIdPage from "@/components/member/findId"
import PasswordResetForm from "@/components/member/passwordResetRequest";

export const metadata: Metadata = {
    title: "회원아이디 비밀번호 찾기 페이지",
    description: "회원가입 페이지",
};

export default function findTempIdAndPassword() {

    return <>
        <div className="container mx-auto mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* ID 찾기*/}
                <FindIdPage/>
                {/*비밀번호 재설정 Card */}
                <PasswordResetForm/>
            </div>
        </div>
    </>;
}