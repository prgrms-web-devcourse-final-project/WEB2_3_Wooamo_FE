import BoardsHeader from "./BoardsHeader";
import { Suspense } from "react";
import PostItemSkeleton from "@/components/common/skeletons/PostItemSkeleton";
import PostItems from "./PostItems";

interface PageProps {
  searchParams: Promise<{ title: string; page: string }>;
}

export default async function Boards({ searchParams }: PageProps) {
  const { title, page } = await searchParams;

  return (
    <div className="flex flex-col gap-10 lg:gap-13 px-5 lg:px-0">
      <BoardsHeader />
      <section className="flex flex-col gap-2 lg:gap-5">
        <Suspense fallback={<PostItemSkeleton count={3} />}>
          <PostItems title={title} page={page} />
        </Suspense>
      </section>
    </div>
  );
}
