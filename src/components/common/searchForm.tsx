"use client"

import { SearchType } from "@/interface/common";
import { useCallback, useEffect, useState } from "react";
import { SearchFormProps } from "@/interface/common"
import Link from "next/link";
import { memberIdAutoCompleted } from "@/utile/api/member/memberApi";

export default function SearchForm({ initialSearchType, initialSearchVal, basePath }: SearchFormProps) {
    const [searchType, setSearchType] = useState<SearchType>(initialSearchType);
    const [searchVal, setSearchVal] = useState<string>(initialSearchVal);
    const [suggestedUserIds, setSuggestedUserIds] = useState<string[]>([]); //회원 아이디 
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useState<number>(0); // `Link` 강제 업데이트용 키 값

    const fetchUserIdSuggestions = async (query: string) => {
        if (!query.trim()) {
            setSuggestedUserIds([]);
            setShowSuggestions(false);
            return;
        }
        try {
            const response = await memberIdAutoCompleted(query);
            setSuggestedUserIds(response.data);
            setShowSuggestions(response.data.length > 0);
        } catch (error) {
            console.log("자동완성 API 호출 오류:", error);
        }
    };

    // 🔹 자동완성 항목 선택 시
    const handleSuggestionClick = (suggestion: string) => {
        setSearchVal(suggestion);
        setShowSuggestions(false); // 목록 숨기기
    };

    // 🔹 검색 버튼 클릭 시 `key` 값을 변경하여 강제 업데이트
    const handleSearch = () => {
        if (!searchVal.trim()) return; // 빈 검색어 방지
        setSearchKey((prev) => prev + 1);
    };

    return (
        <>
            <div className="flex justify-center items-center w-full max-w-lg mx-auto mt-4">
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value as SearchType)}
                    className="mb-2 md:mb-0 md:mr-2 p-2 border rounded"
                >
                    <option value={SearchType.ALL}>전체보기</option>
                    <option value={SearchType.TITLE}>제목</option>
                    <option value={SearchType.CONTENTS}>내용</option>
                    <option value={SearchType.WRITER}>작성자</option>
                    <option value={SearchType.USER_ID}>사용자 ID</option>
                    <option value={SearchType.USER_EMAIL}>사용자 이메일</option>
                    <option value={SearchType.USER_NAME}>사용자 이름</option>
                    <option value={SearchType.PLACE_NAME}>가게장소 이름</option>
                    <option value={SearchType.PLACE_ADDRESS}>가게장소 주소</option>
                </select>
                <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => {
                        setSearchVal(e.target.value);
                        setShowSuggestions(e.target.value.length > 0);
                    }}
                    className="mb-2 md:mb-0 md:mr-2 p-2 border rounded"
                    placeholder="검색어 입력"
                />
                {/* 아이디 자동완성기능 */}
                {showSuggestions && suggestedUserIds.length > 0 && (
                    <ul className="absolute left-0 w-full bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto z-20 top-full suggestions">
                        {suggestedUserIds.map((completedId, index) => (
                            <li
                                key={index}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSuggestionClick(completedId)}
                            >
                                {completedId}
                            </li>
                        ))}
                    </ul>
                )}
                {/* 가게 최근 검색어 저장 */}

                <Link
                    key={searchKey}
                    href={`${basePath}?page=0&size=10&searchType=${searchType}&searchVal=${searchVal}`}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    onClick={handleSearch}
                >
                    검색
                </Link>
            </div>
        </>
    );
}