"use client";

import { shopApi } from "@/api/shop/shop";
import { revalidateTagAction } from "@/actions";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";
import {
  loadTossPayments,
  TossPaymentsPayment,
} from "@tosspayments/tosspayments-sdk";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useToastStore } from "@/store/toastStore";

const payments = [
  { point: 500, price: 3000 },
  { point: 1000, price: 5500 },
  { point: 3000, price: 15000 },
];

export default function ChargeButton({
  currentUser,
}: {
  currentUser: responseType<userType> | null | undefined;
}) {
  const { open, close } = useModalStore((state) => state);
  const showToast = useToastStore((state) => state.showToast);
  const [tossPayment, setTossPayment] = useState<TossPaymentsPayment>();
  const clientKey = `${process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY}`;
  const customerKey = `FYa_Y2i5uFxNYawNjHXuH`;
  const searchParams = useSearchParams();
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const router = useRouter();

  useEffect(() => {
    const loadTossWindow = async () => {
      const tossPayment = await loadTossPayments(clientKey);
      const payment = tossPayment.payment({ customerKey });
      setTossPayment(payment);
    };

    loadTossWindow();
  }, []);

  const handlePaymentInfoFetch = async (amount: number, point: number) => {
    try {
      const requestTossPayment = await shopApi.postPointPurchase({
        amount,
        point,
      });

      if (requestTossPayment?.status === "성공") {
        close();
        await tossPayment?.requestPayment({
          method: "CARD",
          amount: {
            currency: "KRW",
            value: amount,
          },
          orderId: requestTossPayment.data?.orderId,
          orderName: `${point} 포인트`,
          successUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/shop`,
          failUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/shop`,
          card: {
            useEscrow: false,
            flowMode: "DEFAULT",
            useCardPoint: false,
            useAppCardOnly: false,
          },
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("결제를 취소했습니다" + error.message);
      }
      showToast("결제가 취소되었습니다");
    }
  };

  useEffect(() => {
    const confirmTossPayment = async () => {
      if (!orderId || !paymentKey || !amount) return;

      const payment = payments.find(
        (payment) => payment.price === Number(amount),
      );
      const confirmTossPaymentResponse = await shopApi.postPointPurchaseConfirm(
        {
          orderId,
          paymentKey,
          amount: Number(amount),
          point: Number(payment?.point),
        },
      );

      if (confirmTossPaymentResponse?.status === "성공") {
        revalidateTagAction("point-update");
        router.replace("/shop");
        showToast(`${payment?.point}p 충전이 완료되었습니다.`);
      } else {
        router.replace("/shop");
        showToast("충전에 실패했습니다.");
      }
    };

    confirmTossPayment();
  }, [paymentKey]);

  return (
    <>
      <Button
        onClick={() => open("charge")}
        className="relative -right-6"
        disabled={!currentUser}
      >
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
