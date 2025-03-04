"use client";

import Icon from "@/components/common/Icon";
import { useRef, useState } from "react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useRouter, useSearchParams } from "next/navigation";

export default function StudyTimeJandyDateChanger() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const today = new Date();
  const year = Number(searchParams.get("year")) || today.getFullYear();
  const month = Number(searchParams.get("month")) || today.getMonth() + 1;

  const timer = useRef<NodeJS.Timeout | null>(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date(year, month - 1, 1),
  );

  const selectPrevMonth = () => {
    const prevMonth = new Date(
      selectedDate.setMonth(selectedDate.getMonth() - 1),
    );
    setSelectedDate(prevMonth);

    const year = prevMonth.getFullYear();
    const month = prevMonth.getMonth() + 1;

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      router.push(`?year=${year}&month=${month}`);
    }, 300);
  };
  const selectNextMonth = () => {
    const nextMonth = new Date(
      selectedDate.setMonth(selectedDate.getMonth() + 1),
    );
    setSelectedDate(nextMonth);

    const year = nextMonth.getFullYear();
    const month = nextMonth.getMonth() + 1;

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      router.push(`?year=${year}&month=${month}`);
    }, 300);
  };
  return (
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
  );
}
