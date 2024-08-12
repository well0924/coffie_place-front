import Link from "next/link";
import Slider from "react-slick";
import { Metadata } from "next";
import {getBoardList} from "../utile/api/board/boardApi"
import {getNoticeList} from "../utile/api/notice/noticeApi"
import { palceReviewTop5List} from "../utile/api/place/placeApi"
import { SearchParams } from "@/interface/common";

export const metadata: Metadata = {
  title: "메인 페이지",
  description: "메인 페이지",
};

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  //api 로딩(공지게시글,자유게시글,top5 가게)
  try {
    // URL의 쿼리 파라미터에서 page 값을 추출
    const pageNumber = parseInt(searchParams.page || '0') || 0;
    const pageSize = 5; // 페이지당 게시글 수

    const [board, top5,notice] = await Promise.all([
      getBoardList(),
      palceReviewTop5List(),
      getNoticeList(pageNumber,pageSize)
    ]);
    const noticeList = notice.data.content  || [];


    return <>
      <main className="flex min-h-screen flex-col p-6">
        <div className="row">
          {/* 가게 top5부분 */}
          <h4 className="text-xl font-semibold" id="title-top5">카페 TOP5</h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {top5.length > 0 ? (
                        top5.map((item, index) => (
                            <div className="card shadow-lg p-4" key={index}>
                                <div className="mt-4">
                                    <h5 className="text-lg font-bold">{item.placeName}</h5>
                                    <p className="text-sm text-gray-600">{item.placeAddr}</p>
                                    <div className="flex items-center mt-2">
                                        <div className="text-yellow-500">{item.reviewRate}</div>
                                        <div className="ml-2 text-gray-500 text-sm">/ 5.0</div>
                                    </div>
                                    <Link className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md" href={`/page/place/detail/${item.id}`}>
                                        More
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-4 text-center text-gray-600">
                            현재 평점이 높은 가게가 없습니다.
                        </div>
                    )}
          </div>
        </div>
        {/* 자유 게시판과 공지 게시판을 한 행으로 나누기 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* 자유 게시판 부분 */}
          <div className="shadow-lg p-4">
            <h4 className="text-xl font-semibold mb-4">자유게시판</h4>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">글번호</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성날짜</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">조회수</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {board.length > 0 ? (
                   board.map((obj, index) => (
                    <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{obj.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Link className="text-blue-600 hover:underline" href={`/page/board/detail/${obj.id}`}>
                                <>{obj.boardTitle}</>
                            </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{obj.boardTitle}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(obj.createdTime).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{obj.readCount}</td>
                    </tr>
                ))) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    조회된 게시글이 없습니다.
                  </td>
                </tr>)
              }
              </tbody>
            </table>
            <Link href="/board" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md">
              <>더보기</>
            </Link>
          </div>
  
          {/* 공지 게시판 부분 */}
          <div className="shadow-lg p-4">
            <h4 className="text-xl font-semibold mb-4">공지 게시판</h4>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성날짜</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {noticeList.length > 0 ? (
                  noticeList.map((obj,index)=>(
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {obj.isFixed === 'Y' ? obj.noticeGroup : obj.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {obj.noticeTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {obj.noticeWriter}  
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(obj.createdTime).toLocaleDateString('ko-KR')}  
                      </td>    
                    </tr>
                  ))
                  )
                  : 
                  (<tr>
                    <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      조회된 게시글이 없습니다.
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
            <Link href="/notice" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md">
              <>더보기</>
            </Link>
          </div>
        </div>
      </main>
    </>
  } catch(error) {
    console.log(error);
    return (
      <main className="flex min-h-screen flex-col p-6">
        <div className="row">
          {/* 가게 top5부분 */}
          <h4 className="text-xl font-semibold" id="title-top5">카페 TOP5</h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-4 text-center text-gray-600">
              현재 평점이 높은 가게가 없습니다.
            </div>
          </div>
        </div>
        {/* 자유 게시판과 공지 게시판을 한 행으로 나누기 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* 자유 게시판 부분 */}
          <div className="shadow-lg p-4">
            <h4 className="text-xl font-semibold mb-4">자유게시판</h4>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">글번호</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성날짜</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">조회수</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    조회된 게시글이 없습니다.
                  </td>
                </tr>
              </tbody>
            </table>
            <Link href="/board" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md">
              <>더보기</>
            </Link>
          </div>
  
          {/* 공지 게시판 부분 */}
          <div className="shadow-lg p-4">
            <h4 className="text-xl font-semibold mb-4">공지 게시판</h4>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성날짜</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">조회된 게시글이 없습니다.</td>
                </tr>
              </tbody>
            </table>
            <Link href="/notice" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md">
              <>더보기</>
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
