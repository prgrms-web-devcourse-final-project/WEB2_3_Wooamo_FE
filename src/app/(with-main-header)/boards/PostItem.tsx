import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/Logo.svg";
import formatDateToTimeAgo from "../../../utils/formatDateToTimeAgo";
import { useEffect, useState } from "react";
import { boardApi } from "@/api/board/board";

interface PostItemProps {
  post: boardItem;
}
export default function PostItem({ post }: PostItemProps) {
  const { boardId, title, boardType, createdAt, image } = post;
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

  const formattedTitle = `[${boardType}] ${title}`;

  return (
    <Link href={`/boards/${boardId}`}>
      <article className="flex justify-between items-center h-24 lg:h-40 p-2.5 bg-site-white-70">
        <div className="flex flex-col gap-1 lg:px-5">
          <p className="font-semibold line-clamp-1">{formattedTitle}</p>
          <p className="text-site-darkgray-02 line-clamp-1">
            {boardDetail?.context}
          </p>
          <p className="text-site-darkgray-01 text-sm">
            {formatDateToTimeAgo(new Date(createdAt))}
          </p>
        </div>
        <div className="relative w-20 h-20 lg:w-35 lg:h-35 bg-white">
          <Image
            src={image || Logo}
            alt={image ? "게시글 이미지" : "STUV 로고 이미지"}
            fill
            className="object-cover"
          />
        </div>
      </article>
    </Link>
  );
}
