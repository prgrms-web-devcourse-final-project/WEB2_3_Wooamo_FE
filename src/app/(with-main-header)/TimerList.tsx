"use client";

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";
import { useState } from "react";
import Dropdown from "@/components/common/Dropdown";
import { timerApi } from "@/api/timer/timer";
import { revalidateTagAction } from "../actions";

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

  const deleteCategory = async (categoryId: number) => {
    const response = await timerApi.deleteTimerCategory(categoryId);
    if (response?.status === "성공") {
      revalidateTagAction("timer-list");
      setIsOpen(false);
    }
  };

  return (
    <div className="flex justify-between px-2.5 lg:px-7 py-4 bg-site-white-100">
      <div className="flex gap-3 items-center">
        <div className="text-xl">{name}</div>
      </div>
      <div className="flex items-center gap-3 relative">
        <div className="text-xl">{studyTime}</div>
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
