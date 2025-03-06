import PostItem from "./PostItem";
import BoardsHeader from "./BoardsHeader";
import { boardApi } from "@/api/board/board";
import { Suspense } from "react";
import PostItemSkeleton from "@/components/common/skeletons/PostItemSkeleton";

interface PageProps {
  searchParams: {
    title?: string;
    page?: string;
  };
}

export default async function Boards({ searchParams }: PageProps) {
  const params = await searchParams;
  const title = params?.title?.trim() || "";
  const page = Math.max(0, Number(params?.page || "0"));

  try {
    const posts = await boardApi.getBoardList(page, title);

    if (!posts?.data?.contents) return null;

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
  } catch (error) {
    console.error("Error loading boards:", error);
    return <div>게시글을 불러오는데 실패했습니다.</div>;
  }
}
