import type { Metadata } from "next";
import { Bitbitv2, Galmuri9, Pretendard } from "./fonts";
import "@/assets/css/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import Toast from "@/components/common/Toast";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "STUV",
  description:
    "STUV는 사용자들이 학습 목표를 설정하고, 스터디 그룹을 만들어 함께 공부할 수 있도록 지원하는 온라인 학습 플랫폼입니다.",
  openGraph: {
    images: ["/images/Logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${Pretendard.variable} ${Galmuri9.variable} ${Bitbitv2.variable} antialiased`}
      >
        <TooltipProvider>
          {children}
          <div id="modal-root"></div>
          <Toast />
        </TooltipProvider>
      </body>
    </html>
  );
}
