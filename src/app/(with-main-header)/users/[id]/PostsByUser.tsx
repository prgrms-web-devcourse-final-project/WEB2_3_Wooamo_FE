import { delay } from "@/utils/delay";
import PostItem from "../../boards/PostItem";
import { userApi } from "@/api/user/user";

interface PostsByUserProps {
  userId: number;
}

export default async function PostsByUser({ userId }: PostsByUserProps) {
  const posts = await userApi.getUserPosts(userId);
  if (!posts) return;
  return (
    <section className="flex flex-col gap-2 lg:gap-8">
      <p className="flex gap-1.5 font-semibold">
        <span>게시글</span>
        <span>{posts.data.length}</span>
      </p>
      <div className="flex flex-col gap-5">
        {posts.data.length === 0 ? (
          <div className="flex justify-center items-center h-24 lg:h-40 p-2.5 bg-site-white-70">
            <p className="text-site-darkgray-02">게시글이 없습니다.</p>
          </div>
        ) : (
          posts.data
            .reverse()
            .map((post) => (
              <PostItem key={`post-${post.boardId}`} post={post} />
            ))
        )}
      </div>
    </section>
  );
}
