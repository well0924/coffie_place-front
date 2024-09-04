import KakaoMap from "@/components/common/kakaoMap";
import SearchForm from "@/components/common/searchForm";
import { CommonResponse, Page, SearchParams, SearchType } from "@/interface/common";
import { memberResponse } from "@/interface/member";
import { memberList, memberSearch } from "@/utile/api/member/memberApi";
import { Metadata } from "next";
import Link from "next/link";

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

    //api를 호출
    try {
        //회원 목록 api
        if (searchVal) {
            //검색어가 있으면 검색목록
            response = await memberSearch(searchType, searchVal, pageNumber, pageSize);
        } else {
            //검색어가 없으면 일반 목록
            response = await memberList(pageNumber, pageSize);
        }

        const members = response.data.content || [];
        const totalPages = response.data.totalPages;

        return <>
            <div className="container mx-auto mt-24 p-4">
                {/* 버튼 그룹 */}
                <div className="flex flex-wrap justify-between mb-6 space-y-2">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        가게목록
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        가게등록
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        선택삭제
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        공지글 작성
                    </button>
                </div>
                {/* 검색창 */}
                <SearchForm initialSearchType={searchType} initialSearchVal={searchVal} basePath="/admin"></SearchForm>
                {/* 테이블 */}
                <table className="table-auto w-full text-center border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">
                                <input id="allCheckBox" type="checkbox" />
                            </th>
                            <th className="border border-gray-300 p-2">아이디</th>
                            <th className="border border-gray-300 p-2">이름</th>
                            <th className="border border-gray-300 p-2">이메일</th>
                            <th className="border border-gray-300 p-2">등급</th>
                            <th className="border border-gray-300 p-2">등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* memberlist를 받아와서 각 멤버 정보를 표시합니다. */}
                        {members.length > 0 ? (
                            members.map((member) => (
                                <tr key={member.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="checkbox"
                                            className="chk"
                                            name="cchk"
                                            value={member.userId}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <Link href={`/admin/${member.id}`}>
                                            {member.userId}
                                        </Link>
                                    </td>
                                    <td className="border border-gray-300 p-2">{member.memberName}</td>
                                    <td className="border border-gray-300 p-2">{member.userEmail}</td>
                                    <td className="border border-gray-300 p-2">{member.role}</td>
                                    <td className="border border-gray-300 p-2">{new Date(member.createdTime).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="border border-gray-300 p-4">
                                    조회된 회원이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    } catch (error) {
        return <>
            <div className="container mx-auto mt-24 p-4">
                {/* 버튼 그룹 */}
                <div className="flex flex-wrap justify-between mb-6 space-y-2">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        가게목록
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        가게등록
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        선택삭제
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        공지글 작성
                    </button>
                </div>

                {/* 검색 영역 */}
                <div className="flex justify-center mb-6 space-x-4">
                    <select
                        name="searchType"
                        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="searchType"
                    >
                        <option>-----------</option>
                        <option value="all">전체</option>
                        <option value="i">아이디</option>
                        <option value="n">이름</option>
                        <option value="e">이메일</option>
                    </select>
                    <input
                        type="text"
                        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="autocompleteText"
                        name="userId"
                        placeholder="회원아이디를 입력해주세요."
                    />
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        검색
                    </button>
                </div>

                {/* 테이블 */}
                <table className="table-auto w-full text-center border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">
                                <input id="allCheckBox" type="checkbox" />
                            </th>
                            <th className="border border-gray-300 p-2">아이디</th>
                            <th className="border border-gray-300 p-2">이름</th>
                            <th className="border border-gray-300 p-2">이메일</th>
                            <th className="border border-gray-300 p-2">등급</th>
                            <th className="border border-gray-300 p-2">등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* memberlist를 받아와서 각 멤버 정보를 표시합니다. */}
                        <tr>
                            <td colSpan={6} className="border border-gray-300 p-4">
                                조회된 회원이 없습니다.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    }

}