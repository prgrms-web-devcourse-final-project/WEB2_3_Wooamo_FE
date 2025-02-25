import { useEffect, useState } from "react";
import PostItem from "../../boards/PostItem";
import { userApi } from "@/api/user/user";

export default function PostsByUser() {
  const [posts, setPosts] = useState<boardItem[]>([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      const posts = await userApi.getCurrentUserPosts();
      if (posts) setPosts(posts.data);
    };

    fetchMyPosts();
  }, []);
  return (
    <section className="flex flex-col gap-2 lg:gap-8">
      <p className="flex gap-1.5 font-semibold">
        <span>게시글</span>
        <span>6</span>
      </p>
      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <PostItem key={`post-${post.boardId}`} post={post} />
        ))}
      </div>
    </section>
  );
}
