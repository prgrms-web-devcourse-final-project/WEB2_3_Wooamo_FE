"use client";

import InputIcon from "@/components/common/InputIcon";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Comment from "./Comment";

export default function Comments() {
  return (
    <>
      <div className="flex items-center gap-2.5">
        <ChatRoundedIcon className="text-site-darkgray-02" />
        <span className="text-xl text-site-darkgray-02">2</span>
      </div>
      <InputIcon
        placeholder="댓글을 남겨보세요"
        Icon={SendRoundedIcon}
        onClickIcon={() => {
          console.log("댓글 작성");
        }}
      />
      <div className="flex flex-col gap-7">
        {[1, 2, 3].map((_, idx) => (
          <Comment key={idx} />
        ))}
      </div>
    </>
  );
}
