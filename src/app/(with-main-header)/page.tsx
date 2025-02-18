"use client";

import Modal from "../../components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

export default function Home() {
  const open = useModalStore((state) => state.open);
  return (
    <div>
      <Modal>모달입니다</Modal>
      <Button className="bg-site-profile" onClick={open}>
        모달 ON
      </Button>
      <Input placeholder="팟 검색" />
    </div>
  );
}
