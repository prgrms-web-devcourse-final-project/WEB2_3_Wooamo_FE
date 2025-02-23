import OrangeTurtle from "@/assets/images/costumes/orangeTurtle.png";
import Image from "next/image";

interface ParticipantItemProps {
  profile: string;
  nickname: string;
  auth: string;
  isAuth: string;
}

export default function ParticipantItem({
  profile,
  nickname,
  auth,
  isAuth,
}: ParticipantItemProps) {
  return (
    <div className="w-40 px-5 py-5 bg-site-white-50 rounded-sm flex flex-col gap-4 items-center">
      <div className="w-18 h-18 bg-site-white-100 rounded-full">
        <Image src={profile} alt="사용자 아바타 이미지" />
      </div>
      <div className="text-xs font-galmuri line-clamp-2">@{nickname}</div>
    </div>
  );
}
