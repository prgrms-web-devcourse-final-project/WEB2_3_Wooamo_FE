import Image from "next/image";
import AvatarImg from "@/assets/images/avatar.png";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface RankingCardProps {
  rank: number;
  nickname: string;
  time: string;
  className?: string;
}

export default function RankingCard({
  rank,
  nickname,
  time,
  className,
}: RankingCardProps) {
  return (
    <Link href="/users/1">
      <article
        className={twMerge(
          "flex flex-col justify-end items-center gap-4 relative w-52.5 h-68 p-4 bg-site-button border-5 border-white rounded-[10px] transition-all",
          className,
        )}
      >
        <div className="flex justify-center items-center absolute top-2 left-2 w-16 h-16 bg-site-bg rounded-full">
          <span className="font-bitbitv2 text-2xl text-site-darkgray-02">
            {rank}등
          </span>
        </div>
        <div className="flex justify-center w-34 h-34 rounded-full bg-site-profile">
          <Image
            className="scale-75 object-contain"
            src={AvatarImg}
            alt="내 아바타 이미지"
          />
        </div>
        <div className="flex flex-col gap-2 items-center w-full h-17 font-galmuri bg-site-profile">
          <p className="text-xl">{nickname}</p>
          <p className="text-site-darkgray-01 text-sm">{time}</p>
        </div>
      </article>
    </Link>
  );
}
