import SideBarPage from "@/components/common/sidebar";
import WishList from "@/components/mypage/wishList";
import { getServerUser } from "@/utile/api/member/serverUser";
import { wishPlaceLists } from "@/utile/api/my-page/my-page";


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