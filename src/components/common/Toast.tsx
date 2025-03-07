"use client";

import { useToastStore } from "@/store/toastStore";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import PixelStarLeft from "@/assets/images/PixelStarLeft.svg";
import PixelStarRight from "@/assets/images/PixelStarRight.svg";
import Coin from "@/assets/images/Coin.svg";

interface ToastProps {
  isAnimating: boolean;
  idx: number;
  children: React.ReactNode;
}

const Toast = () => {
  const { toasts } = useToastStore();
  return (
    <div className="fixed bottom-4 right-1/2 translate-x-1/2 lg:right-5 lg:translate-0 flex flex-col gap-2">
      {toasts.map((toast, idx) => (
        <ToastItem key={toast.id} idx={idx} isAnimating={toast.isAnimating}>
          {toast.message}
        </ToastItem>
      ))}
    </div>
  );
};

const ToastItem = ({ children, isAnimating }: ToastProps) => {
  return (
    <div
      className={twMerge(
        " flex justify-center items-center w-90 lg:w-fit h-18 lg:h-16.5 px-6 py-5 rounded-[12px] bg-site-white-100 transition-all shadow-xl animate-show-toast",
        isAnimating ? "translate-y-0" : "translate-y-20",
      )}
    >
      <div className="flex gap-2">
        <Image src={PixelStarLeft} alt="픽셀화된 별 이미지" />
        <div className="flex gap-4">
          <Image src={Coin} alt="동전 이미지" />
          <p className="flex flex-col lg:flex-row lg:text-xl font-galmuri break-keep">
            {children}
          </p>
        </div>
        <Image
          className="rotate-180"
          src={PixelStarRight}
          alt="픽셀화된 별 이미지"
        />
      </div>
    </div>
  );
};

export default Toast;
