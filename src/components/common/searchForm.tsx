"use client"

import { SearchType } from "@/interface/common";
import { useRouter } from "next/router";
import { useState } from "react";
import {SearchFormProps} from "@/interface/common"
import Link from "next/link";

export default function SearchForm({initialSearchType,initialSearchVal} : SearchFormProps) {
    const [searchType, setSearchType] = useState<SearchType>(initialSearchType);
    const [searchVal, setSearchVal] = useState<string>(initialSearchVal);
    
    return (<>
            <div className="flex flex-col md:flex-row mb-6">
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
                <option value={SearchType.PLACE_NAME}>장소 이름</option>
                <option value={SearchType.PLACE_ADDRESS}>장소 주소</option>
            </select>
            <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="mb-2 md:mb-0 md:mr-2 p-2 border rounded"
                placeholder="검색어 입력"
            />
             <Link 
                href={`/notice?page=0&searchType=${searchType}&searchVal=${searchVal}`}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
                검색
            </Link>
        </div>
    </>);
}