import Comments from "./Comments";
import PostImage from "../PostImage";
import Post from "./Post";

interface BoardDetailProps {
  params: { id: string };
}

export default async function BoardDetail({ params }: BoardDetailProps) {
  const boardId = parseInt(params.id, 10);

  return (
    <section className="flex flex-col gap-2.5 lg:gap-5 px-5 lg:px-0">
      <Post boardId={boardId} />
      <div className="flex gap-2.5 items-center">
        {[1, 2].map((_, idx) => (
          <PostImage key={idx} showDeleteIcon={false} />
        ))}
      </div>
      <Comments />
    </section>
  );
}
