"use client";

import React, { FormEvent, useState } from "react";
import InputIcon from "@/components/common/InputIcon";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useSocketStore } from "@/store/socketStore";

interface ChattingInputProps {
  currentUser: userType;
  roomId: string;
}

export default function ChattingInput({
  currentUser,
  roomId,
}: ChattingInputProps) {
  const { disconnect, sendMessage } = useSocketStore();
  const [chatting, setChatting] = useState("");

  const sendChatting = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedChatting = chatting.trim();
    if (trimmedChatting === "") return;

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
      className="fixed bottom-5 left-0 w-full px-5 lg:px-0"
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
