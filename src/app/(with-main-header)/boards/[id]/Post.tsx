import Avatar from "@/components/common/Avatar";
import Link from "next/link";
import basic from "@/assets/images/costumes/basic.webp";
import PostDeleteButton from "./PostDeleteButton";
import { boardApi } from "@/api/board/board";
import { userApi } from "@/api/user/user";
import formatDateToTimeAgo from "@/utils/formatDateToTimeAgo";
import renderContextWithLineBreaks from "@/utils/renderContextWithLineBreaks";

interface PostProps {
  boardId: number;
}

export default async function Post({ boardId }: PostProps) {
  const boardDetail = await boardApi.getBoardByBoardId(boardId);
  const currentUser = await userApi.getCurrentUserInfo();

  if (!boardDetail) return null;
  const isAuthor = currentUser?.data.userId === boardDetail.data.userId;
  return (
    <>
      <div className="border-b border-site-darkgray-02">
        <h1 className="flex items-center h-12.5 lg:h-20 px-5 lg:px-8 font-semibold lg:text-xl">
          [{boardDetail.data.boardType}] {boardDetail.data.title}
        </h1>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <Link
            href={`/users/${boardDetail.data.userId}`}
            className="flex items-center gap-2.5"
          >
            <Avatar costumeSrc={boardDetail.data.profile || basic.src} />
            <span className="font-semibold">@{boardDetail.data.nickname}</span>
          </Link>
          <span className="text-xs lg:text-sm text-site-darkgray-01">
            {formatDateToTimeAgo(new Date(boardDetail.data.createdAt))}
          </span>
        </div>
        {isAuthor && (
          <p className="flex gap-2">
            <Link href={`/boards/${boardId}/update`}>수정</Link>
            <span>|</span>
            <PostDeleteButton />
          </p>
        )}
      </div>
      <div className="min-h-[200px] bg-site-white-70 p-5 lg:px-6">
        {renderContextWithLineBreaks(boardDetail.data.context)}
      </div>
    </>
  );
}
