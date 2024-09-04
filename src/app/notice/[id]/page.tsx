import DownloadButton from "@/components/common/DownloadButton";
import { noticeBoardAttachList } from "@/utile/api/attach/attachApi";
import { noticeDetail } from "@/utile/api/notice/noticeApi";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "공지 게시판 조회 페이지",
    description: "공지 게시판 조회 페이지",
};

export default async function noticeDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;

    //화면에 필요한 api 
    const notice = await noticeDetail(Number(id));
    const fileList = await noticeBoardAttachList(Number(id));
    
    try {

        console.log(notice);
        console.log(fileList);

        return <>
            <div className="container mx-auto mt-24">
                <div className="flex justify-center">
                    <div className="w-full max-w-3xl">
                        <h1 className="text-3xl font-bold mb-8">공지게시글 열람</h1>
                        <div className="bg-white shadow-lg rounded-lg">
                            <div className="p-6">
                                <form id="noticeform" encType="multipart/form-data">
                                    <input type="hidden" id="noticeid" name="noticeId" value={notice.id} />
                                    <div className="mb-6">
                                        <label htmlFor="board_writer_name" className="block text-gray-700 font-semibold mb-2">공지종류</label>
                                        <input
                                            type="text"
                                            id="board_writer_name"
                                            name="noticeGroup"
                                            className="form-control block w-full bg-gray-100 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none"
                                            value={notice.noticeGroup}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="board_writer_name" className="block text-gray-700 font-semibold mb-2">작성일</label>
                                        <input
                                            type="text"
                                            name="createdTime"
                                            className="form-control block w-full bg-gray-100 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none"
                                            value={new Date(notice.createdTime).toLocaleDateString('ko-KR')}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="noticeAuthor" className="block text-gray-700 font-semibold mb-2">작성자</label>
                                        <input
                                            type="text"
                                            id="noticeAuthor"
                                            name="noticeWriter"
                                            className="form-control block w-full bg-gray-100 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none"
                                            value={notice.noticeWriter}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="noticeTitle" className="block text-gray-700 font-semibold mb-2">제목</label>
                                        <input
                                            type="text"
                                            id="noticeTitle"
                                            name="noticeTitle"
                                            className="form-control block w-full bg-gray-100 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none"
                                            value={notice.noticeTitle}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-semibold mb-2">내용</label>
                                        <p className="bg-gray-100 p-4 rounded-lg text-gray-700">
                                            {notice.noticeContents}
                                        </p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-semibold mb-2">첨부 파일</label>
                                        {fileList.length > 0 ? (
                                            fileList.map((file, index) => (
                                                <div key={index}>
                                                    <DownloadButton fileName={file.originFileName} fileType="notice" />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-gray-500">첨부 파일이 없습니다.</div>
                                        )}
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <Link href="/notice">
                                            <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
                                                목록
                                            </button>
                                        </Link>
                                        <button
                                            type="button"
                                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                        >
                                            수정하기
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    } catch (error) {
        return <>

        </>
    }
}