"use client";

import { Link } from "lucide-react";
import basic from "@/assets/images/costumes/basic.webp";
import formatDateToTimeAgo from "@/utils/formatDateToTimeAgo";
import Avatar from "@/components/common/Avatar";

interface PostProfileProps {
  boardDetail: boardDetail;
}

export default function PostProfile({ boardDetail }: PostProfileProps) {
  return (
    <div className="flex items-center gap-2.5">
      <Link
        href={`/users/${boardDetail.userId}`}
        className="flex items-center gap-2.5"
      >
        <Avatar costumeSrc={boardDetail.profile || basic.src} />
        <span className="font-semibold">@{boardDetail.nickname}</span>
      </Link>
      <span className="text-xs lg:text-sm text-site-darkgray-01">
        {formatDateToTimeAgo(new Date(boardDetail.createdAt))}
      </span>
    </div>
  );
}
