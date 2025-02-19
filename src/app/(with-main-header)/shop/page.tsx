import Image from "next/image";
import gachaMachine from "@/assets/images/gachaMachine.png";
import ChargeButton from "./ChargeButton";
import RandomGachaButton from "./RandomGatchaButton";

import basic from "@/assets/images/costumes/basic.png";
import banana from "@/assets/images/costumes/banana.png";
import dinosaur from "@/assets/images/costumes/dinosaur.png";
import orangeTurtle from "@/assets/images/costumes/orangeTurtle.png";
import panda from "@/assets/images/costumes/panda.png";
import rollCake from "@/assets/images/costumes/rollCake.png";
import strawberryMilk from "@/assets/images/costumes/strawberryMilk.png";
import swimsuit from "@/assets/images/costumes/swimsuit.png";
import western from "@/assets/images/costumes/western.png";
import ShopCostumeItem from "./ShopCosumeItem";

const costumes = [
  basic,
  banana,
  dinosaur,
  orangeTurtle,
  panda,
  rollCake,
  strawberryMilk,
  swimsuit,
  western,
  western,
  western,
  western,
  western,
  western,
  western,
  western,
];

export default function Shop() {
  return (
    <div className="flex flex-col items-center xl:flex-row xl:items-start gap-20 mt-13 lg:mt-0">
      <section className="xl:sticky xl:top-38 flex flex-col w-147 items-center gap-10">
        <div className="flex items-center">
          <span className="font-galmuri text-2xl">보유 포인트 1000p</span>
          <ChargeButton />
        </div>
        <Image
          className="w-76 h-140"
          src={gachaMachine}
          alt="가챠 머신 이미지"
          priority
        />
        <RandomGachaButton />
      </section>
      <section className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 auto-rows-auto w-full justify-items-center gap-10">
        {costumes.map((costume, index) => (
          <ShopCostumeItem
            key={`costume${index}`}
            index={index}
            costume={costume}
          />
        ))}
      </section>
    </div>
  );
}
