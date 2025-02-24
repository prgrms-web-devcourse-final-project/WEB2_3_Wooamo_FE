import Image from "next/image";
import weekRanking from "@/assets/images/weekRanking.png";
import RankingCard from "./RankingCard";
import EventParties from "./party/EventParties";
import OngoingParties from "./party/OngoingParties";
import { userApi } from "@/api/user/user";

export default async function BeforeLoginHome() {
  const topRankings = await userApi.getTopRanking();
  if (!topRankings) return;

  const [first, second, third] = topRankings?.data;
  return (
    <>
      <section className="flex flex-col justify-center items-center gap-10 lg:gap-24">
        <Image
          className="w-67 h-10"
          src={weekRanking}
          alt="이번 주 공부 랭킹"
        />
        <div className="flex justify-center items-center">
          <RankingCard
            rank={2}
            nickname={second.nickname}
            time={second.studyTime}
            className="translate-x-10 drop-shadow-50 -rotate-6 hover:rotate-0 hover:scale-120 hover:z-30"
          />
          <RankingCard
            rank={1}
            nickname={first.nickname}
            time={first.studyTime}
            className="scale-110 drop-shadow-6.2 -rotate-14 hover:rotate-0 hover:scale-120 z-10 hover:z-30"
          />
          <RankingCard
            rank={3}
            nickname={third.nickname}
            time={third.studyTime}
            className="-translate-x-10 drop-shadow-50 rotate-6 hover:rotate-0 hover:scale-120 hover:z-30"
          />
        </div>
      </section>
      <div className="flex flex-col gap-13 mt-10 lg:mt-24">
        <EventParties />
        <OngoingParties />
      </div>
    </>
  );
}
