import { ReactNode } from "react";
import Header from "../header";
import Noise from "@/components/common/Noise";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen bg-site-bg">
      <Noise />
      <Header />
      {children}
    </div>
  );
}
