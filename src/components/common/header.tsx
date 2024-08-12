import Link from 'next/link';

export default function headerPage() {

  return <>
    <nav className="bg-gray-800 text-white fixed top-0 inset-x-0 shadow-lg z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between  h-full">
        <Link href="/" className="text-2xl font-semibold">
          Coffies
        </Link>
        <button className="lg:hidden px-2 py-1 text-white focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="inline-block w-6 h-0.5 bg-white my-1"></span>
          <span className="inline-block w-6 h-0.5 bg-white my-1"></span>
          <span className="inline-block w-6 h-0.5 bg-white my-1"></span>
        </button>
        <div className="hidden lg:flex space-x-4">
          <Link href="/place" className="hover:bg-gray-700 px-3 py-2 rounded">
            카페검색
          </Link>
          <Link href="/board" className="hover:bg-gray-700 px-3 py-2 rounded">
            자유게시판
          </Link>
          <Link href="/notice" className="hover:bg-gray-700 px-3 py-2 rounded">
            공지게시판
          </Link>
        </div>
        <div className="hidden lg:flex space-x-4 ml-auto">
          <Link href="/member/join" className="hover:bg-gray-700 px-3 py-2 rounded">
            회원가입
          </Link>
          <Link href="/login" className="hover:bg-gray-700 px-3 py-2 rounded">
            로그인
          </Link>
          <Link href="/page/notice/list" className="hover:bg-gray-700 px-3 py-2 rounded">
            로그아웃
          </Link>
        </div>
      </div>
    </nav>
  </>
}