import { timerApi } from "@/api/timer/timer";
import { userApi } from "@/api/user/user";
import Character from "@/components/common/Character";

export default async function UserCard() {
  const user = await userApi.getCurrentUserInfo();
  const ranking = await userApi.getCurrentUserRanking();
  const studyTimeForWeek = await timerApi.getStudyTimeForWeek();
  if (!user || !ranking || !studyTimeForWeek) return;
  return (
    <section className="flex justify-center">
      <div className="flex gap-4 lg:gap-10 items-center w-full lg:w-130 px-5 py-7 bg-site-button rounded-lg border-4 border-site-white-100">
        <div className="bg-site-profile rounded-full relative overflow-hidden">
          <Character
            costumeSrc={user.data.profile}
            className="w-24 lg:w-45 h-24 lg:h-45 -translate-y-3 lg:-translate-y-5"
          />
        </div>
        <div className="flex flex-col gap-2.5 lg:gap-5 font-galmuri text-xl lg:text-2xl">
          <div className="font-bitbitv2 text-2xl lg:text-[28px]">
            {user.data.nickname}
          </div>
          <div className="flex gap-2">
            <div>공부 시간</div>
            <div className="text-site-darkgray-02">
              {studyTimeForWeek.data.studyTime}
            </div>
          </div>
          <div className="flex gap-2">
            <div>랭킹</div>
            <div className="text-site-darkgray-02">
              {ranking.data.ranking}등
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
