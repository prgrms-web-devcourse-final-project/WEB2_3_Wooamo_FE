"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import Character from "@/components/common/Character";
import basic from "@/assets/images/costumes/basic.png";

export default function RandomGachaButton() {
  const { open, close } = useModalStore((state) => state);

  return (
    <>
      <Button onClick={() => open("random-gacha")} className="bg-site-sub">
        랜덤뽑기 100p
      </Button>

      <Modal modalId="random-gacha">
        <div className="flex flex-col items-center gap-8">
          <Character costumeSrc={basic} />
          <div className="font-galmuri text-xl lg:text-2xl w-fit text-center">
            <p>기본 코스튬에 당첨되었다</p>
            <p>기쁘다!</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
