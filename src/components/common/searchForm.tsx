"use client"

import { SearchType } from "@/interface/common";
import { useCallback, useEffect, useState } from "react";
import { SearchFormProps } from "@/interface/common"
import Link from "next/link";
import { memberIdAutoCompleted } from "@/utile/api/member/memberApi";

export default function SearchForm({ initialSearchType, initialSearchVal, basePath }: SearchFormProps) {
    const [searchType, setSearchType] = useState<SearchType>(initialSearchType);
    const [searchVal, setSearchVal] = useState<string>(initialSearchVal);
    const [suggestedUserIds, setSuggestedUserIds] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    // 검색어 자동완성기능
    const fetchUserIdSuggestions = useCallback(async (query: string) => {
        try {
            if (query) {
                const response = await memberIdAutoCompleted(query);
                setSuggestedUserIds(response.data);
                setShowSuggestions(response.data.length > 0);
            } else {
                setSuggestedUserIds([]);
                setShowSuggestions(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    // 사용자가 입력할 때마다 자동완성 기능 동작
    useEffect(() => {
        if (searchType === SearchType.ALL || searchType === SearchType.USER_ID) {
            fetchUserIdSuggestions(searchVal);
        }
    }, [searchVal, searchType, fetchUserIdSuggestions]);

    // 자동완성 항목을 선택할 때 처리
    const handleSuggestionClick = (suggestion: string, event: React.MouseEvent) => {
        event.stopPropagation(); // 이벤트 전파 방지
        console.log("Clicked id:", suggestion); // 클릭한 아이디 출력
        setSearchVal(suggestion); // 선택한 아이디로 searchVal 업데이트
    };

    useEffect(() => {
        if (suggestedUserIds.includes(searchVal)) {
            setShowSuggestions(false); // 선택한 아이디로 searchVal 업데이트 후 제안 목록 숨기기
        }
    }, [searchVal, suggestedUserIds]);

    // 클릭 이벤트를 통해 제안 목록 숨기기
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        // 클릭한 요소가 제안 목록에 포함되지 않은 경우에만 숨김
        if (!target.closest(".suggestions") && target.tagName !== "INPUT") {
            console.log("Clicked outside:", target);
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="flex flex-col md:flex-row mb-6 relative">
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
                                onClick={(event) => handleSuggestionClick(completedId, event)}
                            >
                                {completedId}
                            </li>
                        ))}
                    </ul>
                )}
                <Link
                    href={`${basePath}?page=0&searchType=${searchType}&searchVal=${searchVal}`}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    검색
                </Link>
            </div>
        </>
    );
}