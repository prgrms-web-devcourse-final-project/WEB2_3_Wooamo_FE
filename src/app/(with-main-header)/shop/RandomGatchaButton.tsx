"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import Character from "@/components/common/Character";
import basic from "@/assets/images/costumes/basic.png";
import { shopApi } from "@/api/shop/shop";
import { useState } from "react";

export default function RandomGachaButton() {
  const { open, close } = useModalStore((state) => state);
  const [costumeName, setCostumeName] = useState<string>("");
  const [costumeImage, setCostumeImage] = useState<string>("");

  const handlePurchaseRandomCostume = async (point = 100) => {
    if (!point) return;
    const purchaseCostume = await shopApi.postCostumeRandomPurchase(point);

    if (purchaseCostume?.status === "성공") {
      setCostumeName(purchaseCostume.data.costumeName);
      setCostumeImage(purchaseCostume.data.image);
      open("random-gacha");
    }
  };

  return (
    <>
      <Button
        onClick={() => handlePurchaseRandomCostume(100)}
        className="bg-site-sub"
      >
        랜덤뽑기 100p
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
