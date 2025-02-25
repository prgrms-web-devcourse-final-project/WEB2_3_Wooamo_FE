"use client";

import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import BoardsHeader from "./BoardsHeader";
import { boardApi } from "@/api/board/board";

export default function Boards() {
  const [posts, setPosts] = useState<boardItem[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await boardApi.getBoardList();
      if (response) {
        setPosts(response.data.contents);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-10 lg:gap-13 px-5 lg:px-0">
      <BoardsHeader />
      <section className="flex flex-col gap-2 lg:gap-5">
        {posts.map((post) => (
          <PostItem key={post.boardId} post={post} />
        ))}
      </section>
    </div>
  );
}
