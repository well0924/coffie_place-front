"use client"

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    basePath: string;
}

export default function Pagination({ pageNumber, pageSize, totalPages, basePath }: PaginationProps) {
    const searchParams = useSearchParams();
    const currentParams = new URLSearchParams(searchParams.toString());

    // 현재 페이지 번호, 페이지 크기, 총 페이지 수를 기반으로 페이지네이션 계산
    const startPage = Math.floor(pageNumber / pageSize) * pageSize + 1;
    const tempEndPage = startPage + pageSize - 1;
    const endPage = tempEndPage < totalPages ? tempEndPage : totalPages;

    // 비활성화 상태인지 여부 확인
    const isFirstPage = pageNumber === 0;
    const isLastPage = pageNumber >= totalPages - 1;

    // 페이지 링크 생성
    const createPageLink = (page: number) => {
        currentParams.set('page', page.toString());
        currentParams.set('size', pageSize.toString());
        return `${basePath}?${currentParams.toString()}`;
    };

    return (<>
        <nav className="flex justify-center mt-4 overflow-x-auto">
          <ul className="flex space-x-1 sm:space-x-2">
            {/* First 버튼 */}
            <li>
              <Link 
                href={isFirstPage ? '#' : createPageLink(0)} 
                className={`px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm md:text-base font-medium rounded-l-md ${
                  isFirstPage ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                onClick={(e) => isFirstPage && e.preventDefault()} // 클릭 방지
              >
                First
              </Link>
            </li>
      
            {/* Previous 버튼 */}
            <li>
              <Link 
                href={isFirstPage ? '#' : createPageLink(pageNumber - 1)} 
                className={`px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm md:text-base font-medium ${
                  isFirstPage ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                onClick={(e) => isFirstPage && e.preventDefault()} // 클릭 방지
              >
                Previous
              </Link>
            </li>
      
            {/* 페이지 번호 버튼들 */}
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
              const page = startPage + i;
              return (
                <li key={page}>
                  <Link 
                    href={createPageLink(page - 1)} 
                    className={`px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm md:text-base font-medium ${
                      page === pageNumber + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </Link>
                </li>
              );
            })}
      
            {/* Next 버튼 */}
            <li>
              <Link 
                href={isLastPage ? '#' : createPageLink(pageNumber + 1)} 
                className={`px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm md:text-base font-medium ${
                  isLastPage ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                onClick={(e) => isLastPage && e.preventDefault()} // 클릭 방지
              >
                Next
              </Link>
            </li>
      
            {/* Last 버튼 */}
            <li>
              <Link 
                href={isLastPage ? '#' : createPageLink(totalPages - 1)} 
                className={`px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm md:text-base font-medium rounded-r-md ${
                  isLastPage ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                onClick={(e) => isLastPage && e.preventDefault()} // 클릭 방지
              >
                Last
              </Link>
            </li>
          </ul>
        </nav>
      </>      
    );
}


