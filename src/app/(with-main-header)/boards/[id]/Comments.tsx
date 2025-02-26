"use client";

import InputIcon from "@/components/common/InputIcon";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Comment from "./Comment";
import { FormEvent, useState, useEffect } from "react";
import Icon from "../../../../components/common/Icon";
import { boardApi } from "@/api/board/board";
import { usePathname } from "next/navigation";

export default function Comments() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<commentItem[]>([]);
  const [totalElements, setTotalElements] = useState(0);

  const pathname = usePathname();
  const boardId = parseInt(pathname.split("/")[2], 10);

  if (!boardId) {
    return null;
  }

  const fetchComments = async () => {
    try {
      const data = await boardApi.getCommentsByBoardId(boardId);
      if (data) {
        setComments(data.data.contents);
        setTotalElements(data.data.totalElements);
      }
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [boardId]);

  const sendComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedComment = comment.trim();
    if (!trimmedComment) return;

    try {
      const response = await boardApi.createComment(boardId, {
        context: trimmedComment,
      });

      if (response.status === "성공") {
        setComment("");
        fetchComments();
      }
    } catch (error) {
      console.error("댓글 작성 실패:", error);
    }
  };

  return (
    <form onSubmit={sendComment}>
      <div className="flex items-center gap-2.5 mt-5 mb-2.5 lg:my-7">
        <Icon MuiIcon={ChatRoundedIcon} />
        <span className="lg:text-xl text-site-darkgray-02">
          {totalElements}
        </span>
      </div>
      <InputIcon
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 남겨보세요"
        Icon={SendRoundedIcon}
      />
      <div className="flex flex-col gap-8 lg:gap-7 mt-5 lg:mt-7">
        {comments.map((commentData) => (
          <Comment key={commentData.commentId} data={commentData} />
        ))}
      </div>
    </form>
  );
}
