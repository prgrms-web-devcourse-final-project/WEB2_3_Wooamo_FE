"use client";

import formatDateToTimeAgo from "@/utils/formatDateToTimeAgo";
import renderContextWithLineBreaks from "@/utils/renderContextWithLineBreaks";

interface PostInfoProps {
  post: boardItem;
}

export default function PostInfo({ post }: PostInfoProps) {
  const { title, createdAt, context } = post;
  const formattedTitle = `[${post.boardType}] ${title}`;
  return (
    <div className="flex flex-col gap-1 lg:px-5">
      <p className="font-semibold line-clamp-1">{formattedTitle}</p>
      <p className="text-site-darkgray-02 line-clamp-1">
        {renderContextWithLineBreaks(context)}
      </p>
      <p className="text-site-darkgray-01 text-sm">
        {formatDateToTimeAgo(new Date(createdAt))}
      </p>
      <span>{new Date(createdAt).getTime()}</span>
      <span>{new Date().getTime()}</span>
    </div>
  );
}
