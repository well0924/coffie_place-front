import { logoutProc } from '@/utile/api/login/loginApi';
import { useAuth } from '@/utile/context/AuthContext';
import Link from 'next/link';

export default function headerPage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user, logout } = useAuth();
  
  console.log(user);

  const handleLogout = async () => {
    await logoutProc(); // 로그아웃 API 호출
    logout(); // AuthContext의 logout 호출
    // 추가적으로 리다이렉트하거나 상태를 업데이트할 수 있음
    location.href = '/'; // 메인 페이지로 리다이렉트
  };

  return <nav className="bg-gray-800 text-white fixed top-0 inset-x-0 shadow-lg z-50">
  <div className="container mx-auto px-4 py-2 flex items-center justify-between">
    {/* 로고 */}
    <Link href="/" className="text-xl sm:text-2xl font-semibold">
      Coffies
    </Link>

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

    {/* 로그인/마이페이지 메뉴 */}
    <div className="hidden lg:flex space-x-4 ml-auto">
      {user ? (
        <>
          <span className="hover:bg-gray-700 px-3 py-2 rounded">안녕하세요, {user.userId}님</span>
          {user.role === 'ROLE_ADMIN' ? (
            <>
              <Link href="/admin" className="hover:bg-gray-700 px-3 py-2 rounded">어드민 페이지</Link>
              <Link href="/mypage" className="hover:bg-gray-700 px-3 py-2 rounded">마이페이지</Link>
            </>
          ) : (
            <Link href="/mypage" className="hover:bg-gray-700 px-3 py-2 rounded">마이페이지</Link>
          )}
          <button onClick={handleLogout} className="hover:bg-gray-700 px-3 py-2 rounded">로그아웃</button>
        </>
      ) : (
        <>
          <Link href="/member/join" className="hover:bg-gray-700 px-3 py-2 rounded">회원가입</Link>
          <Link href="/login" className="hover:bg-gray-700 px-3 py-2 rounded">로그인</Link>
        </>
      )}
    </div>
  </div>
</nav>
}