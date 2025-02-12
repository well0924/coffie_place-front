"use client"


interface DeleteButtonProps {
    checkedItems: string[];
    onDelete: () => void;
}

//어드민 페이지 선택삭제 버튼 부분
export default function selectDeleteButton({ checkedItems, onDelete }: DeleteButtonProps) {
    const handleClick = () => {
        if (checkedItems.length === 0) {
            alert("삭제할 항목을 선택해주세요.");
            return;
        }
        const confirmDelete = confirm('정말로 삭제하시겠습니까?');
        if (confirmDelete) {
            onDelete();
        }
    };

    return <>
        <button
            onClick={handleClick}
            className="bg-blue-500 text-white py-2 px-3 sm:px-4 md:px-6 rounded text-xs sm:text-sm md:text-base w-full md:w-auto hover:bg-blue-600 transition"
        >
            선택삭제
        </button>
    </>

}