import { ReactNode } from "react";
import Header from "./header";
import Noise from "@/components/common/Noise";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <Noise>
      <div className="w-full min-h-screen h-full bg-site-bg overflow-x-hidden">
        <Header />
        <main className="px-12 pb-13 pt-40">{children}</main>
      </div>
    </Noise>
  );
}
