"use client";

import Avatar from "@/components/common/Avatar";
import Link from "next/link";
import basic from "@/assets/images/costumes/basic.png";
import PostDeleteButton from "./PostDeleteButton";
import { useEffect, useState } from "react";
import { boardApi } from "@/api/board/board";
import formatDateToTimeAgo from "@/utils/formatDateToTimeAgo";

interface PostProps {
  boardId: number;
}

export default function Post({ boardId }: PostProps) {
  const [boardDetail, setBoardDetail] = useState<boardDetail | null>(null);

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await boardApi.getBoardByBoardId(boardId);
        if (response) {
          setBoardDetail(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch board detail:", error);
      }
    };

    fetchBoardDetail();
  }, [boardId]);

  if (!boardDetail) return null;

  return (
    <>
      <div className="border-b border-site-darkgray-02">
        <h1 className="flex items-center h-12.5 lg:h-20 px-5 lg:px-8 font-semibold lg:text-xl">
          [{boardDetail.boardType}] {boardDetail.title}
        </h1>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <Link
            href={`/users/${boardDetail.userId}`}
            className="flex items-center gap-2.5"
          >
            <Avatar costumeSrc={boardDetail.profile || basic} />
            <span className="font-semibold">@{boardDetail.nickname}</span>
          </Link>
          <span className="font-semibold text-sm text-site-darkgray-02">
            {formatDateToTimeAgo(new Date(boardDetail.createdAt))}
          </span>
        </div>
        <p className="flex gap-2">
          <Link href={`/boards/${boardId}/update`}>수정</Link>
          <span>|</span>
          <PostDeleteButton />
        </p>
      </div>
      <div className="min-h-[200px] bg-site-white-70 p-5 lg:px-6">
        {boardDetail.context}
      </div>
    </>
  );
}
