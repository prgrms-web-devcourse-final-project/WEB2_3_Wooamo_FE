"use client";

import InputIcon from "@/components/common/InputIcon";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Comment from "./Comment";
import { FormEvent, useState } from "react";
import Icon from "../../../../components/common/Icon";

export default function Comments() {
  const [comment, setComment] = useState("");

  const sendComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("댓글 작성");
  };
  return (
    <form onSubmit={sendComment}>
      <div className="flex items-center gap-2.5 mt-5 mb-2.5 lg:my-7">
        <Icon MuiIcon={ChatRoundedIcon} />
        <span className="lg:text-xl text-site-darkgray-02">2</span>
      </div>
      <InputIcon
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 남겨보세요"
        Icon={SendRoundedIcon}
      />
      <div className="flex flex-col gap-8 lg:gap-7 mt-5 lg:mt-7">
        {[1, 2, 3].map((_, idx) => (
          <Comment key={idx} />
        ))}
      </div>
    </form>
  );
}
