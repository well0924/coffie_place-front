"use client"
import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import KakaoMap from "./kakaoMap";

export interface AddressSearchProps {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    onComplete?: (address: string, coordinates: { lat: number; lng: number }, buildingName: string,  detailedAddress: string) => void;
}

export default function AddressSearch({ onComplete }: AddressSearchProps) {
    const [showPostcode, setShowPostcode] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<string>(""); // 선택된 주소 관리
    const [detailedAddress, setDetailedAddress] = useState<string>(""); // 상세 주소 관리
    const [buildingName, setBuildingName] = useState<string>(""); // 가게 이름 관리
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null); // 위경도 값 상태

    const handleComplete = (data: AddressSearchProps) => {
        console.log('검색완료::'+data);
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
            onComplete(selectedAddress,coordinates,buildingName,detailedAddress!);//부모 컴포넌트에 값을 전달
        }
    }, [selectedAddress, buildingName, coordinates,detailedAddress,onComplete]);

    return (
        <div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">주소</label>
                <div className="flex items-center">
                    <input
                        id="signUpUserPostNo"
                        className="form-input mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="도로명 주소"
                        type="text"
                        readOnly
                        value={selectedAddress}
                    />
                    <button
                        onClick={() => setShowPostcode(true)}
                        className="ml-3 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-600"
                    >
                        주소 찾기
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <input
                    className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="상세 주소"
                    name="userAddr2"
                    id="signUpUserAddress"
                    type="text"
                    value={detailedAddress}
                    onChange={handleDetailedAddressChange}
                />
            </div>

            {/* 지도는 상세주소 아래에 위치 */}
            {selectedAddress && (
                <div className="mb-4">
                    <KakaoMap address={selectedAddress} houseName={buildingName} onLocationChange={handleMapLocation} />
                </div>
            )}

            {showPostcode && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "30px",
                            borderRadius: "8px",
                            width: "600px", // 모달 너비를 조금 더 넓게 조정
                            maxWidth: "90%",
                            position: "relative",
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <button
                            onClick={() => setShowPostcode(false)}
                            style={{
                                position: "absolute",
                                top: "10px", // 이 위치를 조정해 닫기 버튼을 더 위로 이동
                                right: "5px",
                                cursor: "pointer",
                                backgroundColor: "transparent",
                                color: "#ff5e5e",
                                border: "none",
                                fontSize: "16px",
                                fontWeight: "bold",
                                boxShadow: "none",
                            }}
                        >
                            닫기
                        </button>
                        <DaumPostcode onComplete={handleComplete} />
                    </div>
                </div>
            )}
        </div>
    );
}