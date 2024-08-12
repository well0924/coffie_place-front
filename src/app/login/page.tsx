import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "로그인 페이지",
    description: "로그인 페이지",
};

export default function loginPage() {

    return <>
        <div className="container mx-auto mt-24">
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <div className="card shadow-lg rounded-lg overflow-hidden">
                        <div className="bg-gray-800 text-white text-center py-4">
                            <h2 className="text-xl font-semibold">로그인</h2>
                        </div>
                        <div className="p-6">
                            <form action="/api/member/login" method="post">
                                <div className="mb-4">
                                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                                        아이디
                                    </label>
                                    <input
                                        type="text"
                                        id="user_id"
                                        name="userId"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="user_pw" className="block text-sm font-medium text-gray-700">
                                        비밀번호
                                    </label>
                                    <input
                                        type="password"
                                        id="user_pw"
                                        name="password"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <Link href="/login/tmpid" className="text-sm text-blue-600 hover:underline">
                                    <>아이디 비밀번호 찾기</>
                                </Link>
                                <div className="mt-6 flex justify-end space-x-4">
                                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                        로그인
                                    </button>
                                    <Link href="/member/join" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                                        <>회원가입</>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}