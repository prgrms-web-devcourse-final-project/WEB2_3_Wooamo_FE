"use client";

import Button from "@/components/common/Button";
import { useModalStore } from "@/store/modalStore";

export default function ParticipateButton() {
  const { open } = useModalStore((state) => state);
  return (
    <div className="flex justify-end h-15">
      <Button onClick={open}>참여하기</Button>
    </div>
  );
}
