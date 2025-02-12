"use client"
import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import KakaoMap from "./kakaoMap";

export interface AddressSearchProps {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    onComplete?: (address: string, coordinates: { lat: number; lng: number }, buildingName: string, detailedAddress: string) => void;
}

export default function AddressSearch({ onComplete }: AddressSearchProps) {
    const [showPostcode, setShowPostcode] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<string>(""); // 선택된 주소 관리
    const [detailedAddress, setDetailedAddress] = useState<string>(""); // 상세 주소 관리
    const [buildingName, setBuildingName] = useState<string>(""); // 가게 이름 관리
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null); // 위경도 값 상태

    const handleComplete = (data: AddressSearchProps) => {
        console.log('검색완료::' + data);
        let fullAddress: string = data.address;
        let extraAddress: string = "";


        if (data.addressType === "R") {
            if (data.bname) {
                extraAddress += data.bname;
            }
            if (data.buildingName) {
                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setSelectedAddress(fullAddress);
        setShowPostcode(false);
        setBuildingName(data.buildingName);
    };

    //카카오맵에서 위경도를 가져오는 로직
    const handleMapLocation = (lat: number, lng: number) => {
        const newCoordinates = { lat, lng };
        setCoordinates(newCoordinates);
        console.log(newCoordinates);
    };

    //상세주소 값
    const handleDetailedAddressChange = (e: any) => {
        setDetailedAddress(e.target.value);
    };

    // 지도 및 집 이름 출력 로직
    useEffect(() => {
        if (selectedAddress && buildingName) {
            console.log(`주소: ${selectedAddress}, 집 이름: ${buildingName},위경도: ${JSON.stringify(coordinates)}`);
        }
        if (onComplete && coordinates) {
            console.log("onComplete 호출됨");
            console.log(selectedAddress);
            console.log(buildingName);
            console.log(coordinates);
            console.log(detailedAddress);
            onComplete(selectedAddress, coordinates, buildingName, detailedAddress!);//부모 컴포넌트에 값을 전달
        }
    }, [selectedAddress, buildingName, coordinates, detailedAddress, onComplete]);

    return (
        <>
            <div className="w-full max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">주소</label>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                        <input
                            id="signUpUserPostNo"
                            className="form-input w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                            placeholder="도로명 주소"
                            type="text"
                            readOnly
                            value={selectedAddress}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPostcode(true)}
                            className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm sm:text-base"
                        >
                            주소 찾기
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <input
                        className="form-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                        placeholder="상세 주소"
                        name="userAddr2"
                        id="signUpUserAddress"
                        type="text"
                        value={detailedAddress}
                        onChange={handleDetailedAddressChange}
                    />
                </div>

                {/* 지도 */}
                {selectedAddress && (
                    <div className="mb-4 flex justify-center">
                        <KakaoMap
                            address={selectedAddress}
                            houseName={buildingName}
                            onLocationChange={handleMapLocation}
                            width="100%"
                            height="240px"
                        />
                    </div>
                )}

                {/* 주소 검색 모달 */}
                {showPostcode && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg w-11/12 md:w-[600px] max-w-lg shadow-lg relative">
                            <button
                                onClick={() => setShowPostcode(false)}
                                className="absolute top-2 right-3 text-red-500 text-lg font-bold hover:text-red-700"
                            >
                                ✕
                            </button>
                            <DaumPostcode onComplete={handleComplete} />
                        </div>
                    </div>
                )}
            </div>
        </>);
}