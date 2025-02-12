"use client"

import { MemberDetailProps, memberRequest, Role } from "@/interface/member";
import { memberDelete, memberUpdate } from "@/utile/api/member/memberApi";
import { useState } from "react";
import AddressSearch from "../common/AddressSearch";

export default function MemberModifyPage({
    id,
    userId,
    userEmail,
    memberName,
    userAge,
    userGender,
    userPhone,
    memberLat,
    memberLng,
    userAddr1,
    userAddr2,
    role
}: MemberDetailProps) {

    const [username, setUserName] = useState(userId);//회원 아이디
    const [email, setEmail] = useState(userEmail);//회원 이메일
    const [name, setName] = useState(memberName);//회원이름
    const [age, setAge] = useState(userAge);//회원 나이
    const [gender, setGender] = useState(userGender);//회원 성별
    const [phone, setPhone] = useState(userPhone);//전화번호
    const [address, setAddress] = useState(userAddr1);//주소(다음 주소)
    const [detailedAddress, setDetailedAddress] = useState<string>(userAddr2);//상세주소
    const [lat, setLat] = useState<number>(0.0); // 위도
    const [lng, setLng] = useState<number>(0.0); // 경도
    const [userRole, setRole] = useState(role);

    //회원성별 
    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;

        if (checked) {
            // 체크박스가 체크되면 해당 성별로 설정
            setGender(value);
        } else {
            // 체크박스가 체크 해제되면 성별을 빈 문자열로 설정
            if (gender === value) {
                setGender('');
            }
        }
    };

    //회원 주소기능
    const handleAddressComplete = (selectedAddress: string, coordinates: { lat: number; lng: number }, detailedAddress: string) => {
        setAddress(selectedAddress);
        setLat(coordinates.lat);
        setLng(coordinates.lng);
        setDetailedAddress(detailedAddress);
        console.log("주소:", selectedAddress, "위도:", coordinates.lat, "경도:", coordinates.lng);
    };

    //회원수정
    const updateMember = async (id: number) => {
        const data: memberRequest = {
            userId: username,
            memberName: name,
            userPhone: phone,
            userGender: gender,
            userAge: age,
            userEmail: email,
            userAddr1: address,
            userAddr2: detailedAddress,
            memberLat: lat,
            memberLng: lng,
            role: userRole
        };
        try {
            await memberUpdate(id, data);
            alert('회원 정보가 수정이 되었습니다.');
            window.history.back();
        } catch (error) {
            console.log(error);
        }
    }

    //회원삭제
    const deleteMember = async (id: number) => {
        await memberDelete(id);
        alert("삭제되었습니다.");
        window.location.href = '/'
    }

    //취소 버튼
    const cancelButton = () => {
        window.history.back();
    }

    return <>
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
                <div className="bg-gray-800 text-white text-center py-3 rounded-t-lg">
                    <h2 className="text-xl font-semibold">회원정보 수정</h2>
                </div>
                <div className="p-4 sm:p-6">
                    <form>
                        <input type="hidden" name="id" defaultValue={id} />

                        {/* 아이디 */}
                        <div className="mb-4">
                            <label htmlFor="user_id" className="block text-sm sm:text-base font-medium text-gray-700">아이디</label>
                            <input
                                type="text"
                                id="user_id"
                                name="userId"
                                defaultValue={userId}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base"
                            />
                        </div>

                        {/* 이메일 */}
                        <div className="mb-4">
                            <label htmlFor="user_email" className="block text-sm sm:text-base font-medium text-gray-700">이메일</label>
                            <input
                                type="text"
                                id="user_email"
                                name="userEmail"
                                defaultValue={userEmail}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base"
                            />
                        </div>

                        {/* 이름 */}
                        <div className="mb-4">
                            <label htmlFor="user_name" className="block text-sm sm:text-base font-medium text-gray-700">이름</label>
                            <input
                                type="text"
                                id="user_name"
                                name="memberName"
                                defaultValue={memberName}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base"
                            />
                        </div>

                        {/* 나이 */}
                        <div className="mb-4">
                            <label htmlFor="user_age" className="block text-sm sm:text-base font-medium text-gray-700">나이</label>
                            <input
                                type="text"
                                id="user_age"
                                name="userAge"
                                defaultValue={userAge}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base"
                            />
                        </div>

                        {/* 성별 */}
                        <div className="mb-4">
                            <label className="block text-sm sm:text-base font-medium text-gray-700">성별</label>
                            <div className="flex flex-col sm:flex-row mt-2">
                                <label className="inline-flex items-center mr-4">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        name="userGender"
                                        value="남성"
                                        checked={gender === "남성"}
                                        onChange={handleGenderChange}
                                    />
                                    남성
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        name="userGender"
                                        value="여성"
                                        checked={gender === "여성"}
                                        onChange={handleGenderChange}
                                    />
                                    여성
                                </label>
                            </div>
                        </div>

                        {/* 전화번호 */}
                        <div className="mb-4">
                            <label htmlFor="user_phone" className="block text-sm sm:text-base font-medium text-gray-700">전화번호</label>
                            <input
                                type="text"
                                id="user_phone"
                                name="userPhone"
                                defaultValue={userPhone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base"
                            />
                        </div>

                        {/* 주소 검색 */}
                        <div className="mb-4">
                            <AddressSearch onComplete={handleAddressComplete} address={address} addressType={""} bname={""} buildingName={""} />
                        </div>

                        {/* 버튼 그룹 */}
                        <div className="mt-6 flex flex-col sm:flex-row justify-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                            <button
                                type="button"
                                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={() => updateMember(id)}
                            >
                                정보수정
                            </button>
                            <button
                                type="button"
                                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                onClick={() => deleteMember(id)}
                            >
                                정보삭제
                            </button>
                            <button
                                type="button"
                                className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                onClick={() => cancelButton()}
                            >
                                취소
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>

}