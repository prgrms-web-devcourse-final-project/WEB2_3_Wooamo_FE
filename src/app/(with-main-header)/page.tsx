import Image from "next/image";
import weekRanking from "@/assets/images/weekRanking.png";
import RankingCard from "../RankingCard";
import EventParties from "./party/EventParties";
import OngoingParties from "./party/OngoingParties";

export default function Home() {
  return (
    <>
      <section className="flex flex-col justify-center items-center gap-24">
        <Image
          className="w-67 h-10"
          src={weekRanking}
          alt="이번 주 공부 랭킹"
        />
        <div className="flex justify-center items-center">
          <RankingCard
            rank={2}
            nickname={"@stuv_2nd"}
            time={"46:49:00"}
            className="translate-x-10 -rotate-6 hover:scale-105"
          />
          <RankingCard
            rank={1}
            nickname={"@stuv_1st"}
            time={"46:49:00"}
            className="-rotate-14 z-10 scale-110 drop-shadow-[0_4px_6px_rgb(140,205,243)] hover:scale-115"
          />
          <RankingCard
            rank={3}
            nickname={"@stuv_3rd"}
            time={"46:49:00"}
            className="-translate-x-10 rotate-6 hover:scale-105"
          />
        </div>
      </section>
      <div className="flex flex-col gap-13 mt-24">
        <EventParties />
        <OngoingParties />
      </div>
    </>
  );
}
