import { delay } from "@/utils/delay";
import PostItem from "../../boards/PostItem";
import { userApi } from "@/api/user/user";

export default async function PostsByUser() {
  await delay(3000);
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
          {posts.data.map((post) => (
            <PostItem key={`post-${post.boardId}`} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
