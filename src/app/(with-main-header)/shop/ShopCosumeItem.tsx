"use client";

import { useModalStore } from "@/store/modalStore";
import Image, { StaticImageData } from "next/image";
import Modal from "../../../components/common/Modal";
import Character from "../../../components/common/Character";

interface ShopCostumeItemProps {
  costume: StaticImageData;
  index: number;
}

export default function ShopCostumeItem({
  costume,
  index,
}: ShopCostumeItemProps) {
  const { open, close } = useModalStore((state) => state);
  return (
    <>
      <button
        onClick={() => open(`shop-costume-preview${index}`)}
        className="flex items-end w-56 h-60"
      >
        <article className="w-56 h-56 bg-site-white-70 rounded-[10px] relative">
          <div className="flex justify-center items-center absolute -top-7.5 right-0 w-fit px-6 h-15 bg-site-sub rounded-full">
            <span className="font-galmuri text-xl">300p</span>
          </div>
          <Image src={costume} alt="코스튬 입은 아바타 미리보기 이미지" />
        </article>
      </button>

      <Modal modalId={`shop-costume-preview${index}`}>
        <Character costumeSrc={costume} className="h-60" />
        <p className="text-2xl font-galmuri text-center mt-10">
          코스튬 미리보기
        </p>
      </Modal>
    </>
  );
}
