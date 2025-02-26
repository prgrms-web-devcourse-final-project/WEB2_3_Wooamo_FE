import { Suspense } from "react";
import PostItem from "../../boards/PostItem";
import { userApi } from "@/api/user/user";
import PostItemSkeleton from "@/components/common/skeletons/PostItemSkeleton";

export default async function PostsByUser() {
  const posts = await userApi.getCurrentUserPosts();

  if (!posts) return null;
  return (
    <section className="flex flex-col gap-2 lg:gap-8">
      <p className="flex gap-1.5 font-semibold">
        <span>게시글</span>
        <span>{posts.data.length}</span>
      </p>
      <div className="flex flex-col gap-5">
        <div>
          <Suspense fallback={<PostItemSkeleton count={3} />}>
            {posts.data.map((post) => (
              <PostItem key={`post-${post.boardId}`} post={post} />
            ))}
          </Suspense>
        </div>
      </div>
    </section>
  );
}
