import Image from "next/image";
import Link from "next/link";
import formatDateToTimeAgo from "../../../utils/formatDateToTimeAgo";
import { delay } from "@/utils/delay";

interface PostItemProps {
  post: boardItem;
}
export default async function PostItem({ post }: PostItemProps) {
  await delay(5000);
  const { boardId, title, boardType, createdAt, image, context } = post;
  const formattedTitle = `[${boardType}] ${title}`;
  return (
    <Link href={`/boards/${boardId}`}>
      <article className="flex justify-between items-center h-24 lg:h-40 p-2.5 bg-site-white-70">
        <div className="flex flex-col gap-1 lg:px-5">
          <p className="font-semibold line-clamp-1">{formattedTitle}</p>
          <p className="text-site-darkgray-02 line-clamp-1">{context}</p>
          <p className="text-site-darkgray-01 text-sm">
            {formatDateToTimeAgo(new Date(createdAt))}
          </p>
        </div>
        {image && (
          <Image
            src={image}
            width={140}
            height={140}
            alt="게시글 이미지 첫번째 이미지"
            className="min-w-20 min-h-20 lg:w-35 lg:h-35 object-cover"
          />
        )}
      </article>
    </Link>
  );
}
