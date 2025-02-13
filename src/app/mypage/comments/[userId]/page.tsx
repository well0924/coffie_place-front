import SideBarPage from "@/components/common/sidebar";
import MyGetUserCommentList from "@/components/mypage/MyCommentList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "내가 작성한 댓글",
    description: "마이페이지에서 내가 작성한 댓글을 보여주는 페이지"
}

export default function MyCommentListPage() {

    return <>
        <div className="container mx-auto mt-12 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SideBarPage />
                <MyGetUserCommentList></MyGetUserCommentList>
            </div>
        </div>
    </>
}