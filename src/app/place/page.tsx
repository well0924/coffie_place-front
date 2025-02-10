import { Metadata } from "next";
import Link from 'next/link';
import SearchForm from "@/components/common/searchForm";
import { PlaceList } from "@/components/place/placeList";
import { SearchParams, SearchType } from "@/interface/common";
import { getServerUser } from "@/utile/api/member/serverUser";


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
    
    const user = await getServerUser();

    try {
        
        return <>
            <div className="container mx-auto mt-24">
                <div className="card shadow-lg">
                    <div className="card-body">
                        <h4 className="text-center text-2xl font-semibold mb-6">카페 검색</h4>
                        <div className="relative mb-6">
                            {/**검색어 부분**/}
                            <SearchForm basePath="/place" initialSearchType={searchType} initialSearchVal={searchVal}></SearchForm>
                        </div>
                        {/**가게 정렬 버튼**/}
                        <div className="flex justify-end space-x-2 mt-2 mr-2">
                            <Link
                                href={`/place?sort=rating,DESC`}
                                className="btn btn-sm bg-gray-200 text-black p-2 rounded hover:bg-gray-300"
                            >
                                평점순
                            </Link>
                            <Link
                                href={`/place?sort=placeName,ASC`}
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
                        <PlaceList searchParams={searchParams} userId={user?.userId || ""}></PlaceList>
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