import { ReactNode } from "react";
import Noise from "@/components/common/Noise";
import Header from "../header";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-site-bg">
      <Noise />
      <Header />
      <main className="px-12 py-13">{children}</main>
    </div>
  );
}
