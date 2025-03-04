import { delay } from "@/utils/delay";
import Jandy from "./Jandy";
import { timerApi } from "@/api/timer/timer";

interface StudyTimeJandyListProps {
  userId: number;
  year: number;
  month: number;
}

export default async function StudyTimeJandyList({
  userId,
  year,
  month,
}: StudyTimeJandyListProps) {
  delay(3000);
  const studyTimes = await timerApi.getStudyTimeForMonth(userId, year, month);
  if (!studyTimes) return;
  return (
    <div className="grid grid-cols-7 auto-rows-auto gap-1 lg:gap-2">
      {studyTimes.data.map((studyTime) => (
        <Jandy key={studyTime.studyDate} studyTime={studyTime} />
      ))}
    </div>
  );
}
