import Image from "next/image";
import Link from "next/link";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { userApi } from "@/api/user/user";
import dynamic from "next/dynamic";
import PostInfo from "./PostInfo";

const Icon = dynamic(() => import("@/components/common/Icon"));

interface PostItemProps {
  post: boardItem;
}
export default async function PostItem({ post }: PostItemProps) {
  const { boardId, image, isConfirm } = post;
  const userInfo = await userApi.getCurrentUserInfo();

  return (
    <Link href={userInfo?.data ? `/boards/${boardId}` : "/signin"}>
      <article className="flex justify-between items-center h-24 lg:h-40 p-2.5 bg-site-white-70">
        <PostInfo post={post} />
        <div className="relative w-20 h-20 lg:w-35 lg:h-35 overflow-hidden shrink-0">
          {image ? (
            <Image
              src={image}
              fill
              alt="게시글 이미지 첫번째 이미지"
              className="min-w-20 min-h-20 lg:w-35 lg:h-35 object-cover absolute inset-0"
              sizes="(max-width: 1024px) 80px, 140px"
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
