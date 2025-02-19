"use client";

import { useEffect, useState } from "react";
import CreatePartyButton from "./CreatePartyButton";
import Input from "@/components/common/Input";
import { DatePicker } from "@/components/ui/datePicker";

export default function PartyCreate() {
  const today = new Date();
  const tomorrow = new Date(today).setDate(today.getDate() + 1);

  const [title, setTitle] = useState("");
  const [maxPeople, setMaxPeople] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(tomorrow));
  const [minBetting, setMinBetting] = useState(0);

  useEffect(() => {
    const newEndDate = new Date(startDate).setDate(startDate.getDate() + 1);
    setEndDate(new Date(newEndDate));
  }, [startDate]);
  return (
    <form className="flex flex-col gap-13">
      <div className="flex justify-end h-15">
        <CreatePartyButton />
      </div>
      <div className="flex items-center h-20 border-b border-site-darkgray-02">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-transparent"
          placeholder="게시글 제목을 입력해주세요"
        />
      </div>
      <textarea
        className="min-h-50 bg-site-white-70 px-6 py-5 resize-none"
        spellCheck="false"
        placeholder={`팟 인원 수, 수행 퀘스트 등 팟에 대해 설명해주세요!
  *인증 방식은 무조건 이미지 업로드를 통해서만 가능합니다`}
      />
      <div className="flex items-center gap-13">
        <div className="flex items-center gap-5">
          <label htmlFor="max-people" className="font-semibold text-xl">
            인원
          </label>
          <Input
            id="max-people"
            type="number"
            value={String(maxPeople)}
            onChange={(e) => setMaxPeople(Number(e.target.value))}
            className="w-80 text-base"
            min={1}
            max={100}
            placeholder="최대 인원을 정해주세요! (최대 100명)"
            required
          />
        </div>

        <div className="flex items-center gap-13">
          <div className="flex items-center gap-5">
            <label htmlFor="date" className="font-semibold text-xl">
              기간
            </label>
            <div className="flex items-center gap-1">
              <DatePicker
                value={startDate}
                fromDate={new Date()}
                onChange={(date) => setStartDate(date)}
              />
              <span>-</span>
              <DatePicker
                value={endDate}
                fromDate={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <label htmlFor="min-betting" className="font-semibold text-xl">
            배팅
          </label>
          <Input
            id="min-betting"
            type="number"
            value={String(minBetting)}
            onChange={(e) => setMinBetting(Number(e.target.value))}
            className="w-80 text-base"
            min={0}
            placeholder="최소 배팅 포인트를 정해주세요!"
            required
          />
        </div>
      </div>
    </form>
  );
}
