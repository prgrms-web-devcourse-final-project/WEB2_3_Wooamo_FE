"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { DatePicker } from "@/components/ui/datePicker";
import { useModalStore } from "@/store/modalStore";
import { useState } from "react";

export default function AddEvent() {
  const today = new Date();
  const tomorrow = new Date(today).setDate(today.getDate() + 1);
  const { open, close } = useModalStore((state) => state);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(tomorrow));
  return (
    <>
      <Button onClick={() => open(`add-event`)}>이벤트 등록</Button>

      <Modal modalId={`add-event`} className="w-190">
        <div className="flex flex-col gap-5">
          <div className="text-xl font-semibold">이벤트 등록</div>
          <div className="flex gap-5">
            <div className="flex flex-1 flex-col gap-5">
              <div>
                <label htmlFor="title" className="hidden"></label>
                <input
                  id="title"
                  type="text"
                  placeholder="이벤트 제목을 입력해주세요"
                  className="w-full border-b border-b-site-darkgray-01 px-4 py-2"
                />
              </div>
              <div>
                <label htmlFor="description" className="hidden">
                  이벤트 설명
                </label>
                <textarea
                  placeholder="이벤트에 대한 설명을 작성해주세요"
                  className="w-full h-25 resize-none border border-site-lightgray rounded-2xl px-4 py-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="headcount">인원</label>
                <input
                  id="headcount"
                  type="text"
                  placeholder="인원을 입력해주세요"
                  className="w-full border border-site-lightgray rounded-2xl px-4 py-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="period">기간</label>
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
              <div className="flex flex-col gap-2">
                <label htmlFor="point">포인트</label>
                <input
                  id="point"
                  type="text"
                  placeholder="사용자들이 배팅할 포인트를 입력해주세요"
                  className="w-full border border-site-lightgray rounded-2xl px-4 py-2"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <div className="w-80 h-80 bg-site-lightgray rounded-2xl flex items-center justify-center">
                이미지 영역
              </div>
              <Button className="lg:h-11 lg:text-base">등록하기</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
