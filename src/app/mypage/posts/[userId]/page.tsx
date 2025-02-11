import SideBarPage from "@/components/common/sidebar";
import MyGetUserBoardList from "@/components/mypage/MyPostList";

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