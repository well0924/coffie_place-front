"use client"

import { memberResponse } from "@/interface/member";
import Link from "next/link";

interface MemberTableProps {
    members: memberResponse[];
    checkedItems: string[];
    onCheckboxChange: (value: string) => void;
    onAllCheckedChange: (checked: boolean) => void;
    allChecked: boolean;
}

//어드민 페이지에서 회원 목록(체크박스 기능,목록,상세조회)
export default function memberTable({ members, checkedItems, onCheckboxChange, onAllCheckedChange, allChecked }: MemberTableProps) {

    return (<>
        <div className="overflow-x-auto">
            <table className="table-auto w-full text-center border-collapse border border-gray-300 mt-4">
                <thead>
                    <tr className="bg-gray-100 text-xs sm:text-sm md:text-base">
                        <th className="border border-gray-300 p-1 sm:p-2">
                            <input
                                id="allCheckBox"
                                type="checkbox"
                                checked={allChecked}
                                onChange={(e) => onAllCheckedChange(e.target.checked)}
                            />
                        </th>
                        <th className="border border-gray-300 p-1 sm:p-2">아이디</th>
                        <th className="border border-gray-300 p-1 sm:p-2">이름</th>
                        <th className="border border-gray-300 p-1 sm:p-2 hidden sm:table-cell">이메일</th>
                        <th className="border border-gray-300 p-1 sm:p-2">등급</th>
                        <th className="border border-gray-300 p-1 sm:p-2 hidden sm:table-cell">등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {members.length > 0 ? (
                        members.map((member) => (
                            <tr key={member.id} className="bg-white border-b hover:bg-gray-50 text-xs sm:text-sm md:text-base">
                                <td className="border border-gray-300 p-1 sm:p-2">
                                    <input
                                        type="checkbox"
                                        className="chk"
                                        name="cchk"
                                        value={member.userId}
                                        checked={checkedItems.includes(member.userId)}
                                        onChange={() => onCheckboxChange(member.userId)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-1 sm:p-2">
                                    <Link href={`/member/${member.id}`} className="text-blue-600 hover:underline">
                                        {member.userId}
                                    </Link>
                                </td>
                                <td className="border border-gray-300 p-1 sm:p-2">{member.memberName}</td>
                                <td className="border border-gray-300 p-1 sm:p-2 hidden sm:table-cell">{member.userEmail}</td>
                                <td className="border border-gray-300 p-1 sm:p-2">{member.role}</td>
                                <td className="border border-gray-300 p-1 sm:p-2 hidden sm:table-cell">
                                    {new Date(member.createdTime).toLocaleDateString()}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="border border-gray-300 p-4 text-gray-500">조회된 회원이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>
    );
}



