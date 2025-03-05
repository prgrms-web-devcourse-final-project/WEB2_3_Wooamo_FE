"use client";

import { revalidateTagAction } from "@/actions";
import { partyApi } from "@/api/party/party";
import Button from "@/components/common/Button";
import InputWithErrorMsg from "@/components/common/InputWithErrorMsg";
import Modal from "@/components/common/Modal";
import useInputValidation from "@/hooks/useInputValidation";
import { useModalStore } from "@/store/modalStore";
import React, { FormEvent, useState } from "react";

interface ParticipateButtonProps {
  partyId: number;
  bettingPoint: number;
}

export default function ParticipateButton({
  partyId,
  bettingPoint,
}: ParticipateButtonProps) {
  const { open, close } = useModalStore((state) => state);
  const { validate, ...point } = useInputValidation(0, (value) => {
    if (!value || Number(value) < bettingPoint) {
      return `최소 배팅 금액 이상 입력해주세요`;
    }
    return null;
  });

  const participateParty = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    const participateParty = await partyApi.postParticiapteParty(
      partyId,
      point.value,
    );

    if (participateParty?.status === "성공") {
      revalidateTagAction("participant-list");
      close();
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => open("participate-party")}>참여하기</Button>
      </div>

      <Modal modalId="participate-party">
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
    </>
  );
}
