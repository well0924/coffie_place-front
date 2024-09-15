import { handleError } from "@/interface/common";
import { memberDetail } from "@/utile/api/member/memberApi";
import { Metadata } from "next";
import MemberModify from "@/components/member/userDetail";
import MemberModifyPage from "@/components/member/userDetail";

export const metaData: Metadata = {
    title: "회원 상세 조회",
    description: "회원 상세 조회"
}

export default async function memberDetailPage({ params,
}: {
    params: { id: string };
}) {
    const id = params.id;

    console.log("번호:::" + id);

    //api 사용 
    try {
        //회원 조회
        const response = await memberDetail(Number(id));
        //주소 api 사용
        return (<MemberModifyPage 
            id ={response.id}
            userId={response.userId}
            password={response.password}
            userEmail={response.userEmail}
            memberName={response.memberName}
            userAge={response.userAge}
            userGender={response.userGender}
            userPhone={response.userPhone}
            userAddr1={response.userAddr1}
            userAddr2={response.userAddr2}
        />);
    } catch (error) {
        console.log(error);
        return <>
            <div className="container mx-auto mt-24">
                <div className="flex flex-col">
                    <div className="w-full">
                        <h1 className="text-3xl font-bold mb-6">오류 발생</h1>
                        <p>문제가 발생했습니다. 나중에 다시 시도해주세요.</p>
                    </div>
                </div>
            </div>
        </>
    }
}