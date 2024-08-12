import MemberIdCheck from "@/components/member/userIdCheck";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "회원가입 페이지",
    description: "회원가입 페이지",
};

// 데이터베이스에서 중복 확인을 위한 API 호출 함수

//회원 아이디 중복
export async function checkIdExists(id: string) {
    const response = await fetch(`/api/member/id-check/${id}`);
    const result = await response.json();
    return result.data;
}
//회원 이메일 중복
export async function checkEmailExists(email: string) {
    const response = await fetch(`/api/member/email-check/${email}`);
    const result = await response.json();
    return result.data;
}


export default function memberJoinPage() {


    return <>
        <div className="flex-grow">
            <div className="container mx-auto mt-2">
                <div className="flex justify-center">
                    <div className="w-full max-w-md ">
                        <div className="card shadow-lg rounded-lg overflow-auto m-6">
                            <div className="bg-gray-800 text-white text-center py-4">
                                <h2 className="text-xl font-semibold">회원가입</h2>
                            </div>
                            <div className="p-6">
                                <form action="" method="post">
                                    {/* 아이디*/}
                                    <MemberIdCheck></MemberIdCheck>
                                    {/* 비밀번호 */}
                                    <div className="mb-4">
                                        <label htmlFor="user_pw" className="block text-sm font-medium text-gray-700">
                                            비밀번호
                                        </label>
                                        <input
                                            type="password"
                                            id="user_pw"
                                            name="password"
                                            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            autoComplete="off"
                                        />
                                        <label htmlFor="user_pw_check" className="block text-sm font-medium text-gray-700 mt-4">
                                            비밀번호 확인
                                        </label>
                                        <input
                                            type="password"
                                            id="user_pw_check"
                                            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            autoComplete="off"
                                        />
                                        <div id="pwcheck" className="text-sm text-red-600 mt-2"></div>
                                    </div>
                                    <div id="validation_check" className="text-sm text-red-600 mb-4"></div>

                                    {/* 이름 */}
                                    <div className="mb-4">
                                        <label htmlFor="member_name" className="block text-sm font-medium text-gray-700">
                                            이름
                                        </label>
                                        <input
                                            type="text"
                                            id="member_name"
                                            name="memberName"
                                            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div id="valid_memberName" className="text-sm text-red-600 mb-4"></div>

                                    {/* 나이 */}
                                    <div className="mb-4">
                                        <label htmlFor="user_age" className="block text-sm font-medium text-gray-700">
                                            나이
                                        </label>
                                        <input
                                            type="text"
                                            id="user_age"
                                            name="userAge"
                                            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div id="valid_userAge" className="text-sm text-red-600 mb-4"></div>

                                    {/* 성별 */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">성별</label>
                                        <div className="mt-2">
                                            <div className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="inlineCheckbox1"
                                                    name="userGender"
                                                    value="남성"
                                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                />
                                                <label htmlFor="inlineCheckbox1" className="ml-2 block text-sm leading-5 text-gray-700">
                                                    남성
                                                </label>
                                            </div>
                                            <div className="inline-flex items-center ml-6">
                                                <input
                                                    type="checkbox"
                                                    id="inlineCheckbox2"
                                                    name="userGender"
                                                    value="여성"
                                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                />
                                                <label htmlFor="inlineCheckbox2" className="ml-2 block text-sm leading-5 text-gray-700">
                                                    여성
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="valid_userGender" className="text-sm text-red-600 mb-4"></div>

                                    {/* 이메일 */}
                                    <div className="mb-4">
                                        <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">
                                            이메일
                                        </label>
                                        <div className="flex items-center">
                                            <input
                                                type="text"
                                                id="user_email"
                                                name="userEmail"
                                                className="form-input mt-1 block flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                style={{ maxWidth: 'calc(100% - 120px)' }} // 입력창의 최대 너비 조정
                                            />
                                            <button
                                                type="button"
                                                className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                style={{ width: '120px' }} // 버튼의 너비 조정
                                            >
                                                중복확인
                                            </button>
                                        </div>
                                        <div id="emailExists" className="text-sm text-red-600 mt-2"></div>
                                    </div>
                                    <div id="valid_userEmail" className="text-sm text-red-600 mb-4"></div>
                                    {/* 전화번호 */}
                                    <div className="mb-4">
                                        <label htmlFor="user_phone" className="block text-sm font-medium text-gray-700">
                                            전화번호
                                        </label>
                                        <input
                                            type="text"
                                            id="user_phone"
                                            name="userPhone"
                                            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div id="valid_userPhone" className="text-sm text-red-600 mb-4"></div>

                                    {/* 주소 */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">주소</label>
                                        <div className="flex items-center">
                                            <input
                                                className="form-input mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="도로명 주소"
                                                name="userAddr1"
                                                id="signUpUserPostNo"
                                                type="text"
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                className="ml-3 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                            >
                                                <i className="fa fa-search"></i> 주소찾기
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <input
                                            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="상세 주소"
                                            name="userAddr2"
                                            id="signUpUserAddress"
                                            type="text"
                                        />
                                    </div>
                                    <div id="valid_userAddr1" className="text-sm text-red-600 mb-4"></div>

                                    <div id="map" className="w-72 h-72 mt-4 hidden">
                                        <div id="centerAddr"></div>
                                    </div>

                                    {/* 회원가입 버튼 */}
                                    <div className="mt-6 text-right">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            회원가입
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}