"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import Image, { StaticImageData } from "next/image";

interface ShopCostumeItemProps {
  costume: StaticImageData;
  index: number;
}

export default function CostumeItem({ costume, index }: ShopCostumeItemProps) {
  const { open, close } = useModalStore((state) => state);
  return (
    <>
      <article
        className="w-56 h-56 bg-site-white-70 rounded-[10px] relative"
        onClick={() => open(`custuem-item${index}`)}
      >
        <div className="flex justify-center items-center absolute -top-7.5 right-0 w-fit px-6 h-15 bg-site-sub rounded-full">
          <span className="font-galmuri text-xl">300p</span>
        </div>
        <Image src={costume} alt="코스튬 입은 아바타 미리보기 이미지" />
      </article>

      <Modal modalId={`custuem-item${index}`} className="w-150">
        <div className="flex gap-5">
          <div className="w-60 h-60 bg-site-button-input rounded-xl flex justify-center items-center">
            <Image
              src={costume}
              alt="코스튬 입은 아바타 미리보기 이미지"
              className="w-50 h-50"
            />
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
            <div className="flex gap-5">
              <Button className="lg:h-11 lg:text-base">삭제하기</Button>
              <Button className="lg:h-11 lg:text-base">등록하기</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
