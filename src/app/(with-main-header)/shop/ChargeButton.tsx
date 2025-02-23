"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";

const payments = [
  { point: 500, price: 3000 },
  { point: 1000, price: 5500 },
  { point: 3000, price: 15000 },
];

export default function ChargeButton() {
  const { open, close } = useModalStore((state) => state);

  return (
    <>
      <Button onClick={() => open("charge")} className="relative -right-6">
        충전
      </Button>

      <Modal modalId="charge">
        <div className="flex flex-col items-center w-full gap-8">
          <span className="font-semibold text-base lg:text-xl">포인트 숍</span>
          <div className="flex flex-col w-full gap-4">
            {payments.map((payment) => (
              <div
                key={`${payment.point}p`}
                className="flex justify-between items-center w-full px-8"
              >
                <p className="font-semibold text-base lg:text-xl">
                  {payment.point}p
                </p>
                <Button>{payment.price.toLocaleString("ko-KR")}원</Button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
