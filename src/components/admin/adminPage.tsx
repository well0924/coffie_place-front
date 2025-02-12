"use client"

import { CommonResponse, Page, SearchParams, SearchType } from "@/interface/common";
import SearchForm from "../common/searchForm";
import MemberTable from "./memberTable";
import SelectDeleteButton  from "./selectDeleteButton";
import { memberResponse } from "@/interface/member";
import { memberList, memberSearch, memberSelectDelete } from "@/utile/api/member/memberApi";
import { useEffect, useState } from "react";
import Link from "next/link";

//어드민 페이지 컴포넌트
export default function AdminListPage({ searchParams }: { searchParams: SearchParams }) {
    const [members, setMembers] = useState<memberResponse[]>([]);
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [allChecked, setAllChecked] = useState(false);

    // URL의 쿼리 파라미터에서 page 값을 추출
    const pageNumber = parseInt(searchParams.page || '0') || 0;
    const pageSize = 5; // 페이지당 게시글 수
    //검색 타입
    const searchType = searchParams.searchType || SearchType.ALL;
    //검색어
    const searchVal = searchParams.searchVal || '';

    //회원 목록
    const adminLists = async () => {
        //회원 응답값
        let response: CommonResponse<Page<memberResponse>>;

        try {
            if (searchVal) {
                // 검색어가 있으면 검색된 목록
                response = await memberSearch(searchType, searchVal, pageNumber, pageSize);
                console.log("검색");
            } else {
                // 검색어가 없으면 전체 목록
                response = await memberList();
                console.log("목록");
            }
            console.log(response);
            setMembers(response.data.content || []);
        } catch (error) {
            console.log(error);
        }
    }


    // 모든 체크박스 선택 핸들러
    const handleAllCheckedChange = (checked: boolean) => {
        setAllChecked(checked);
        if (checked) {
            const allMemberIds = members.map((member) => member.userId);
            setCheckedItems(allMemberIds);
        } else {
            setCheckedItems([]);
        }
    };

    // 개별 체크박스 선택 핸들러
    const handleCheckboxChange = (userId: string) => {
        setCheckedItems((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };
     // 선택된 항목 삭제 api
     const handleDelete = async () => {
        try {
            await memberSelectDelete(checkedItems); // 선택된 항목을 삭제하는 API 호출
            alert("선택된 항목이 삭제되었습니다.");
            adminLists(); // 삭제 후 목록 새로고침
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
        }
    };
    // 페이지 초기 로드 시 회원 목록을 불러옴
    useEffect(() => {
        adminLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, searchVal, pageNumber]);

    return <>
        <div className="container mx-auto mt-24 p-4">
            {/* 버튼 그룹 */}
            <div className="flex flex-wrap justify-between mb-6 space-y-2">
                <Link href={"/place"} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    가게목록
                </Link>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    가게등록
                </button>
                {/**가게 목록 엑셀파일 다운로드**/}
                <Link href={'http://localhost:8081/api/file/place-download'}  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"> 가게 목록 다운로드</Link>
                {/*컴포넌트로 대체*/}
                <SelectDeleteButton checkedItems={checkedItems} onDelete={handleDelete}/>
                <Link href={"/notice"} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">공지글 작성</Link>
            </div>
            {/* 검색창 */}
            <SearchForm initialSearchType={searchType} initialSearchVal={searchVal} basePath="/admin"></SearchForm>
            {/* 회원 목록 */}
            <MemberTable 
            members={members} 
            checkedItems={checkedItems} 
            onCheckboxChange={handleCheckboxChange} 
            onAllCheckedChange={handleAllCheckedChange} 
            allChecked={allChecked}></MemberTable>
        </div>
    </>;
}