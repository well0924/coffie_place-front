import SideBarPage from "@/components/common/sidebar";
import MyGetUserCommentList from "@/components/mypage/MyCommentList";


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