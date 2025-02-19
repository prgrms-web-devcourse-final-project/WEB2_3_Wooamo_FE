"use client";

import Button from "@/components/common/Button";
import InputWithErrorMsg from "@/components/common/InputWithErrorMsg";
import Modal from "@/components/common/Modal";
import useInputValidation from "@/hooks/useInputValidation";
import { useModalStore } from "@/store/modalStore";
import { FormEvent } from "react";

export default function ParticipateModal() {
  const { close } = useModalStore((state) => state);
  const { validate, ...point } = useInputValidation(0, (value) => {
    if (!value || Number(value) < 100) {
      return "최소 배팅 금액 이상 입력해주세요";
    }
    return null;
  });

  const participateParty = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      console.log("팟 생성 및 참여");
      close();
    }
  };

  return (
    <Modal>
      <form
        onSubmit={participateParty}
        className="flex flex-col items-center w-full gap-7.5"
      >
        <div className="flex flex-col w-full items-center gap-4">
          <span className="text-xl">배팅 포인트</span>
          <InputWithErrorMsg
            type="number"
            className="bg-site-button-input"
            placeholder="배팅할 포인트를 입력해주세요"
            autoFocus
            {...point}
          />
        </div>
        <Button className="w-fit px-6">참여하기</Button>
      </form>
    </Modal>
  );
}
