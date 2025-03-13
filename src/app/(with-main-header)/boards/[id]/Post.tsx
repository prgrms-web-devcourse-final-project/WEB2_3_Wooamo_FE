import Link from "next/link";
import PostDeleteButton from "./PostDeleteButton";
import { boardApi } from "@/api/board/board";
import { userApi } from "@/api/user/user";
import renderContextWithLineBreaks from "@/utils/renderContextWithLineBreaks";
import PostProfile from "./PostProfile";

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
        <PostProfile boardDetail={boardDetail.data} />
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
