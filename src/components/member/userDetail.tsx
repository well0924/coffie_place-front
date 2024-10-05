"use client"

import { memberRequest, Role } from "@/interface/member";
import { memberDelete, memberUpdate } from "@/utile/api/member/memberApi";
import { useState } from "react";
import AddressSearch from "../common/AddressSearch";

interface MemberDetailProps {
    id: number;
    userId: string;
    password: string;
    userEmail: string;
    memberName: string;
    userAge: string;
    userGender: string;
    userPhone: string;
    memberLat: number;
    memberLng: number;
    userAddr1: string;
    userAddr2: string;
    role: Role; 
}

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
    const [userRole,setRole] = useState(role);
    const [message, setMessage] = useState('');//출력 메시지

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
            password: "", // 비밀번호는 비워두거나 필요시 추가
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
        <div className="container mx-auto mt-24">
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-lg rounded-lg">
                        <div className="bg-gray-800 text-white text-center py-3 rounded-t-lg">
                            회원수정
                        </div>
                        <div className="p-6">
                            <form>
                                <input type="hidden" name="id" defaultValue={id}></input>
                                <div className="mb-4">
                                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">아이디</label>
                                    <input
                                        type="text"
                                        id="user_id"
                                        name="userId"
                                        defaultValue={userId}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">이메일</label>
                                    <input
                                        type="text"
                                        id="user_email"
                                        name="userEmail"
                                        defaultValue={userEmail}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">이름</label>
                                    <input
                                        type="text"
                                        id="user_name"
                                        name="memberName"
                                        defaultValue={memberName}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="user_age" className="block text-sm font-medium text-gray-700">나이</label>
                                    <input
                                        type="text"
                                        id="user_age"
                                        name="userAge"
                                        defaultValue={userAge}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">성별</label>
                                    <div className="mt-2 flex items-center">
                                        <label className="mr-4">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                name="userGender"
                                                value="남성"
                                                checked={gender === '남성'}
                                                onChange={handleGenderChange}
                                            />
                                            남성
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                name="userGender"
                                                value="여성"
                                                checked={gender === '여성'}
                                                onChange={handleGenderChange}
                                            />
                                            여성
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="user_phone" className="block text-sm font-medium text-gray-700">전화번호</label>
                                    <input
                                        type="text"
                                        id="user_phone"
                                        name="userPhone"
                                        defaultValue={userPhone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <AddressSearch
                                        onComplete={handleAddressComplete}
                                        address={address}
                                        addressType={""}
                                        bname={""}
                                        buildingName={""} />
                                </div>

                                <div className="text-right mt-6">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2"
                                        onClick={()=>updateMember(id)} >
                                        정보수정
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-red-600 text-white rounded-md mr-2"
                                        onClick={() => deleteMember(id)}>
                                        정보삭제
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                        onClick={() => cancelButton()}                                    >
                                        취소
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}