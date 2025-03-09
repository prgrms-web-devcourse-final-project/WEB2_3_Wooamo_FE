"use client";

import React, { FormEvent, useState } from "react";
import InputIcon from "@/components/common/InputIcon";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useSocketStore } from "@/store/socketStore";
import { useSearchParams } from "next/navigation";

interface ChattingInputProps {
  currentUser: userType;
}

export default function ChattingInput({ currentUser }: ChattingInputProps) {
  const { disconnect, sendMessage } = useSocketStore();
  const [chatting, setChatting] = useState("");
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const sendChatting = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedChatting = chatting.trim();
    if (!roomId || trimmedChatting === "") return;

    console.log("currentUser: ", currentUser);
    sendMessage({
      roomId,
      userInfo: {
        userId: currentUser.userId,
        nickname: currentUser.nickname,
        profile: currentUser.profile ?? "",
      },
      message: trimmedChatting,
    });
    setChatting("");
    return () => disconnect();
  };

  return (
    <form
      onSubmit={sendChatting}
      className="fixed bottom-5 w-[calc(100%-10rem)] lg:px-0 left-1/2 -translate-x-1/2"
    >
      <InputIcon
        value={chatting}
        Icon={SendRoundedIcon}
        onChange={(e) => setChatting(e.target.value)}
        placeholder="채팅을 입력해주세요"
      />
    </form>
  );
}
