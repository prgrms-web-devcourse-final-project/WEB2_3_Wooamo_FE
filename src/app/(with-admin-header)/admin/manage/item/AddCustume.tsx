"use client";

import { adminApi } from "@/api/admin/admin";
import { revalidateTagAction } from "@/app/actions";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import { useState } from "react";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import Image from "next/image";

export default function AddCustume() {
  const { open, close } = useModalStore((state) => state);

  const [itemImage, setItemImage] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [itemPoint, setItemPoint] = useState<number>();

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files;

    if (!targetFile) return;
    const filesArray = Array.from(targetFile);
    const selectedFiles: string[] = filesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setItemImage(filesArray);
    setImagePreview(selectedFiles);
  };

  const resetInputFields = () => {
    setItemImage([]);
    setImagePreview([]);
    setItemName("");
    setItemPoint(0);
  };

  const registerItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (itemName && itemImage && itemPoint) {
      // const formData = new FormData();
      // formData.append("costumeName", itemName);
      // formData.append("point", itemPoint.toString());

      // itemImage.forEach((file) => {
      //   formData.append("image", file);
      // });

      const contents = {
        data: {
          costumeName: itemName,
          point: itemPoint.toString(),
        },
      };

      const formData = new FormData();
      formData.append(
        "contents",
        new Blob([JSON.stringify(contents)], { type: "application/json" }),
      );

      formData.append("image", itemImage[0]);

      const request = await adminApi.postItemCreate(formData);

      if (request?.status === "성공") {
        close();
        revalidateTagAction("costume-list");
        resetInputFields();
      }
    }
  };

  return (
    <>
      <Button onClick={() => open(`add-costume`)}>아이템 등록</Button>

      <Modal
        modalId={`add-costume`}
        className="w-180"
        onClose={resetInputFields}
      >
        <form onSubmit={registerItem} className="flex flex-col gap-5">
          <div className="text-xl font-semibold">아이템 등록</div>
          <div className="flex gap-5">
            <div className="w-80 h-80 bg-site-lightgray rounded-2xl flex items-center justify-center relative">
              <label
                htmlFor="event-image"
                className="w-full h-full flex justify-center items-center absolute"
              >
                {!itemImage.length && (
                  <Icon MuiIcon={AddPhotoAlternateRoundedIcon} />
                )}
              </label>
              <input
                type="file"
                id="event-image"
                className="hidden"
                onChange={onChangeImage}
                accept="image/*"
              />
              {itemImage &&
                imagePreview.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    width={320}
                    height={320}
                    alt="이미지 미리보기"
                  />
                ))}
            </div>
            <div className="flex flex-col flex-1 justify-between gap-5">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <label htmlFor="item-name">이름</label>
                  <input
                    required
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
                    required
                    value={itemPoint}
                    id="item-point"
                    type="number"
                    className="w-full px-5 py-2 border border-site-lightgray rounded-full"
                    onChange={(e) => setItemPoint(Number(e.target.value))}
                  />
                </div>
              </div>
              <Button type="submit" className="lg:h-11 lg:text-base">
                등록하기
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
