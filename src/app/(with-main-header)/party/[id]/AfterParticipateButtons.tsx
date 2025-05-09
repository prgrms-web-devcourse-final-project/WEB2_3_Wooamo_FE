"use client";

import { partyApi } from "@/api/party/party";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import Image from "next/image";
import React, { useState } from "react";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { useToastStore } from "@/store/toastStore";
import { useRouter } from "next/navigation";
import { chattingApi } from "@/api/chatting/chatting";

interface AfterParticipateButtonsProps {
  partyId: number;
  partyName: string;
  maxMembers: number;
  startDate: string;
  userId?: number;
}

export default function AfterParticipateButtons({
  partyId,
  userId,
  partyName,
  maxMembers,
  startDate,
}: AfterParticipateButtonsProps) {
  const { open, close } = useModalStore((state) => state);
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);

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
        showToast("인증이 완료되었습니다");
      } else {
        close();
        showToast("이미 인증을 완료했습니다");
      }
    }
  };

  const participateChatting = async () => {
    if (!userId) return;
    const res = await chattingApi.createGroupChatRoom({
      groupId: String(partyId),
      groupName: partyName,
      userId,
      maxMembers,
    });
    console.log(res);
    if (res?.status === "성공") {
      router.push(`/chatting/party/${partyId}?roomId=${res.data}`);
    }
  };

  const today = new Date();
  const start = new Date(startDate);

  return (
    <>
      <Button onClick={participateChatting}>채팅</Button>
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
                    alt="이미지 미리보기"
                    fill
                    sizes="100%"
                    className="object-cover rounded-2xl"
                  />
                ))}
            </div>
            <div className="flex flex-col flex-1 justify-between gap-5">
              <Button
                disabled={verifyImage.length === 0}
                type="submit"
                className="lg:h-11 lg:text-base"
              >
                인증하기
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
