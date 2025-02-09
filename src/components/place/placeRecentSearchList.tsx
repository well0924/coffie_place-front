"use client"

import { recentSearchDelete, recentSearchList, recentSearchLogDeleteAll } from "@/utile/api/place/placeApi";
import { useEffect, useState } from "react";

interface RecentSearchListProps {
    recentSearches: string[];
    onSearchSelect: (query: string) => void;
    fetchRecentSearches: () => void;
}

export default function RecentPlaceSearchLists({ recentSearches, onSearchSelect, fetchRecentSearches }: RecentSearchListProps) {

    const [loading, setLoading] = useState(false);

    // 개별 검색어 삭제
    const handleDeleteSearch = async (query: string) => {
        setLoading(true);
        try {
            await recentSearchDelete(query);
            fetchRecentSearches(); // 목록 갱신
        } catch (error) {
            console.error("검색어 삭제 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    // 전체 검색어 삭제
    const handleDeleteAllSearch = async () => {
        if (confirm("최근 검색어를 모두 삭제하시겠습니까?")) {
            setLoading(true);
            try {
                await recentSearchLogDeleteAll();
                fetchRecentSearches(); // 목록 갱신
            } catch (error) {
                console.error("검색어 전체 삭제 실패:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    return <>
       <div className="relative w-full">
            {recentSearches.length > 0 ? (
                <div className="absolute left-0 w-full bg-white border border-gray-300 mt-1 shadow-lg rounded-md z-50">
                    <h3 className="text-gray-600 px-3 py-2 border-b">최근 검색어</h3>
                    <div className="flex flex-wrap gap-2 p-3">
                        {recentSearches.map((search, index) => (
                            <div key={index} className="flex items-center justify-between w-full px-3 py-1 hover:bg-gray-100 cursor-pointer">
                                <button onClick={() => onSearchSelect(search)} className="text-gray-700">{search}</button>
                                <button onClick={() => handleDeleteSearch(search)} className="text-red-500 hover:text-red-700 ml-2">X</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleDeleteAllSearch} className="w-full text-sm text-red-500 hover:underline py-2">
                        전체 삭제
                    </button>
                </div>
            ) : (
                <p className="absolute left-0 w-full bg-white border border-gray-300 mt-1 p-2 text-gray-500 text-center rounded-md shadow-lg z-50">
                    최근 검색어가 없습니다.
                </p>
            )}
        </div>
    </>
}