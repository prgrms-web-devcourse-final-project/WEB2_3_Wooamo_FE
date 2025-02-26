"use client";

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import Dropdown from "@/components/common/Dropdown";
import { timerApi } from "@/api/timer/timer";
import { revalidateTagAction } from "../actions";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import StopCircleRoundedIcon from "@mui/icons-material/StopCircleRounded";
import { useTimerStore } from "@/store/timerStore";

interface TimerListProps {
  timerId: number;
  categoryId: number;
  name: string;
  studyDate: string;
  studyTime: string;
}

export default function TimerList({
  timerId,
  categoryId,
  name,
  studyDate,
  studyTime,
}: TimerListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isRunning,
    currentCategoryId,
    timers,
    startTimer,
    setIsRunning,
    setCurrentCategoryId,
    setTimer,
    setIntervalId,
    initializeTimer,
  } = useTimerStore();

  useEffect(() => {
    if (
      !timers[categoryId] &&
      (!isRunning || currentCategoryId !== categoryId)
    ) {
      initializeTimer(categoryId);
    }
  }, [categoryId, timers, isRunning, currentCategoryId, initializeTimer]);

  const saveStudyTime = async (categoryId: number) => {
    const currentTime = timers[categoryId]?.time || "00:00:00";
    await timerApi.postStudyTimeSave(categoryId, currentTime);
    revalidateTagAction("timer-list");
    revalidateTagAction("daily-time");
  };

  const handleStartTimer = () => {
    if (isRunning && currentCategoryId !== categoryId) return;

    setIsRunning(true);
    setCurrentCategoryId(categoryId);
    startTimer(categoryId);

    setTimer(categoryId, studyTime);

    const currentTimer = timers[categoryId];
    if (currentTimer?.lastStartTime) {
      const elapsedSeconds = Math.floor(
        (Date.now() - currentTimer.lastStartTime) / 1000,
      );
      if (elapsedSeconds > 0) {
        setTimer(categoryId, (prevTime) => {
          const [hours, minutes, seconds] = prevTime.split(":").map(Number);
          const totalSeconds =
            hours * 3600 + minutes * 60 + seconds + elapsedSeconds;
          const newHours = Math.floor(totalSeconds / 3600);
          const newMinutes = Math.floor((totalSeconds % 3600) / 60);
          const newSeconds = totalSeconds % 60;

          return `${String(newHours).padStart(2, "0")}:${String(
            newMinutes,
          ).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
        });
      }
    }

    const interval = setInterval(() => {
      setTimer(categoryId, (prevTime) => {
        const [hours, minutes, seconds] = prevTime.split(":").map(Number);
        let newSeconds = seconds + 1;
        let newMinutes = minutes;
        let newHours = hours;

        if (newSeconds === 60) {
          newSeconds = 0;
          newMinutes += 1;
        }
        if (newMinutes === 60) {
          newMinutes = 0;
          newHours += 1;
        }

        if (newMinutes % 5 === 0 && newSeconds === 0) {
          saveStudyTime(categoryId);
        }

        return `${String(newHours).padStart(2, "0")}:${String(
          newMinutes,
        ).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
      });
    }, 1000);

    setIntervalId(categoryId, interval);
  };

  const handleStopTimer = async () => {
    const currentTimer = timers[categoryId];
    if (currentTimer?.intervalId) {
      clearInterval(currentTimer.intervalId);
      setIntervalId(categoryId, null);
    }
    setIsRunning(false);
    setCurrentCategoryId(null);
    await saveStudyTime(categoryId);
  };

  const deleteCategory = async (categoryId: number) => {
    const response = await timerApi.deleteTimerCategory(categoryId);
    if (response?.status === "성공") {
      revalidateTagAction("timer-list");
      revalidateTagAction("daily-time");
      setIsOpen(false);
    }
  };

  return (
    <div className="flex justify-between px-2.5 lg:px-7 py-4 bg-site-white-100">
      <div className="flex gap-3 items-center">
        <div className="flex w-6">
          {!isRunning && (
            <Button
              onClick={handleStartTimer}
              className="px-0 lg:px-0 bg-transparent"
            >
              <Icon MuiIcon={PlayCircleFilledRoundedIcon} />
            </Button>
          )}
          {isRunning && currentCategoryId === categoryId && (
            <Button
              onClick={handleStopTimer}
              className="px-0 lg:px-0 bg-transparent"
            >
              <Icon MuiIcon={StopCircleRoundedIcon} />
            </Button>
          )}
        </div>
        <div className="text-xl">{name}</div>
      </div>
      <div className="flex items-center gap-3 relative">
        <div className="text-xl">
          {currentCategoryId === categoryId && isRunning
            ? timers[categoryId]?.time
            : studyTime}
        </div>
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-transparent lg:px-0"
        >
          <Icon MuiIcon={MoreHorizRoundedIcon} />
        </Button>
        {isOpen && (
          <Dropdown
            onClose={() => {
              setIsOpen(false);
            }}
          >
            <Button
              onClick={() => deleteCategory(categoryId)}
              className="w-full"
            >
              삭제
            </Button>
          </Dropdown>
        )}
      </div>
    </div>
  );
}
