import TimerCategory from "./TimerCategory";
import { timerApi } from "@/api/timer/timer";
import TimerList from "./TimerList";
import { Suspense } from "react";
import BasicSkeleton from "@/components/common/skeletons/BasicSkeleton";

export default async function Timer() {
  const fetchTimerList = await timerApi.getTimerList();
  const timerList = fetchTimerList?.data;

  if (!timerList) return;
  return (
    <section className="w-full lg:w-120 flex flex-col gap-4">
      <TimerCategory timerList={timerList} />
      <Suspense fallback={<BasicSkeleton className="h-66 lg:h-76" count={1} />}>
        <TimerList timerList={timerList} />
      </Suspense>
    </section>
  );
}
