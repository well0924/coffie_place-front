import { CommonResponse, SearchParams, SearchType, Slice } from "@/interface/common";
import { placeList, placeListSearch, recentSearchDelete, recentSearchList, recentSearchLogDeleteAll } from "@/utile/api/place/placeApi";
import { Metadata } from "next";
import Link from 'next/link';
import SearchForm from "@/components/common/searchForm";
import { PlaceList } from "@/components/place/placeList";

export const metaData: Metadata = {
    title: "가게 목록",
    description: "가게 목록 페이지"
}

//가게 목록
export default async function PlaceListPage({ searchParams }: { searchParams: SearchParams }) {
    //검색 타입
    const searchType = searchParams.searchType || SearchType.ALL;
    //검색어
    const searchVal = searchParams.searchVal || '';
    //최근 검색어 목록
    const recentSearches = await recentSearchList();
    console.log(recentSearches);

    try {
        
        return <>
            <div className="container mx-auto mt-24">
                <div className="card shadow-lg">
                    <div className="card-body">
                        <h4 className="text-center text-2xl font-semibold mb-6">카페 검색</h4>
                        <div className="relative mb-6">
                            {/**검색어 부분**/}
                            <SearchForm basePath="/place" initialSearchType={searchType} initialSearchVal={searchVal}></SearchForm>
                            {/**최근 검색어 목록 부분 **/}
                            <div id="recent_searches" className={0 ? "block" : "hidden mt-2"}>
                                <div id="recent_search_items" className="flex justify-between items-center border-b border-gray-300 p-2">
                                    {/* {recentSearches.map((item, index) => (
                                    <div
                                        key={index}
                                        className="recent-search-item flex justify-between items-center p-2 border-b border-gray-300"
                                    >
                                        <span>{item}</span>
                                        <span
                                            className="delete-btn text-red-500 cursor-pointer"
                                            onClick={() =>
                                                setRecentSearches(
                                                    recentSearches.filter((_, i) => i !== index)
                                                )
                                            }
                                        >
                                            X
                                        </span>
                                    </div>
                                ))} */}
                                </div>
                                <button className="btn btn-danger bg-red-500 text-white p-2 rounded mt-2">
                                    전체 삭제
                                </button>
                            </div>
                        </div>
                        {/**가게 정렬 버튼**/}
                        <div className="flex justify-end space-x-2 mt-2 mr-2">
                            <Link
                                href={`/api/place?sort=rating,DESC`}
                                className="btn btn-sm bg-gray-200 text-black p-2 rounded hover:bg-gray-300"
                            >
                                평점순
                            </Link>
                            <Link
                                href={`/api/place?sort=placeName,DESC`}
                                className="btn btn-sm bg-gray-200 text-black p-2 rounded hover:bg-gray-300"
                            >
                                가게명순
                            </Link>
                        </div>

                        <div className="flex space-x-4 mb-4">
                            <Link
                                href={"#"}
                                className="btn btn-primary bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                                가게목록출력
                            </Link>
                            <button
                                className="btn btn-primary bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                                가게 등록
                            </button>
                        </div>
                        {/**가게 목록**/}
                        <PlaceList searchParams={searchParams} ></PlaceList>
                    </div>
                </div>
            </div>
        </>
    } catch (error) {
        return <>
            <>
                가게 목록을 불러올수 없습니다.
            </>
        </>
    }

}