"use client";

import { adminApi } from "@/api/admin/admin";
import { revalidateTagAction } from "@/app/actions";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import Image from "next/image";
import { useState } from "react";

interface ShopCostumeItemProps {
  costume: string;
  costumeId: number;
  name: string;
  point: number;
}

export default function CostumeItem({
  costume,
  costumeId,
  name,
  point,
}: ShopCostumeItemProps) {
  const { open, close } = useModalStore((state) => state);
  const [itemName, setItemName] = useState<string>(name);
  const [itemPoint, setItemPoint] = useState<number>(point);

  const handleCostumeDelete = async (costumeId: number) => {
    const response = await adminApi.deleteCostume(costumeId);

    if (response?.status === "성공") {
      close();
      revalidateTagAction("costume-list");
    }
  };

  const handleCostumeEdit = async (costumeId: number) => {
    const request = await adminApi.putCostumeEdit(costumeId, {
      costumeName: itemName,
      point: itemPoint,
    });

    if (request?.status === "성공") {
      close();
      revalidateTagAction("costume-list");
    }
  };

  return (
    <>
      <article
        className="w-56 h-56 bg-site-white-70 rounded-[10px] relative"
        onClick={() => open(`custuem-item${costumeId}`)}
      >
        <div className="flex justify-center items-center absolute -top-7.5 right-0 w-fit px-6 h-15 bg-site-sub rounded-full">
          <span className="font-galmuri text-xl">{point}p</span>
        </div>
        <Image
          src={costume}
          width={224}
          height={224}
          alt="코스튬 입은 아바타 미리보기 이미지"
        />
      </article>

      <Modal modalId={`custuem-item${costumeId}`} className="w-150">
        <form
          className="flex flex-col gap-5"
          onSubmit={() => {
            handleCostumeEdit(costumeId);
          }}
        >
          <div className="text-xl font-semibold">아이템 수정/삭제</div>
          <div className="flex gap-5">
            <div className="w-60 h-60 bg-site-button-input rounded-xl flex justify-center items-center">
              <Image
                src={costume}
                width={240}
                height={240}
                alt="코스튬 입은 아바타 미리보기 이미지"
                className="w-50 h-50"
              />
            </div>
            <div className="flex flex-col flex-1 justify-between gap-5">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <label htmlFor="item-name">이름</label>
                  <input
                    value={itemName}
                    id="item-name"
                    type="text"
                    placeholder="아이템 이름을 입력해주세요"
                    className="w-full px-5 py-2 border border-site-lightgray rounded-full"
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="item-point">포인트</label>
                  <input
                    value={itemPoint}
                    id="item-point"
                    type="number"
                    placeholder="아이템 포인트를 입력해주세요"
                    className="w-full px-5 py-2 border border-site-lightgray rounded-full"
                    onChange={(e) => setItemPoint(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <Button
                  type="button"
                  className="lg:h-11 lg:text-base"
                  onClick={() => handleCostumeDelete(costumeId)}
                >
                  삭제하기
                </Button>
                <Button type="submit" className="lg:h-11 lg:text-base">
                  수정하기
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
