"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";

export default function AddCustume() {
  const { open, close } = useModalStore((state) => state);

  return (
    <>
      <Button onClick={() => open(`add-costume`)}>아이템 등록</Button>

      <Modal modalId={`add-costume`} className="w-180">
        <div className="flex flex-col gap-5">
          <div className="text-xl font-semibold">아이템 등록</div>
          <div className="flex gap-5">
            <div className="w-80 h-80 bg-site-lightgray rounded-2xl flex items-center justify-center">
              이미지 영역
            </div>
            <div className="flex flex-col flex-1 justify-between gap-5">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <label htmlFor="item-name">이름</label>
                  <input
                    id="item-name"
                    type="text"
                    placeholder="아이템 이름을 입력해주세요"
                    className="w-full px-5 py-2 border border-site-lightgray rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="item-point">포인트</label>
                  <input
                    id="item-point"
                    type="text"
                    placeholder="아이템 포인트를 입력해주세요"
                    className="w-full px-5 py-2 border border-site-lightgray rounded-full"
                  />
                </div>
              </div>
              <div>
                <Button className="lg:h-11 lg:text-base">등록하기</Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
