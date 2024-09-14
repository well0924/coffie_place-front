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
        <button onClick={handleClick} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            선택삭제
        </button>
    </>
}