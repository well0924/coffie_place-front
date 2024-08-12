import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "회원아이디 비밀번호 찾기 페이지",
    description: "회원가입 페이지",
};


export default function findTempIdAndPassword() {
    return <>
        <div className="container mx-auto mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Find ID Card */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="text-lg font-semibold mb-4">회원 아이디 찾기</div>
                    <h3 className="text-xl font-medium mb-4">아이디 찾기</h3>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="user_name" className="block text-sm font-medium mb-1">이름</label>
                            <input
                                type="text"
                                id="user_name"
                                name="userName"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="user_email" className="block text-sm font-medium mb-1">이메일</label>
                            <input
                                type="text"
                                id="user_email"
                                name="userEmail"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="text-right mb-4">
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                아이디 찾기
                            </button>
                        </div>
                        <div>
                            <div id="msg" className="text-red-500"></div>
                        </div>
                    </form>
                </div>

                {/* Change Password Card */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="text-lg font-semibold mb-4">회원 비밀번호 찾기</div>
                    <h3 className="text-xl font-medium mb-4">비밀번호 찾기</h3>
                    <form id="finaPw">
                        <div className="mb-4">
                            <label htmlFor="user_id" className="block text-sm font-medium mb-1">아이디</label>
                            <input
                                type="text"
                                id="user_id"
                                name="userId"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="find_email" className="block text-sm font-medium mb-1">이메일</label>
                            <input
                                type="text"
                                id="find_email"
                                name="userEmail"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="text-right">
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                비밀번호 변경
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>;
}