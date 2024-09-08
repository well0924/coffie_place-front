"use client"
import DaumPostcode from "react-daum-postcode";
import { useEffect, useRef, useState } from "react";
import MemberEmailCheck from "./userEmailCheck";
import MemberIdCheck from "./userIdCheck";
import { memberRequest, Role } from "@/interface/member";
import { memberCreate } from "@/utile/api/member/memberApi";
import AddressSearch from "../common/AddressSearch";



export default function MemberSignForm() {

    const [isIdValid, setIsIdValid] = useState<boolean | null>(null); // 아이디 유효성 상태
    const [username, setUsername] = useState('');//회원 아이디
    const [email, setEmail] = useState('');//회원 이메일
    const [password, setPassword] = useState('');//비밀번호
    const [passwordConfirm, setPasswordConfirm] = useState('');//비밀번호 확인
    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null); // 비밀번호 일치 여부 상태
    const [name, setName] = useState('');//회원이름
    const [age, setAge] = useState('');//회원 나이
    const [gender, setGender] = useState<string[]>([]); // 성별 상태 (여러 값 저장)
    const [phone, setPhone] = useState('');//전화번호
    const [address, setAddress] = useState('');//주소(다음 주소)
    const [detailedAddress, setDetailedAddress] = useState<string>('');//상세주소
    const [lat, setLat] = useState<number>(0.0); // 위도
    const [lng, setLng] = useState<number>(0.0); // 경도
    const [message, setMessage] = useState('');//출력 메시지
    const [formData, setFormData] = useState<memberRequest>({ //회원에 관련된 dto
        useId: '',
        password: '',
        memberName: '',
        userPhone: '',
        userGender: '',
        userAge: '',
        userEmail: '',
        userAddr1: '',
        userAddr2: '',
        memberLat: 0.0,
        memberLng: 0.0,
        role: Role.ROLE_USER,
    });

    //아이디 중복 체크
    const handleDuplicatedCheck = (isIdValid: boolean | null, userId: string) => {
        setIsIdValid(isIdValid);
        setUsername(userId);
    };

    //이메일 중복 체크
    const handleDuplicatedEmailCheck = (isIdValid: boolean | null, email: string) => {
        setIsIdValid(isIdValid);
        setEmail(email);
    }

    //성별 체크 박스
    const handleGenderChange = (e: any) => {
        const { value } = e.target;
        setGender(value);
    };

    // 주소 및 위경도 업데이트
    const handleAddressComplete = (selectedAddress: string, coordinates: { lat: number; lng: number }, detailedAddress: string) => {
        setAddress(selectedAddress);
        setLat(coordinates.lat);
        setLng(coordinates.lng);
        setDetailedAddress(detailedAddress);
        console.log("주소:", selectedAddress, "위도:", coordinates.lat, "경도:", coordinates.lng);
    };

    //회원 가입
    const handleSubmit = async (e: any) => {
        console.log("들어왔음??");
        // 값이 올바르게 설정되었는지 로그 확인
        console.log('Address:', address);
        console.log('detailAddress:', detailedAddress);
        console.log('Lat:', lat, 'Lng:', lng);

        e.preventDefault();

        // 비밀번호 일치 여부 체크
        if (password !== passwordConfirm) {
            setIsPasswordMatch(false);
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        } else {
            setIsPasswordMatch(true);
            setMessage('');
        }

        if (name.trim() === '') {
            setMessage('이름을 입력하지 않았습니다.');
            setMessage(''); // 입력하지 않았을 때는 다른 메시지 지우기
            console.log('???');
            return;
        }
        if (age.trim() === '') {
            setMessage('나이를 입력하지 않았습니다.');
            setMessage(''); // 입력하지 않았을 때는 다른 메시지 지우기
            console.log('???');
            return;
        }
        if (phone.trim() === '') {
            setMessage('전화번호를 입력하지 않았습니다.');
            setMessage(''); // 입력하지 않았을 때는 다른 메시지 지우기
            console.log('???');
            return;
        }
        if (email.trim() === '') {
            setMessage('이메일을 입력하지 않았습니다.');
            setMessage('');
            console.log('???');
            return;
        }
        if (address.trim() === '') {
            setMessage('주소를 입력하지 않았습니다.');
            setMessage(''); // 입력하지 않았을 때는 다른 메시지 지우기
            console.log('???');
            return;
        }
        console.log('여기까지??');
        // gender가 배열인지 확인
        console.log("gender 값 확인:", gender);

        // gender가 배열이 아닌 경우 처리
        const genderValue = Array.isArray(gender) ? gender.join(", ") : gender;

        const updatedFormData = {
            ...formData,
            userId: username,
            password: password,
            memberName: name,
            userPhone: phone,
            userGender: genderValue,
            userAge: age,
            userEmail: email,
            userAddr1: address,
            userAddr2: detailedAddress,
            memberLat: lat,
            memberLng: lng,
        };

        try {
            const result = await memberCreate(updatedFormData);
            console.log(result);
            if (result === 201) {
                alert('회원가입에 성공합니다.');
                location.href = '/';//메인 페이지에 이동하기.
                return result;
            }
        } catch (error) {
            console.log(error);
            setMessage("회원가입에 실패했습니다.");
        }
    };

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
                                <form onSubmit={handleSubmit}>
                                    {/* 아이디 */}
                                    <MemberIdCheck onIdCheck={handleDuplicatedCheck} />
                                    {/* 비밀번호 */}
                                    <div className="mb-4">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mt-4">비밀번호 확인</label>
                                        <input
                                            type="password"
                                            id="passwordConfirm"
                                            name="passwordConfirm"
                                            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                            value={passwordConfirm}
                                            onChange={(e) => {
                                                setPasswordConfirm(e.target.value);
                                                // 비밀번호 확인 입력 시 일치 여부 체크
                                                setIsPasswordMatch(password === e.target.value);
                                            }}
                                            required
                                        />
                                    </div>

                                    {/* 비밀번호 일치 여부 메시지 */}
                                    <div id="passwordValidation" className={`text-sm mb-4 ${isPasswordMatch === false ? 'text-red-600' : isPasswordMatch === true ? 'text-blue-600' : 'text-gray-600'}`}>
                                        {isPasswordMatch === false && '비밀번호가 일치하지 않습니다.'}
                                    </div>

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
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div id="valid_memberName" className="text-sm text-red-600 mb-4">
                                        {message}
                                    </div>

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
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                    </div>
                                    <div id="valid_userAge" className="text-sm text-red-600 mb-4">
                                        {message}
                                    </div>

                                    {/* 성별 */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">성별</label>
                                        <div className="mt-2">
                                            <div className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="genderMale"
                                                    name="userGender"
                                                    value="남성"
                                                    checked={gender.includes('남성')}
                                                    onChange={handleGenderChange}
                                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                />
                                                <label htmlFor="genderMale" className="ml-2 block text-sm leading-5 text-gray-700">
                                                    남성
                                                </label>
                                            </div>
                                            <div className="inline-flex items-center ml-6">
                                                <input
                                                    type="checkbox"
                                                    id="genderFemale"
                                                    name="userGender"
                                                    value="여성"
                                                    checked={gender.includes('여성')}
                                                    onChange={handleGenderChange}
                                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                />
                                                <label htmlFor="genderFemale" className="ml-2 block text-sm leading-5 text-gray-700">
                                                    여성
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="valid_userGender" className="text-sm text-red-600 mb-4">
                                        {message}
                                    </div>

                                    {/* 이메일 */}
                                    <MemberEmailCheck onIdCheck={handleDuplicatedEmailCheck} />

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
                                            value={phone}
                                            onChange={(e) => { setPhone(e.target.value) }}
                                        />
                                    </div>
                                    <div id="valid_userPhone" className="text-sm text-red-600 mb-4">
                                        {message}
                                    </div>

                                    <div>
                                        {/* 주소 */}
                                        <div className="mb-4">
                                            <div className="flex items-center">
                                                <div className="ml-3 mt-1">
                                                    <AddressSearch
                                                        onComplete={handleAddressComplete}
                                                        address={""}
                                                        addressType={""}
                                                        bname={""}
                                                        buildingName={""}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 회원가입 버튼 */}
                                    <div className="mt-6 text-right">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            onClick={handleSubmit}
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