import StudyTimeJandyDateChanger from "./StudyTimeJandyDateChanger";
import StudyTimeJandyList from "./StudyTimeJandyList";
import { Suspense } from "react";
import BasicSkeleton from "@/components/common/skeletons/BasicSkeleton";

interface StudyTimeJandyProps {
  userId: number;
  year: number;
  month: number;
}

export default async function StudyTimeJandy({
  userId,
  year,
  month,
}: StudyTimeJandyProps) {
  return (
    <section className="flex flex-col gap-2 lg:gap-8">
      <StudyTimeJandyDateChanger />
      <Suspense
        key={`Jandy-${year}-${month}`}
        fallback={
          <BasicSkeleton className="col-span-7 h-49 lg:h-54" count={1} />
        }
      >
        <StudyTimeJandyList userId={userId} year={year} month={month} />
      </Suspense>
    </section>
  );
}
