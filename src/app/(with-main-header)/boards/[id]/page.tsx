import Comments from "./Comments";
import PostImage from "../PostImage";
import Post from "./Post";
import { boardApi } from "@/api/board/board";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/board?title=&page=&size=`,
  );
  const posts: paginationType<boardItem[]> = await response.json();

  return posts.data.contents.map((post) => ({
    id: String(post.boardId),
  }));
}

interface BoardDetailProps {
  params: Promise<{ id: string }>;
}

export default async function BoardDetail({ params }: BoardDetailProps) {
  const { id } = await params;
  const boardId = parseInt(id);
  const boardDetail = await boardApi.getBoardByBoardId(boardId);

  if (!boardDetail || !boardDetail.data) {
    notFound();
  }

  return (
    <section className="flex flex-col gap-2.5 lg:gap-5 px-5 lg:px-0">
      <Post boardId={boardId} />
      <div className="flex gap-2.5 items-center">
        {boardDetail?.data.images.map((imageUrl, idx) => (
          <PostImage
            key={idx}
            showDeleteIcon={false}
            imageUrl={imageUrl}
            images={boardDetail.data.images}
            currentIndex={idx}
          />
        ))}
      </div>
      <Comments />
    </section>
  );
}
