"use client";

import React, { useState } from "react";
import InputIcon from "@/components/common/InputIcon";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function ChattingInput() {
  const [chatting, setChatting] = useState("");
  return (
    <form action="" className="fixed bottom-5 left-0 w-full">
      <InputIcon
        value={chatting}
        Icon={SendRoundedIcon}
        onChange={(e) => setChatting(e.target.value)}
        onClickIcon={function (): void {
          throw new Error("Function not implemented.");
        }}
        placeholder="채팅을 입력해주세요"
      />
    </form>
  );
}
