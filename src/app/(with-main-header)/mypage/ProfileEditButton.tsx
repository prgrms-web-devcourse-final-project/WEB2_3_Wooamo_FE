"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import { useState } from "react";

export default function ProfileEditButton() {
  const { open, close } = useModalStore((state) => state);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const editProfile = () => {
    console.log("프로필 편집", description, link);
    close();
  };

  return (
    <>
      <Button onClick={() => open("edit-profile")} className="">
        프로필 편집
      </Button>

      <Modal modalId="edit-profile">
        <form
          onSubmit={editProfile}
          className="flex flex-col items-center gap-7.5 w-full"
        >
          <div className="flex flex-col gap-4 w-full">
            <p className="font-semibold text-base lg:text-xl text-center">
              프로필 편집
            </p>
            <div className="flex items-center gap-4">
              <label
                htmlFor="description"
                className="min-w-18 text-base lg:text-xl font-semibold"
              >
                자기소개
              </label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-site-button-input"
              />
            </div>
            <div className="flex items-center gap-4">
              <label
                htmlFor="link"
                className="min-w-18 text-base lg:text-xl font-semibold"
              >
                링크
              </label>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="bg-site-button-input"
              />
            </div>
          </div>
          <Button>저장</Button>
        </form>
      </Modal>
    </>
  );
}
