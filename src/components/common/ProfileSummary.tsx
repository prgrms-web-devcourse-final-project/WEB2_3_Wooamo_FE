import Avatar from "./Avatar";
import basic from "@/assets/images/costumes/basic.png";
import Link from "next/link";

interface ProfileSummaryProps {
  nickname: string;
  description: string;
}

export default function ProfileSummary({
  nickname,
  description,
}: ProfileSummaryProps) {
  return (
    <div className="flex items-center gap-2.5 lg:gap-4">
      <Link href={"/users/1"}>
        <Avatar className="w-11 h-11 lg:w-15 lg:h-15" costumeSrc={basic} />
      </Link>
      <div className="flex flex-col gap-1">
        <Link href={"/users/1"}>
          <span className="font-semibold lg:text-xl">{nickname}</span>
        </Link>
        <span className="text-sm lg:text-base text-site-darkgray-02">
          {description}
        </span>
      </div>
    </div>
  );
}
