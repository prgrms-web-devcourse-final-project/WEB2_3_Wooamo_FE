import Comments from "./Comments";
import PostImage from "../PostImage";
import Post from "./Post";

interface BoardDetailProps {
  params: Promise<{ id: string }>;
}

export default async function BoardDetail({ params }: BoardDetailProps) {
  const { id } = await params;

  return (
    <section className="flex flex-col gap-5">
      <Post />
      <div className="flex gap-2.5 items-center">
        {[1, 2].map((_, idx) => (
          <PostImage key={idx} />
        ))}
      </div>
      <Comments />
    </section>
  );
}
