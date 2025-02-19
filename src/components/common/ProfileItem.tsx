import Avatar from "./Avatar";
import Button from "./Button";
import AvatarImg from "@/assets/images/avatar.png";

interface ProfileItemProps {
  nickname: string;
  description: string;
}

export default function ProfileItem({
  nickname,
  description,
}: ProfileItemProps) {
  return (
    <article className="flex justify-between items-center">
      <div className="flex items-center gap-2.5">
        <Avatar className="w-15 h-15" src={AvatarImg} />
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-xl">{nickname}</span>
          <span className="text-site-darkgray-02">{description}</span>
        </div>
      </div>
      <div>
        <Button>친구신청</Button>
      </div>
    </article>
  );
}
