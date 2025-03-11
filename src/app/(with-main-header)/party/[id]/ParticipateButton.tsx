"use client";

import { revalidateTagAction } from "@/actions";
import { chattingApi } from "@/api/chatting/chatting";
import { partyApi } from "@/api/party/party";
import Button from "@/components/common/Button";
import InputWithErrorMsg from "@/components/common/InputWithErrorMsg";
import Modal from "@/components/common/Modal";
import useInputValidation from "@/hooks/useInputValidation";
import { useModalStore } from "@/store/modalStore";
import { useSocketStore } from "@/store/socketStore";
import React, { FormEvent } from "react";

interface ParticipateButtonProps {
  partyId: number;
  partyName: string;
  maxMembers: number;
  userId?: number;
  bettingPoint: number;
}

export default function ParticipateButton({
  partyId,
  partyName,
  maxMembers,
  userId,
  bettingPoint,
}: ParticipateButtonProps) {
  const { connect, disconnect, join } = useSocketStore();
  const { open, close } = useModalStore((state) => state);
  const { validate, ...point } = useInputValidation(0, (value) => {
    if (!value || Number(value) < bettingPoint) {
      return `최소 배팅 금액 이상 입력해주세요`;
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

    if (participateParty?.status === "성공") {
      await connect();
      const roomId = await chattingApi.createGroupChatRoom({
        groupId: String(partyId),
        groupName: partyName,
        userId,
        maxMembers,
      });

      if (roomId?.status === "성공") {
        join(roomId.data, userId);
        disconnect();
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
