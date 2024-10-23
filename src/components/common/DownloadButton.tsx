'use client';

import { api } from "@/utile/api/axios";

//다운로드 링크
interface DownloadButtonProps {
    fileName: string;
    fileType: 'board' | 'notice';
}


export default function Download({ fileName, fileType } : DownloadButtonProps) {
    const handleDownload = async () => {
        try {
            const response = await api.get(`/api/file/${fileType}/download/${fileName}`, {
                responseType: 'blob', // 응답으로 파일을 blob 형태로 받음
            });
            console.log(response);
            // Blob URL 생성
            const url = window.URL.createObjectURL(new Blob([response.data]));
            // 링크 엘리먼트 생성
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // 파일 이름 설정
            // 링크 클릭하여 다운로드 실행
            document.body.appendChild(link);
            link.click();
            // 링크 제거
            link.remove();
        } catch (error) {
            console.error('파일 다운로드 중 오류 발생:', error);
        }
    };

    return <>
         <button onClick={handleDownload} className="text-blue-500 hover:underline">
            {fileName}
        </button>
    </>
}