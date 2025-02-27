"use client";

import { boardApi } from "@/api/board/board";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import { useParams, useRouter } from "next/navigation";

export default function PostDeleteButton() {
  const { open, close } = useModalStore((state) => state);
  const params = useParams();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const boardId = Number(params.id);
      const response = await boardApi.deleteBoard(boardId);

      if (response.status === "성공") {
        close();
        router.push("/boards");
      }
    } catch (error) {
      console.error("게시물 삭제 중 오류 발생:", error);
    }
  };

  return (
    <>
      <button onClick={() => open("delete-post")}>삭제</button>

      <Modal modalId="delete-post">
        <div className="flex flex-col justify-center items-center gap-7.5">
          <p>게시물을 삭제하시겠습니까?</p>
          <Button onClick={handleDelete}>삭제하기</Button>
        </div>
      </Modal>
    </>
  );
}
