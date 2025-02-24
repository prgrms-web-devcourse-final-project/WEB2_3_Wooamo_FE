import Image from "next/image";
import Link from "next/link";
import formatDateToTimeAgo from "../../../utils/formatDateToTimeAgo";

export default function PostItem({ post }: { post: postItemType }) {
  return (
    <Link href={`/boards/${post.boardId}`}>
      <article className="flex justify-between items-center h-24 lg:h-40 pt-4 p-2.5 bg-site-white-70">
        <div className="flex flex-col gap-1 lg:px-5">
          <p className="font-semibold line-clamp-1">{post.title}</p>
          <p className="text-site-darkgray-02 line-clamp-1">{post.context}</p>
          <p className="text-site-darkgray-01 text-sm">
            {formatDateToTimeAgo(new Date(post.createAt))}
          </p>
        </div>
        {post.image && (
          <Image
            src={post.image}
            width={140}
            height={140}
            alt="게시글 이미지 첫번째 이미지"
            className="w-20 h-20 lg:w-35 lg:h-35 object-cover"
          />
        )}
      </article>
    </Link>
  );
}
