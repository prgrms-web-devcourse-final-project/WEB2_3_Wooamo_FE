import StudyTimeJandyDateChanger from "./StudyTimeJandyDateChanger";
import StudyTimeJandyList from "./StudyTimeJandyList";
import { Suspense } from "react";
import BasicSkeleton from "@/components/common/skeletons/BasicSkeleton";
import JandyDescription from "./JandyDescription";

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
      <div className="w-full flex justify-end items-center gap-1 lg:gap-2">
        <span className="text-xs lg:text-sm">적음</span>
        <JandyDescription description="0시간" className="bg-site-white-50" />
        <JandyDescription description="1초 ~ 2시간" className="bg-[#FBF3B9]" />
        <JandyDescription
          description="2시간 ~ 4시간"
          className="bg-[#FFDCCC]"
        />
        <JandyDescription
          description="4시간 ~ 6시간"
          className="bg-[#FDB7EA]"
        />
        <JandyDescription description="6시간 이상" className="bg-[#B7B1F2]" />
        <span className="text-xs lg:text-sm">많음</span>
      </div>
    </section>
  );
}
