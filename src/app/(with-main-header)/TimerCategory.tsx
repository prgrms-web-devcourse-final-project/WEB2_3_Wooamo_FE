"use client";

import Icon from "@/components/common/Icon";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import Button from "@/components/common/Button";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { timerApi } from "@/api/timer/timer";
import { revalidateTagAction } from "../actions";

interface TimerCategoryProps {
  timerList: TimerCategoryType[];
}

export default function TimerCategory({ timerList }: TimerCategoryProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [category, setCategory] = useState("");

  const addCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    setCategory(category);
  };

  const handleCategoryAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category) {
      const request = await timerApi.postTimerCategoryAdd(category);

      if (request?.status === "성공") {
        revalidateTagAction("timer-list");
        setCategory("");
        setIsClicked((prev) => !prev);
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsClicked((prev) => !prev)}
        className="flex items-center gap-1 lg:gap-3 px-4 lg:px-5 py-3 lg:py-4 bg-site-sub rounded-full lg:text-xl font-galmuri"
      >
        <span>카테고리</span>
        <Icon MuiIcon={ArrowDropDownRoundedIcon} />
      </button>
      <div
        className={twMerge(
          `w-75 lg:w-110 p-2.5 pt-6 lg:px-5 lg:py-4 bg-site-sub rounded-lg flex flex-col gap-4 lg:gap-5 absolute top-18`,
          isClicked ? "flex" : "hidden",
        )}
      >
        <ul className="lg:text-xl font-semibold flex flex-col gap-2.5 lg:gap-3 px-4 lg:px-0">
          {timerList.map((timer) => (
            <li key={timer.categoryId}>{timer.name}</li>
          ))}
        </ul>
        <form onSubmit={handleCategoryAdd} className="flex gap-2">
          <label htmlFor="add-category" className="hidden">
            카테고리 추가
          </label>
          <input
            id="add-category"
            type="text"
            value={category}
            placeholder="카테고리를 추가해주세요"
            className="w-full px-4 py-2.5 lg:py-4 bg-site-white-70 rounded-full"
            onChange={addCategory}
          />
          <Button type="submit" className="min-w-fit">
            추가
          </Button>
        </form>
      </div>
    </div>
  );
}
