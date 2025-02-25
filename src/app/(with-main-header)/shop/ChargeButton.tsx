"use client";

import { shopApi } from "@/api/shop/shop";
import { revalidateTagAction } from "@/app/actions";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import {
  loadTossPayments,
  TossPaymentsPayment,
} from "@tosspayments/tosspayments-sdk";
import React, { useEffect, useState } from "react";

const payments = [
  { point: 500, price: 3000 },
  { point: 1000, price: 5500 },
  { point: 3000, price: 15000 },
];

export default function ChargeButton() {
  const { open, close } = useModalStore((state) => state);
  const [tossPayment, setTossPayment] = useState<TossPaymentsPayment>();
  const clientKey = `${process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY}`;
  const customerKey = `FYa_Y2i5uFxNYawNjHXuH`;

  useEffect(() => {
    const loadTossWindow = async () => {
      const tossPayment = await loadTossPayments(clientKey);
      const payment = tossPayment.payment({ customerKey });
      setTossPayment(payment);
    };

    loadTossWindow();
  }, []);

  const handlePaymentInfoFetch = async (amount: number, point: number) => {
    const requestTossPayment = await shopApi.postPointPurchase({
      amount,
      point,
    });

    const responseTossPayment = requestTossPayment?.data;

    if (responseTossPayment) {
      close();
      await tossPayment?.requestPayment({
        method: "CARD",
        amount: {
          currency: "KRW",
          value: amount,
        },
        orderId: "NM-A2Kigd51JLNANLPN3g",
        orderName: `${point} 포인트`,
        successUrl: "http://localhost:3000/shop",
        failUrl: "http://localhost:3000/shop",
        card: {
          useEscrow: false,
          flowMode: "DEFAULT",
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });

      const confirmTossPayment = await shopApi.postPointPurchaseConfirm({
        orderId: responseTossPayment.orderId,
        paymentKey: responseTossPayment.paymentKey,
        amount: responseTossPayment.amount,
        point: responseTossPayment.point,
      });

      if (confirmTossPayment?.status === "성공") {
        revalidateTagAction("point");
      }
    }
  };

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
                <Button
                  onClick={() =>
                    handlePaymentInfoFetch(payment.price, payment.point)
                  }
                >
                  {payment.price.toLocaleString("ko-KR")}원
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
