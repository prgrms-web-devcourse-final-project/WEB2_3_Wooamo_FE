import { boardApi } from "@/api/board/board";
import PostItem from "./PostItem";
import Pagination from "../party/all/Pagination";

interface PostItemsProps {
  title: string;
  page: string;
}

export default async function PostItems({ title, page }: PostItemsProps) {
  page = page ?? 0;
  const fetchPosts = await boardApi.getBoardList(title, Number(page));
  const totalPages = fetchPosts.data.totalPages;
  const posts = fetchPosts.data.contents;

  if (!posts) return;
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.boardId} post={post} />
      ))}
      {!title && (
        <div>
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
