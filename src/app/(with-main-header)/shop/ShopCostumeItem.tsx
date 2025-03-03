"use client";

import { useModalStore } from "@/store/modalStore";
import Image from "next/image";
import Modal from "../../../components/common/Modal";
import Character from "../../../components/common/Character";
import Button from "@/components/common/Button";
import { shopApi } from "@/api/shop/shop";
import { useToastStore } from "@/store/toastStore";

interface ShopCostumeItemProps {
  costumeId: number;
  name: string;
  costume: string;
  point: number;
  currentUserPoint: number;
}

export default function ShopCostumeItem({
  costumeId,
  name,
  costume,
  point,
  currentUserPoint,
}: ShopCostumeItemProps) {
  const { open, close } = useModalStore((state) => state);
  const showToast = useToastStore((state) => state.showToast);

  const handlePurchaseCostume = async (costumeId: number, point: number) => {
    if (!costumeId) return showToast("코스튬 정보가 없습니다.");
    if (currentUserPoint - point < 0) {
      close();
      return showToast("포인트가 부족합니다.");
    }

    const purchaseCostume = await shopApi.postCostumePurchase({
      costumeId,
      point,
    });

    if (purchaseCostume?.status === "성공") {
      showToast("코스튬 구매에 성공했습니다.");
    } else {
      showToast("코스튬 구매에 실패했습니다.");
    }
    close();
  };

  return (
    <>
      <button
        onClick={() => open(`shop-costume-preview${costumeId}`)}
        className="aspect-square w-full max-w-56 hover:drop-shadow-6.2 transition-all"
      >
        <article className="w-full h-full bg-site-white-70 rounded-[10px] relative">
          <div className="flex justify-center items-center absolute -top-7.5 right-0 w-fit px-4 lg:px-6 h-11 lg:h-15 bg-site-sub rounded-full">
            <span className="font-galmuri text-base lg:text-xl">{point}p</span>
          </div>
          <div className="relative w-full h-full">
            <Image
              src={costume}
              alt={name}
              className="object-contain"
              fill
              sizes=""
            />
          </div>
        </article>
      </button>
      <Modal modalId={`shop-costume-preview${costumeId}`}>
        <div className="flex flex-col gap-5">
          <div className="flex justify-center font-galmuri text-xl">{name}</div>
          <Character costumeSrc={costume} className="h-60" />
          <div className="flex justify-center">
            <Button onClick={() => handlePurchaseCostume(costumeId, point)}>
              구매하기
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
