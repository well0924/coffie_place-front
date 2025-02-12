'use client'

import { useState } from "react";

interface UserGenderProps {
    initialGender?: string; // 초기 성별 값, 선택적 prop
    onChange?: (selectedGender: string) => void; // 성별 변경 시 호출되는 콜백 함수, 선택적 prop
}

export default function UserGender({ initialGender = '', onChange }: UserGenderProps) {
    const [gender, setGender] = useState(initialGender);

    const handleGenderChange = (selectedGender: string) => {
        setGender(selectedGender);
        if (onChange) {
            onChange(selectedGender); // 성별이 변경될 때 부모 컴포넌트에 알림
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium text-gray-700">성별</label>
            <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-4">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600"
                        name="userGender"
                        value="남성"
                        checked={gender === '남성'}
                        onChange={() => handleGenderChange('남성')}
                    />
                    <span className="ml-2 text-sm sm:text-base">남성</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600"
                        name="userGender"
                        value="여성"
                        checked={gender === '여성'}
                        onChange={() => handleGenderChange('여성')}
                    />
                    <span className="ml-2 text-sm sm:text-base">여성</span>
                </label>
            </div>
        </div>
    );
}