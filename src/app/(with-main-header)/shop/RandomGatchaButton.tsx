"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import Character from "@/components/common/Character";
import { shopApi } from "@/api/shop/shop";
import { useState } from "react";
import Image from "next/image";
import gotchaBall from "@/assets/images/gotchaBall.png";
import { twMerge } from "tailwind-merge";
import { revalidateTagAction } from "@/actions";

export default function RandomGachaButton({
  currentUserPoint,
}: {
  currentUserPoint: number;
}) {
  const { open, close } = useModalStore((state) => state);
  const [costumeName, setCostumeName] = useState<string>("");
  const [costumeImage, setCostumeImage] = useState<string>("");
  const [isGotchaing, setIsGotchaing] = useState<boolean>(false);

  const handlePurchaseRandomCostume = async (point = 300) => {
    setIsGotchaing(true);

    setTimeout(async () => {
      const purchaseCostume = await shopApi.postCostumeRandomPurchase(point);

      if (purchaseCostume?.status === "성공") {
        setCostumeName(purchaseCostume.data.costumeName);
        setCostumeImage(purchaseCostume.data.image);
        open("random-gacha");
        revalidateTagAction(`costume-update`);
      }
      setIsGotchaing(false);
    }, 5000);
  };

  return (
    <>
      <Image
        src={gotchaBall}
        alt="가챠를 할 때 사용되는 공 이미지"
        className={twMerge(
          "absolute bottom-0 lg:bottom-4 fill-mode-forwards invisible",
          isGotchaing && "animate-random-gotcha visible",
        )}
      />
      <Button
        onClick={() => handlePurchaseRandomCostume(300)}
        disabled={isGotchaing || currentUserPoint < 300}
        className="bg-site-sub"
      >
        {isGotchaing ? "뽑는 중..." : "랜덤뽑기 300p"}
      </Button>

      <Modal modalId="random-gacha">
        <div className="flex flex-col items-center gap-8">
          <Character costumeSrc={costumeImage} />
          <div className="font-galmuri text-xl lg:text-2xl w-fit text-center">
            <p>{costumeName}에 당첨되었다</p>
            <p>기쁘다!</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
