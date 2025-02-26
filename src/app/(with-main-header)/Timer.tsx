import TimerList from "./TimerList";
import TimerCategory from "./TimerCategory";
import TimerPlayer from "./TimerPlayer";
import { timerApi } from "@/api/timer/timer";

export default async function Timer() {
  const fetchTimerList = await timerApi.getTimerList();
  const timerList = fetchTimerList?.data;

  if (!timerList) return;

  return (
    <section className="w-full lg:w-120 flex flex-col gap-4">
      <TimerCategory timerList={timerList} />
      <div className="px-3 py-3 bg-site-button rounded-lg">
        <TimerPlayer />
        <div className="flex flex-col gap-3">
          {timerList.map((timer) => (
            <TimerList
              key={timer.timerId}
              timerId={timer.timerId}
              categoryId={timer.categoryId}
              name={timer.name}
              studyDate={timer.studyDate}
              studyTime={timer.studyTime}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
