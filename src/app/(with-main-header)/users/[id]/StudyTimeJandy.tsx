import { timerApi } from "@/api/timer/timer";
import Icon from "@/components/common/Icon";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function StudyTimeJandy() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [studyTimes, setStudyTimes] = useState<studyTimeType[]>([]);

  const selectPrevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)),
    );
  };
  const selectNextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)),
    );
  };

  useEffect(() => {
    const fetchStudyTimeForMonth = async () => {
      const res = await timerApi.getStudyTimeForMonth();
      if (res?.status === "성공") {
        setStudyTimes(res.data);
      }
    };

    fetchStudyTimeForMonth();
  }, [selectedDate]);

  return (
    <section className="flex flex-col gap-2 lg:gap-8">
      <div className="flex justify-between items-center">
        <p className="font-semibold">공부 시간</p>
        <div className="flex items-center gap-4">
          <button onClick={selectPrevMonth}>
            <Icon MuiIcon={ChevronLeftRoundedIcon} />
          </button>
          <span className="font-semibold">
            {selectedDate.getFullYear()}년
            {String(selectedDate.getMonth() + 1).padStart(2, "0")}월
          </span>
          <button onClick={selectNextMonth}>
            <Icon MuiIcon={ChevronRightRoundedIcon} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 auto-cols-auto gap-1 lg:gap-2">
        {studyTimes.map((studyTime) => (
          <div
            key={studyTime.studyDate}
            className={twMerge(
              "w-full h-9 bg-transparent",
              Number(studyTime.studyTime.split(":")[2]) >= 1 && "bg-[#C0D9EF]",
              Number(studyTime.studyTime.split(":")[0]) >= 2 && "bg-[#9EC1E2]",
              Number(studyTime.studyTime.split(":")[0]) >= 4 && "bg-[#5D8FC8]",
              Number(studyTime.studyTime.split(":")[0]) >= 6 && "bg-site-main",
            )}
          ></div>
        ))}
      </div>
    </section>
  );
}
