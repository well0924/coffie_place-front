import AdminListPage from "@/components/admin/adminPage";
import { CommonResponse, Page, SearchParams, SearchType } from "@/interface/common";
import { memberResponse } from "@/interface/member";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "어드민 페이지",
    description: "어드민 페이지"
}

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {

    // URL의 쿼리 파라미터에서 page 값을 추출
    const pageNumber = parseInt(searchParams.page || '0') || 0;
    const pageSize = 5; // 페이지당 게시글 수
    //검색 타입
    const searchType = searchParams.searchType || SearchType.ALL;
    //검색어
    const searchVal = searchParams.searchVal || '';
    //회원 응답값
    let response: CommonResponse<Page<memberResponse>>;

    return <>
        <AdminListPage searchParams={searchParams}></AdminListPage>
    </>

}