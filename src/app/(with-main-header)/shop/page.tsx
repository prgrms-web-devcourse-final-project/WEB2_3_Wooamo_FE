import Image from "next/image";
import gachaMachine from "@/assets/images/gachaMachine.png";
import ChargeButton from "./ChargeButton";
import RandomGachaButton from "./RandomGatchaButton";
import ShopCostumeItem from "./ShopCostumeItem";
import { shopApi } from "@/api/shop/shop";
import { userApi } from "@/api/user/user";

export default async function Shop() {
  const fetchCostumeList = await shopApi.getCostumeList();
  const costumeList = fetchCostumeList?.data.contents;

  const fetchCurrentUserInfo = await userApi.getCurrentUserInfo();
  const currentUserPoint = fetchCurrentUserInfo?.data.point;

  if (!costumeList) return;
  if (!currentUserPoint) return;

  return (
    <div className="flex flex-col items-center xl:flex-row xl:items-start gap-20 mt-13 lg:mt-0">
      <section className="xl:sticky xl:top-38 flex flex-col w-147 items-center gap-10">
        <div className="flex items-center">
          <span className="font-galmuri text-xl lg:text-2xl">
            보유 포인트 {currentUserPoint}p
          </span>
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
      <section className="px-5 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 auto-rows-auto w-full justify-items-center gap-10">
        {costumeList.map((costume) => (
          <ShopCostumeItem
            key={costume.costumeId}
            costumeId={costume.costumeId}
            name={costume.costumeName}
            costume={costume.image}
            point={costume.point}
          />
        ))}
      </section>
    </div>
  );
}
