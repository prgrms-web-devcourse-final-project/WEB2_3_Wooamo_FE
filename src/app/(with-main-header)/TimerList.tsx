import { timerApi } from "@/api/timer/timer";
import TimerItem from "./TimerItem";

interface TimerListProps {
  timerList: TimerCategoryType[];
}

export default async function TimerList({ timerList }: TimerListProps) {
  const fetchStudyTimeForDaily = await timerApi.getStudyTimeForDaily();
  const studyTimeForDaily = fetchStudyTimeForDaily?.data;

  return (
    <div className="px-3 py-3 bg-site-button rounded-lg">
      <div className="flex justify-center items-center gap-7 mt-2 lg:mt-3 mb-5 lg:mb-6">
        <p className="w-34 text-[32px] text-site-darkgray-02 font-galmuri">
          {studyTimeForDaily?.studyTime || "00:00:00"}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {timerList.map((timer) => (
          <TimerItem
            key={timer.categoryId}
            categoryId={timer.categoryId}
            name={timer.name}
            studyDate={timer.studyDate}
            studyTime={timer.studyTime}
          />
        ))}
      </div>
    </div>
  );
}
