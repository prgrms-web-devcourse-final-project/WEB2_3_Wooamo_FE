import { delay } from "@/utils/delay";
import Jandy from "./Jandy";
import { timerApi } from "@/api/timer/timer";

interface StudyTimeJandyListProps {
  year: number;
  month: number;
}

export default async function StudyTimeJandyList({
  year,
  month,
}: StudyTimeJandyListProps) {
  await delay(5000);
  const studyTimes = await timerApi.getStudyTimeForMonth(year, month);

  if (!studyTimes) return;
  return (
    <div className="grid grid-cols-7 auto-rows-auto gap-1 lg:gap-2">
      {studyTimes.data.map((studyTime) => (
        <Jandy
          key={`${studyTime.studyDate}-${studyTime.studyTime}`}
          studyTime={studyTime}
        />
      ))}
    </div>
  );
}
