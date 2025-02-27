import PostItem from "./PostItem";
import BoardsHeader from "./BoardsHeader";
import { boardApi } from "@/api/board/board";
import { Suspense } from "react";
import PostItemSkeleton from "@/components/common/skeletons/PostItemSkeleton";

export default async function Boards() {
  const posts = await boardApi.getBoardList();

  if (!posts) return;
  return (
    <div className="flex flex-col gap-10 lg:gap-13 px-5 lg:px-0">
      <BoardsHeader />
      <section className="flex flex-col gap-2 lg:gap-5">
        <Suspense fallback={<PostItemSkeleton count={3} />}>
          {posts.data.contents.map((post) => (
            <PostItem key={post.boardId} post={post} />
          ))}
        </Suspense>
      </section>
    </div>
  );
}
