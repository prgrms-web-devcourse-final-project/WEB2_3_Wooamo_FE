"use client";

import { userApi } from "@/api/user/user";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface ProfileEditButtonProps {
  setUser: Dispatch<SetStateAction<userType | null>>;
}

export default function ProfileEditButton({ setUser }: ProfileEditButtonProps) {
  const { open, close } = useModalStore((state) => state);
  const [prevUser, setPrevUser] = useState<userType | null>(null);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const editProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await userApi.updateUserInfo({ context: description, link });
    if (res?.status === "성공" && prevUser) {
      setUser({
        ...prevUser,
        context: description,
        link,
      });
      close();
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userApi.getCurrentUserInfo();
      if (user) {
        setDescription(user.data.context);
        setLink(user.data.link);
        setPrevUser(user.data);
      }
    };
    fetchUser();
  }, []);

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
