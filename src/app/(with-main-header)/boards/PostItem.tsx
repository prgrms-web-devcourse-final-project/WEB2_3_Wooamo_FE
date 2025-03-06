import Image from "next/image";
import Link from "next/link";
import formatDateToTimeAgo from "../../../utils/formatDateToTimeAgo";
import Icon from "@/components/common/Icon";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

interface PostItemProps {
  post: boardItem;
}
export default async function PostItem({ post }: PostItemProps) {
  const { boardId, title, boardType, createdAt, image, context, isConfirm } =
    post;
  const formattedTitle = `[${boardType}] ${title}`;

  const renderContextWithLineBreaks = (context: string) => {
    return context.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <Link href={`/boards/${boardId}`}>
      <article className="flex justify-between items-center h-24 lg:h-40 p-2.5 bg-site-white-70">
        <div className="flex flex-col gap-1 lg:px-5">
          <p className="font-semibold line-clamp-1">{formattedTitle}</p>
          <p className="text-site-darkgray-02 line-clamp-1">
            {renderContextWithLineBreaks(context)}
          </p>
          <p className="text-site-darkgray-01 text-sm">
            {formatDateToTimeAgo(new Date(createdAt))}
          </p>
        </div>
        <div className="relative min-w-20 min-h-20 lg:w-35 lg:h-35">
          {image ? (
            <Image
              src={image}
              width={140}
              height={140}
              alt="게시글 이미지 첫번째 이미지"
              className="min-w-20 min-h-20 lg:w-35 lg:h-35 object-cover"
            />
          ) : (
            <div className="w-full h-full bg-transparent"></div>
          )}
          {isConfirm && (
            <div className="absolute top-1 right-1 lg:top-2 lg:right-2">
              <Icon
                MuiIcon={CheckRoundedIcon}
                className="text-site-main bg-site-white-70 rounded-2xl "
              />
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
