import SideBarPage from "@/components/common/sidebar";
import MyProfilePage from "@/components/mypage/MyProfile";
import { getServerUser } from "@/utile/api/member/serverUser";
import Link from "next/link";


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