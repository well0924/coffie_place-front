import SideBarPage from "@/components/common/sidebar";
import WishList from "@/components/mypage/wishList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "가게 위시리스트",
    description: "마이페이지에서 회원이 위시리스트에 추가한 가게를 보는 페이지"
}

export default async function WishListPage() {

    return <>
         <div className="container mx-auto mt-12 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SideBarPage />
                <WishList/>
            </div>
        </div>
    </>
}