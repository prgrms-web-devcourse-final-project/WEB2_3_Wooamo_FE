"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";

export default function PostDeleteButton() {
  const { open, close } = useModalStore((state) => state);

  return (
    <>
      <button onClick={() => open("delete-post")}>삭제</button>

      <Modal modalId="delete-post">
        <div className="flex flex-col justify-center items-center gap-7.5">
          <p>게시물을 삭제하시겠습니까?</p>
          <Button
            onClick={() => {
              console.log("게시물 삭제");
              close();
            }}
          >
            삭제하기
          </Button>
        </div>
      </Modal>
    </>
  );
}
