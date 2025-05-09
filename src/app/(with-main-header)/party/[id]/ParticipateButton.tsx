"use client";

import { revalidateTagAction } from "@/actions";
import { chattingApi } from "@/api/chatting/chatting";
import { partyApi } from "@/api/party/party";
import Button from "@/components/common/Button";
import InputWithErrorMsg from "@/components/common/InputWithErrorMsg";
import Modal from "@/components/common/Modal";
import useInputValidation from "@/hooks/useInputValidation";
import { useModalStore } from "@/store/modalStore";
import { useToastStore } from "@/store/toastStore";
import React, { FormEvent } from "react";

interface ParticipateButtonProps {
  partyId: number;
  partyName: string;
  maxMembers: number;
  userId?: number;
  userPoint?: number;
  participantCount: number;
  bettingPoint: number;
}

export default function ParticipateButton({
  partyId,
  partyName,
  maxMembers,
  userId,
  userPoint,
  participantCount,
  bettingPoint,
}: ParticipateButtonProps) {
  const { open, close } = useModalStore((state) => state);
  const showToast = useToastStore((state) => state.showToast);

  const { validate, ...point } = useInputValidation(0, (value) => {
    if (Number(value) < bettingPoint) {
      return `최소 배팅 금액 이상 입력해주세요`;
    }
    if ((userPoint ?? 0) < value) {
      return "보유하신 포인트가 부족합니다";
    }
    return null;
  });

  const participateParty = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId || !validate()) return;

    const participateParty = await partyApi.postParticiapteParty(
      partyId,
      point.value,
    );

    if (participantCount >= maxMembers) {
      close();
      showToast("이미 인원이 가득 찼습니다");
    }

    if (participateParty?.status === "성공") {
      const roomId = await chattingApi.createGroupChatRoom({
        groupId: String(partyId),
        groupName: partyName,
        userId,
        maxMembers,
      });

      if (roomId?.status === "성공") {
        revalidateTagAction("participant-update");
        revalidateTagAction("point-update");
        close();
      }
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
