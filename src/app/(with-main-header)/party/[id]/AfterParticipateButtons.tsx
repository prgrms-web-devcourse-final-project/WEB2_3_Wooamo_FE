"use client";

import { partyApi } from "@/api/party/party";
import { revalidatePathAction } from "@/actions";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import Link from "next/link";
import { start } from "repl";

export default function AfterParticipateButtons({
  partyId,
  startDate,
}: {
  partyId: number;
  startDate: string;
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
      const formData = new FormData();
      formData.append("image", verifyImage[0]);

      const request = await partyApi.postPartyparticipationVerify(
        partyId,
        formData,
      );

      if (request?.status === "성공") {
        close();
        revalidatePathAction("party-detail");
      }
    }
  };

  const today = new Date();
  const start = new Date(startDate);

  return (
    <>
      <Link href={`/chatting/party/${partyId}`}>
        <Button>채팅</Button>
      </Link>
      <Button
        disabled={today < start}
        onClick={() => open(`verify-participate`)}
      >
        인증
      </Button>

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
