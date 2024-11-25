import { freeBoardAttachList } from "@/utile/api/attach/attachApi";
import { getBoardDetail, getPreviousNextBoard } from "@/utile/api/board/boardApi";
import { boardCommentList } from "@/utile/api/comment/commentApi";
import { boardLikeCount } from "@/utile/api/like/likeApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Metadata } from "next";
import Link from "next/link";
import CommentInput from "@/components/comment/commentInput";
import CommentListPage from "@/components/comment/commentList";
import BoardLike from "@/components/like/BoardLikePlus";
import BoardLikeMinus from "@/components/like/BoardLikeMinus";
import BoardLikeCount from "@/components/like/BoardLikeCount";

export const metadata: Metadata = {
    title: "자유 게시판 조회 페이지",
    description: "자유 게시판 조회 페이지",
};

export default async function boardDetailPage({ params,
}: {
    params: { id: string };
}) {

    const { id } = params;

    //api 호출 부분
    try {

        const boardDetail = await getBoardDetail(Number(id));
        const boardFileList = await freeBoardAttachList(Number(id));
        const previousNextList = await getPreviousNextBoard(Number(id));
        const likeCount = await boardLikeCount(Number(id));
        const commentList = await boardCommentList(Number(id));

        console.log("좋아요 갯수:" + likeCount);
        console.log("댓글 목록:" + commentList);

        let previousBoard = null;
        let nextBoard = null;

        //게시글 이전 & 다음 페이지
        if (previousNextList.length === 2) {
            if (previousNextList[0].id > Number(id)) {
                nextBoard = previousNextList[0];
                previousBoard = previousNextList[1];
            } else {
                previousBoard = previousNextList[0];
                nextBoard = previousNextList[1];
            }
        } else if (previousNextList.length === 1) {
            if (previousNextList[0].id > Number(id)) {
                nextBoard = previousNextList[0];
            } else {
                previousBoard = previousNextList[0];
            }
        }

        return (
            <div className="container mx-auto mt-24">
                <div className="flex flex-col">
                    <div className="w-full">
                        <h1 className="text-3xl font-bold mb-6">게시글 열람</h1>
                        {/**게시글 좋아요 수(컴포넌트로 대체하기.)*/}
                        <BoardLikeCount boardId={boardDetail.id}></BoardLikeCount>
                        {/**게시글 조회수 */}
                        <FontAwesomeIcon icon={faEye} />{boardDetail.readCount}
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="mb-6">
                                <input type="hidden" value={boardDetail.id || ""} />
                                <input type="hidden" value={boardDetail.passWd || ""} />
                                <div className="mb-4">
                                    <label htmlFor="board_subject" className="block text-gray-700 font-bold mb-2">
                                        제목
                                    </label>
                                    <input
                                        type="text"
                                        id="board_subject"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={boardDetail.boardTitle || ""}
                                        disabled
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="board_writer" className="block text-gray-700 font-bold mb-2">
                                        작성자
                                    </label>
                                    <input
                                        type="text"
                                        id="board_writer"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={boardDetail.boardAuthor || ""}
                                        disabled
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="board_date" className="block text-gray-700 font-bold mb-2">
                                        작성날짜
                                    </label>
                                    <input
                                        type="text"
                                        id="board_date"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={
                                            boardDetail.createdTime
                                                ? new Date(boardDetail.createdTime).toLocaleDateString('ko-KR')
                                                : ""
                                        }
                                        disabled
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="board_content" className="block text-gray-700 font-bold mb-2">
                                        내용
                                    </label>
                                    <p id="board_content" className="p-2 border border-gray-300 rounded">
                                        {boardDetail.boardContents || ""}
                                    </p>
                                </div>
                                <div className="mb-4 flex space-x-4">
                                    {/**게시글 좋아요 추가 기능**/}
                                    <BoardLike boardId={boardDetail.id}></BoardLike>
                                    {/**게시글 좋아요 감소 기능**/}
                                    <BoardLikeMinus boardId={boardDetail.id}></BoardLikeMinus>
                                </div>
                                {/*다운로드 링크 수정 */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">첨부 파일</label>
                                    {boardFileList.length > 0 ? (
                                        boardFileList.map((file, index) => (
                                            <div key={index}>
                                                <Link
                                                    href={`http://localhost:8081/api/file/board/download/${file.originFileName}`}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {file.originFileName}
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <div>첨부 파일이 없습니다.</div>
                                    )}
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <Link href="/board" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                        <>
                                            목록보기
                                        </>
                                    </Link>
                                    <Link href={"/"} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                        수정하기
                                    </Link>
                                </div>
                            </div>
                            <div className="list-group">
                                {previousBoard && (
                                    <div className="mb-4">
                                        <Link href={`/board/${previousBoard.id}`} className="block p-4 bg-gray-100 rounded hover:bg-gray-200">
                                            <>
                                                <span className="font-bold">이전글</span> │
                                                <span className="text-blue-500 ml-2">{previousBoard.boardTitle}</span>
                                            </>
                                        </Link>
                                    </div>
                                )}
                                {nextBoard && (
                                    <div>
                                        <Link href={`/board/${nextBoard.id}`} className="block p-4 bg-gray-100 rounded hover:bg-gray-200">
                                            <>
                                                <span className="font-bold">다음글</span> │
                                                <span className="text-blue-500 ml-2">{nextBoard.boardTitle}</span>
                                            </>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            {/*댓글 목록 및 작성부분 */}
                            <CommentListPage boardId={boardDetail.id}></CommentListPage>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="container mx-auto mt-24">
                <div className="flex flex-col">
                    <div className="w-full">
                        <h1 className="text-3xl font-bold mb-6">오류 발생</h1>
                        <p>게시글을 불러오는 중 문제가 발생했습니다. 나중에 다시 시도해주세요.</p>
                    </div>
                </div>
            </div>
        );
    }
}