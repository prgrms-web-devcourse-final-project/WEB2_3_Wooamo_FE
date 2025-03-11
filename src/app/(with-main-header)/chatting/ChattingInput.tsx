"use client";

import React, { FormEvent, useState } from "react";
import InputIcon from "@/components/common/InputIcon";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useSearchParams } from "next/navigation";

interface ChattingInputProps {
  sendMessage: (message: string) => void;
}

export default function ChattingInput({ sendMessage }: ChattingInputProps) {
  const [chatting, setChatting] = useState("");
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const sendChatting = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedChatting = chatting.trim();
    if (!roomId || trimmedChatting === "") return;

    sendMessage(trimmedChatting);
    setChatting("");
  };

  return (
    <form
      onSubmit={sendChatting}
      className="fixed bottom-5 w-[calc(100%-4rem)] lg:w-[calc(100%-7rem)] left-1/2 -translate-x-1/2"
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
