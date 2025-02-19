import Avatar from "./Avatar";
import Button from "./Button";
import basic from "@/assets/images/costumes/basic.png";
import Link from "next/link";

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
        <Link href={"/users/1"}>
          <Avatar className="w-15 h-15" costumeSrc={basic} />
        </Link>
        <div className="flex flex-col gap-1">
          <Link href={"/users/1"}>
            <span className="font-semibold text-xl">{nickname}</span>
          </Link>
          <span className="text-site-darkgray-02">{description}</span>
        </div>
      </div>
      <div>
        <Button>친구신청</Button>
      </div>
    </article>
  );
}
