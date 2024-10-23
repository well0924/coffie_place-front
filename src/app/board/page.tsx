import BoardWriteButton from "@/components/board/boardWriteButton";
import Pagination from "@/components/common/paging";
import SearchForm from "@/components/common/searchForm";
import { BoardResponse } from "@/interface/board";
import { CommonResponse, Page, SearchParams, SearchType } from "@/interface/common";
import { getBoardList, getBoardListSearch } from "@/utile/api/board/boardApi";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "자유 게시판 페이지",
    description: "자유 게시판 목록 페이지",
};

export default async function boardListPage({ searchParams }: { searchParams: SearchParams }) {
    
    // URL의 쿼리 파라미터에서 page 값을 추출
    const pageNumber = parseInt(searchParams.page || '0') || 0;
    const pageSize = 5; // 페이지당 게시글 수
    //검색 타입
    const searchType = searchParams.searchType || SearchType.ALL;
    //검색어
    const searchVal = searchParams.searchVal || '';

    let response: CommonResponse<Page<BoardResponse>>;
    //글 목록 api
    try {
        if (searchVal) {
            response = await getBoardListSearch(searchType, searchVal, pageNumber, pageSize);

        } else {
            response = await getBoardList(pageNumber, pageSize);
        }

        const boards = response.data.content || [];
        const totalPages = response.data.totalPages;

        return <>
            <div className="container mx-auto mt-24">
                <div className="bg-white shadow-md rounded-lg">
                    <div className="p-6">
                        <h4 className="text-2xl font-semibold text-center mb-4">자유 게시판</h4>
                        <SearchForm initialSearchType={searchType} initialSearchVal={searchVal} basePath="/board" />
                        <table className="table-auto w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">글번호</th>
                                    <th scope="col" className="py-3 px-4 w-1/2">제목</th>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">작성자</th>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">조회수</th>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">작성날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                {boards.length > 0 ? (
                                    boards.map((board) => (
                                        <tr key={board.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="text-center py-4 px-4 hidden md:table-cell">{board.id}</td>
                                            <td className="py-4 px-4">
                                                {board.passWd ?
                                                    (
                                                        <Link href={`/board/password/${board.id}`} className="text-blue-600 hover:underline">
                                                            {board.boardTitle}
                                                        </Link>
                                                    ) :
                                                    (
                                                        <Link href={`/board/${board.id}`} className="text-blue-600 hover:underline">
                                                            {board.boardTitle}
                                                        </Link>
                                                    )}
                                            </td>
                                            <td className="text-center py-4 px-4 hidden md:table-cell">{board.boardAuthor}</td>
                                            <td className="text-center py-4 px-4 hidden md:table-cell">{board.readCount}</td>
                                            <td className="text-center py-4 px-4 hidden md:table-cell">
                                                {new Date(board.createdTime).toLocaleDateString()}
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

                    {/* 페이징 */}
                    <Pagination basePath="/board" pageNumber={pageNumber} pageSize={pageSize} totalPages={totalPages}></Pagination>

                    {/* 글쓰기 버튼 (로그인한 사용자만 표시) */}
                    <BoardWriteButton></BoardWriteButton>
                </div>
            </div>
        </>;
    } catch (error) {

        return <>
            <div className="container mx-auto mt-24">
                <div className="bg-white shadow-md rounded-lg">
                    <div className="p-4">
                        <h4 className="text-2xl font-semibold text-center mb-4">자유 게시판</h4>
                        <SearchForm initialSearchType={searchType} initialSearchVal={searchVal} basePath="/board" />
                        <table className="table-auto w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">글번호</th>
                                    <th scope="col" className="py-3 px-4 w-1/2">제목</th>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">작성자</th>
                                    <th scope="col" className="text-center py-3 px-4 hidden md:table-cell">조회수</th>
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
                    {/*글 작성*/}
                    <BoardWriteButton></BoardWriteButton>
                </div>
            </div>
        </>;
    }
}