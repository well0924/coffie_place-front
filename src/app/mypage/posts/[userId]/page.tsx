import SideBarPage from "@/components/common/sidebar";
import MyGetUserBoardList from "@/components/mypage/MyPostList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "내가 작성한 게시글",
    description: "마이페이지에서 회원이 작성한 게시글 보기"
}

export default async function MyPageBoardList() {

    return <>
        <div className="container mx-auto mt-12 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SideBarPage />
                <MyGetUserBoardList></MyGetUserBoardList>
            </div>
        </div>
    </>
}