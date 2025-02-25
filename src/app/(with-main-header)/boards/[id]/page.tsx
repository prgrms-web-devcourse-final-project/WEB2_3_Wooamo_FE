import Comments from "./Comments";
import PostImage from "../PostImage";
import Post from "./Post";
import { boardApi } from "@/api/board/board";

interface BoardDetailProps {
  params: { id: string };
}

export default async function BoardDetail({ params }: BoardDetailProps) {
  const boardId = parseInt(params.id);
  const boardDetail = await boardApi.getBoardByBoardId(boardId);

  return (
    <section className="flex flex-col gap-2.5 lg:gap-5 px-5 lg:px-0">
      <Post boardId={boardId} />
      <div className="flex gap-2.5 items-center">
        {boardDetail?.data.images.map((imageUrl, idx) => (
          <PostImage key={idx} showDeleteIcon={false} imageUrl={imageUrl} />
        ))}
      </div>
      <Comments />
    </section>
  );
}
