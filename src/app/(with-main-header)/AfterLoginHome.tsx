import Image from "next/image";
import weekRanking from "@/assets/images/weekRanking.png";
import RankingCard from "./RankingCard";
import UserCard from "./UserCard";
import Timer from "./Timer";
import TodoList from "./TodoList";

export default function AfterLoginHome() {
  return (
    <div className="flex gap-30 justify-center">
      <div className="flex flex-col gap-15">
        <UserCard />
        <section className="flex flex-col justify-center items-center gap-10 lg:gap-24">
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
              className="translate-x-10 drop-shadow-50 -rotate-6 hover:rotate-0 hover:scale-120 hover:z-30"
            />
            <RankingCard
              rank={1}
              nickname={"@stuv_1st"}
              time={"46:49:00"}
              className="scale-110 drop-shadow-6.2 -rotate-14 hover:rotate-0 hover:scale-120 z-10 hover:z-30"
            />
            <RankingCard
              rank={3}
              nickname={"@stuv_3rd"}
              time={"46:49:00"}
              className="-translate-x-10 drop-shadow-50 rotate-6 hover:rotate-0 hover:scale-120 hover:z-30"
            />
          </div>
        </section>
      </div>
      <div className="flex flex-col gap-10">
        <Timer />
        <TodoList />
      </div>
    </div>
  );
}
