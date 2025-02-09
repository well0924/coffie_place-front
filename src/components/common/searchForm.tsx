"use client"

import { SearchType } from "@/interface/common";
import { useCallback, useEffect, useRef, useState } from "react";
import { SearchFormProps } from "@/interface/common"
import Link from "next/link";
import { memberIdAutoCompleted } from "@/utile/api/member/memberApi";
import RecentPlaceSearchLists from "../place/placeRecentSearchList";
import { createRecentSearchLog, recentSearchList } from "@/utile/api/place/placeApi";


export default function SearchForm({ initialSearchType, initialSearchVal, basePath }: SearchFormProps) {
    const [searchType, setSearchType] = useState<SearchType>(initialSearchType);
    const [searchVal, setSearchVal] = useState<string>(initialSearchVal);
    const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false);
    const [showAutoComplete, setShowAutoComplete] = useState<boolean>(false);
    const [suggestedUserIds, setSuggestedUserIds] = useState<string[]>([]);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchRecentSearches();
    }, []);

    // 최근 검색어 목록 불러오기
    const fetchRecentSearches = async () => {
        try {
            const response = await recentSearchList();
            
            if (response.length === 0) {
                // 목록이 없을 경우 빈 배열 설정
                setRecentSearches([]);
            } else {
                // 목록이 있을 경우 데이터 설정
                setRecentSearches(response.map((item) => item.name));
            }
        } catch (error) {
            console.error("최근 검색어 불러오기 실패:", error);
        }
    };

    // 검색 실행 시 최근 검색어 저장
    const handleSearch = async () => {
        if (!searchVal.trim()) return;

        try {
            await createRecentSearchLog(searchVal); // 최근 검색어 저장
            fetchRecentSearches(); // 최근 검색어 목록 갱신
        } catch (error) {
            console.error("최근 검색어 저장 실패:", error);
        }
    };

    // 자동완성 데이터 불러오기
    const fetchUserIdSuggestions = async (query: string) => {
        if (!query.trim()) {
            setSuggestedUserIds([]);
            setShowAutoComplete(false);
            return;
        }
        try {
            const response = await memberIdAutoCompleted(query);
            setSuggestedUserIds(response.data);
            setShowAutoComplete(response.data.length > 0);
        } catch (error) {
            console.error("자동완성 API 호출 오류:", error);
        }
    };

    // 검색어 선택 시 입력창에 적용
    const handleSelectSearch = (query: string) => {
        setSearchVal(query);
        setShowRecentSearches(false);
        setShowAutoComplete(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
                setShowRecentSearches(false);
                setShowAutoComplete(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div className="flex flex-col items-center space-y-4">
                {/* 검색 필터 & 검색창 그룹 */}
                <div className="flex items-center space-x-4 w-full max-w-lg">
                    {/* 검색 필터 (셀렉트 박스) */}
                    <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value as SearchType)}
                        className="p-2 border rounded w-1/4"
                    >
                        <option value="ALL">전체보기</option>
                        <option value="TITLE">제목</option>
                        <option value="CONTENTS">내용</option>
                        <option value="USER_ID">사용자 ID</option>
                        <option value="USER_NAME">사용자 이름</option>
                        <option value="PLACE_NAME">가게명</option>
                    </select>

                    {/* 검색창 */}
                    <div className="relative flex-grow">
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchVal}
                            onChange={(e) => {
                                setSearchVal(e.target.value);
                                fetchUserIdSuggestions(e.target.value);
                            }}
                            onFocus={() => setShowRecentSearches(true)}
                            className="p-2 border rounded w-full"
                            placeholder="검색어 입력"
                        />

                        {/* 최근 검색어 목록 */}
                        {showRecentSearches && <RecentPlaceSearchLists recentSearches={recentSearches} onSearchSelect={handleSelectSearch} fetchRecentSearches={fetchRecentSearches} />}

                        {/* 자동완성 목록 */}
                        {showAutoComplete && (
                            <ul className="absolute left-0 w-full bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto shadow-lg p-2 rounded-md">
                                {suggestedUserIds.map((completedId, index) => (
                                    <li key={index} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleSelectSearch(completedId)}>
                                        {completedId}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* 검색 버튼 */}
                    <Link
                        href={`${basePath}?searchType=${searchType}&searchVal=${searchVal}`}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                        onClick={handleSearch}
                    >
                        검색
                    </Link>
                </div>
            </div>
        </>
    );
}