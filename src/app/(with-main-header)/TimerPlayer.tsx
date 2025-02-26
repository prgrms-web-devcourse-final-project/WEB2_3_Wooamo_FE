"use client";

import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import StopCircleRoundedIcon from "@mui/icons-material/StopCircleRounded";
import Icon from "../../components/common/Icon";
import { timerApi } from "@/api/timer/timer";
import { useEffect, useState } from "react";

export default function TimerPlayer() {
  const [studyTimeForDaily, setStudyTimeForDaily] = useState<string>();

  useEffect(() => {
    const fetchStudyTimerForDailyFunc = async () => {
      const fetchStudyTimeForDaily = await timerApi.getStudyTimeForDaily();

      if (fetchStudyTimeForDaily?.status === "성공") {
        const studyTimeData = fetchStudyTimeForDaily.data;
        setStudyTimeForDaily(studyTimeData.studyTime);
      }
    };

    fetchStudyTimerForDailyFunc();
  }, []);

  return (
    <div className="flex justify-center items-center gap-7 mt-2 lg:mt-3 mb-5 lg:mb-6">
      <p className="text-[32px] text-site-darkgray-02 font-galmuri">
        {studyTimeForDaily}
      </p>
      <div className="flex items-center gap-3">
        <Icon MuiIcon={PlayCircleFilledRoundedIcon} />
        <Icon MuiIcon={StopCircleRoundedIcon} />
      </div>
    </div>
  );
}
