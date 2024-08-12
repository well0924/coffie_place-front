import SearchForm from "@/components/common/searchForm";
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
                        <SearchForm initialSearchType={searchType} initialSearchVal={searchVal} />
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
                    <div className="flex justify-between items-center p-6">
                        <Link href={`/notice?page=${pageNumber - 1}`}>
                            <button
                                className={`px-3 py-1 rounded-md text-white ${pageNumber === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                    }`}
                                disabled={pageNumber === 0}
                            >
                                이전
                            </button>
                        </Link>
                        <div className="flex space-x-2">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Link key={i} href={`/notice?page=${i}`}>
                                    <button
                                        className={`px-3 py-1 rounded-md ${i === pageNumber
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                </Link>
                            ))}
                        </div>
                        <Link href={`/notice?page=${pageNumber + 1}`}>
                            <button
                                className={`px-3 py-1 rounded-md text-white ${pageNumber === totalPages - 1
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                                    }`}
                                disabled={pageNumber === totalPages - 1}
                            >
                                다음
                            </button>
                        </Link>
                    </div>
                    {/*글 작성*/}
                    <div className="p-4 flex justify-end">
                        <Link href="/page/notice/writePage">
                            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">글쓰기</button>
                        </Link>
                    </div>

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