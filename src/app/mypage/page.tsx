import SideBarPage from "@/components/common/sidebar";
import MyProfilePage from "@/components/mypage/MyProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "마이페이지",
    description: "회원의 정보와 위시리스트를 보는 페이지"
}

export default async function MyPage() {

    return <>
        <div className="container mx-auto mt-12 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* 사이드바 */}
                <SideBarPage />
                <MyProfilePage></MyProfilePage>
            </div>
        </div>
    </>
}