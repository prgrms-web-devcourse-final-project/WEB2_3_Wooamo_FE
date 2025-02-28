"use client";

import { partyApi } from "@/api/party/party";
import { revalidatePathAction } from "@/app/actions";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import Image from "next/image";
import React, { useState } from "react";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

export default function AfterParticipateButtons({
  partyId,
}: {
  partyId: number;
}) {
  const { open, close } = useModalStore((state) => state);

  const [verifyImage, setVerifyIamge] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files;

    if (!targetFile) return;
    const filesArray = Array.from(targetFile);
    const selectedFiles: string[] = filesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setVerifyIamge(filesArray);
    setImagePreview(selectedFiles);
  };

  const resetForm = () => {
    setVerifyIamge([]);
    setImagePreview([]);
  };

  const verifyParticipate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (verifyImage) {
      const request = await partyApi.postPartyparticipationVerify(
        partyId,
        verifyImage,
      );

      if (request?.status === "성공") {
        close();
        revalidatePathAction("party-detail");
      }
    }
  };

  return (
    <>
      <Button>채팅</Button>
      <Button onClick={() => open(`verify-participate`)}>인증</Button>

      <Modal modalId="verify-participate" onClose={resetForm}>
        <form onSubmit={verifyParticipate}>
          <div className="flex flex-col items-center gap-5">
            <div className="w-80 h-80 bg-site-lightgray rounded-2xl flex items-center justify-center relative">
              <label
                htmlFor="verify-image"
                className="w-full h-full flex justify-center items-center absolute"
              >
                {!verifyImage.length && (
                  <Icon MuiIcon={AddPhotoAlternateRoundedIcon} />
                )}
              </label>
              <input
                type="file"
                id="verify-image"
                className="hidden"
                onChange={onChangeImage}
                accept="image/*"
              />
              {verifyImage &&
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
              <Button type="submit" className="lg:h-11 lg:text-base">
                인증하기
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
