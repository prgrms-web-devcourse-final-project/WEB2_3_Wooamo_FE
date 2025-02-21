import { twMerge } from "tailwind-merge";
import Link from "next/link";
import Character from "@/components/common/Character";
import basic from "@/assets/images/costumes/basic.png";

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
          "flex flex-col justify-end items-center gap-3 lg:gap-4 relative w-32 lg:w-52.5 h-41 lg:h-68 p-2 pt-4 lg:p-4 bg-site-button border-5 border-white rounded-[10px] transition-all",
          className,
        )}
      >
        <div className="flex justify-center items-center absolute top-1 lg:top-2 left-1 lg:left-2 w-10 lg:w-16 h-10 lg:h-16 bg-site-bg rounded-full">
          <span className="font-bitbitv2 text-base lg:text-2xl text-site-darkgray-02">
            {rank}등
          </span>
        </div>
        <div className="flex justify-center items-center w-20 lg:w-34 h-20 lg:h-34 rounded-full bg-site-profile">
          <Character className="scale-90 -translate-y-2" costumeSrc={basic} />
        </div>
        <div className="flex flex-col gap-0 lg:gap-2 items-center w-full h-17 font-galmuri bg-site-profile">
          <p className="font-normal lg:text-xl">{nickname}</p>
          <p className="text-site-darkgray-01 text-xs lg:text-sm">{time}</p>
        </div>
      </article>
    </Link>
  );
}
