import Pagination from "@/components/common/paging";
import SearchForm from "@/components/common/searchForm";
import NoticeWriteButton from "@/components/notice/noticeWriteButton";
import { CommonResponse, Page, SearchParams, SearchType } from "@/interface/common";
import { noticeResponse } from "@/interface/notice";
import { getNoticeList, noticeListSearch } from "@/utile/api/notice/noticeApi";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "공지 게시판 페이지",
    description: "공지 게시판 목록 페이지",
};

export default async function noticeListPage({ searchParams }: { searchParams: SearchParams }) {

    // URL의 쿼리 파라미터에서 page 값을 추출
    const pageNumber = parseInt(searchParams.page || '0') || 0;
    const pageSize = 5; // 페이지당 게시글 수
    //검색 타입
    const searchType = searchParams.searchType || SearchType.ALL;
    //검색어
    const searchVal = searchParams.searchVal || '';

    //공지 게시글 api + 검색
    let response: CommonResponse<Page<noticeResponse>>;

    try {
        if (searchVal) {
            console.log('검색어:'+searchVal);
            console.log('검색 타입:'+searchType);
            response = await noticeListSearch(searchType, searchVal, pageNumber, pageSize);
        } else {
            response = await getNoticeList(pageNumber, pageSize);
        }

        const notices = response.data.content || [];
        const totalPages = response.data.totalPages;

        return <>
            <div className="container mx-auto mt-24">
                <div className="bg-white shadow-md rounded-lg">
                    <div className="p-6">
                        <h4 className="text-2xl font-semibold text-center mb-4">공지게시판</h4>
                        <SearchForm initialSearchType={searchType} initialSearchVal={searchVal} basePath="/notice"/>
                        <table className="table-auto w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">글번호</th>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">카테고리</th>
                                    <th scope="col" className="py-3 px-4 w-1/2">제목</th>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">작성자</th>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">작성날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notices.length > 0 ? (
                                    notices.map((notice) => (
                                        <tr key={notice.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="text-center py-4 px-4 hidden md:table-cell">{notice.id}</td>
                                            <td className="text-center py-4 px-4 hidden md:table-cell">{notice.noticeGroup}</td>
                                            <td className="py-4 px-4">
                                                <Link href={`/notice/${notice.id}`} className="text-blue-600 hover:underline">
                                                    {notice.noticeTitle}
                                                </Link>
                                            </td>
                                            <td className="text-center py-4 px-4 hidden md:table-cell">{notice.noticeWriter}</td>
                                            <td className="text-center py-4 px-4 hidden md:table-cell">
                                                {new Date(notice.createdTime).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4 px-4">조회된 게시글이 없습니다.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/*페이징*/}
                    <Pagination basePath="/notice" pageNumber={pageNumber} pageSize={pageSize} totalPages={totalPages}></Pagination>
                    {/*글 작성*/}
                    <NoticeWriteButton></NoticeWriteButton>
                </div>
            </div>
        </>
    } catch (error) {
        return <>
            <div className="container mx-auto mt-24">
                <div className="bg-white shadow-md rounded-lg">
                    <div className="p-6">
                        <h4 className="text-2xl font-semibold text-center mb-4">공지게시판</h4>
                        <table className="table-auto w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">글번호</th>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">카테고리</th>
                                    <th scope="col" className="py-3 px-4 w-1/2">제목</th>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">작성자</th>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">작성날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={5} className="text-center py-4 px-4">조회된 게시글이 없습니다.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    }
}