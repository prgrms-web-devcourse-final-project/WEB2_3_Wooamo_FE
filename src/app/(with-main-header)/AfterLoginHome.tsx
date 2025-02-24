import Image from "next/image";
import weekRanking from "@/assets/images/weekRanking.png";
import RankingCard from "./RankingCard";
import UserCard from "./UserCard";
import Timer from "./Timer";
import TodoList from "./TodoList";
import WhiteDividerShort from "@/assets/images/WhiteDividerShort.svg";
import { userApi } from "@/api/user/user";

export default async function AfterLoginHome() {
  const topRankings = await userApi.getTopRanking();
  if (!topRankings) return;

  const [first, second, third] = topRankings?.data;
  return (
    <div className="flex flex-col lg:flex-row gap-30 justify-center px-5 lg:px-0">
      <div className="flex flex-col gap-15">
        <UserCard />
        <section className="flex flex-col justify-center items-center gap-10 lg:gap-24">
          <Image
            className="w-60 lg:w-67 h-9 lg:h-10"
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
      </div>
      <div className="flex flex-col items-center gap-13">
        <Timer />
        <Image src={WhiteDividerShort} alt="구분선 이미지" />
        <TodoList />
      </div>
    </div>
  );
}
