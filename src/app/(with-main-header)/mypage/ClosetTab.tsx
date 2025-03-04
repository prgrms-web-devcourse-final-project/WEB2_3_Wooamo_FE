"use client";

import Character from "@/components/common/Character";
import Image from "next/image";
import WhiteDividerLong from "@/assets/images/WhiteDividerLong.svg";
import spotlight from "@/assets/images/spotlight.png";
import WhiteDividerShort from "@/assets/images/WhiteDividerShort.svg";
import { useEffect, useState } from "react";
import { userApi } from "@/api/user/user";
import { revalidateTagAction } from "@/actions";

export default function ClosetTab() {
  const [selectedCostume, setSelectedCostume] = useState("");
  const [costumes, setCostumes] = useState<costumeType[]>([]);

  const changeCostume = async (costume: costumeType) => {
    const currentCostume = await userApi.updateUserCostume(costume.costumeId);
    if (currentCostume?.status === "성공") {
      setSelectedCostume(currentCostume.data.profile);
      revalidateTagAction("user");
    }
  };

  useEffect(() => {
    const fetchCurrentUserCostume = async () => {
      const user = await userApi.getCurrentUserInfo();
      if (user?.data) {
        setSelectedCostume(user.data.profile);
      }
    };
    const fetchCostumes = async () => {
      const costumes = await userApi.getCurrentUserCostumes();
      if (costumes?.data) {
        setCostumes(costumes.data);
      }
    };

    fetchCurrentUserCostume();
    fetchCostumes();
  }, []);
  return (
    <div className="flex flex-col lg:flex-row gap-0 lg:gap-17 px-8 overflow-y-auto">
      <div className="relative w-full h-90 lg:w-117 lg:h-184 flex-shrink-0">
        <Image
          src={spotlight}
          alt="캐릭터를 비추는 스포트라이트 이미지"
          className="object-contain"
          sizes="100%"
          fill
        />
        <Character
          costumeSrc={selectedCostume}
          className="translate-y-[15%] h-58 lg:h-119"
        />
      </div>
      <section className="flex flex-col items-center w-full gap-5 lg:gap-8 lg:mt-28">
        <Image
          src={WhiteDividerLong}
          alt="흰 구분선 이미지"
          className="hidden lg:block"
        />
        <Image
          src={WhiteDividerShort}
          alt="흰 구분선 이미지"
          className="lg:hidden"
        />
        <section className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 auto-rows-auto w-full justify-items-center gap-4 lg:gap-6 h-120">
          {costumes.map((costume) => (
            <button
              key={`costume-${costume.costumeId}`}
              className="w-full aspect-square max-w-[224px]"
              onClick={() => changeCostume(costume)}
            >
              <article className="bg-site-white-70 rounded-[10px] relative hover:drop-shadow-6.2 transition-all h-full w-full">
                <Image
                  src={costume.image}
                  width={270}
                  height={270}
                  alt="내 코스튬 이미지"
                  className="w-full h-full object-contain"
                />
              </article>
            </button>
          ))}
        </section>
      </section>
    </div>
  );
}
