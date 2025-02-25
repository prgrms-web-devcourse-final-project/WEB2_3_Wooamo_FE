import Avatar from "@/components/common/Avatar";
import Link from "next/link";

type CommentProps = {
  data: {
    commentId: number;
    nickname: string;
    profile: string;
    context: string;
    createdAt: string;
    isConfirm: boolean;
    userId: number;
  };
};

export default function Comment({ data }: CommentProps) {
  return (
    <article className="flex gap-2.5">
      <Link href={`/users/${data.userId}`}>
        <Avatar
          costumeSrc={data.profile}
          className="w-11 lg:w-14 h-11 lg:h-14"
        />
      </Link>
      <div className="flex flex-col lg:gap-1">
        <Link href={`/users/${data.userId}`} className="w-fit">
          <p className="font-semibold lg:text-xl">@{data.nickname}</p>
        </Link>
        <p className="text-site-darkgray-02 text-sm lg:text-base">
          {data.context}
        </p>
      </div>
    </article>
  );
}
