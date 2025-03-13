import { ReactNode, Suspense } from "react";
import Header from "./header";
import Noise from "@/components/common/Noise";

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <Noise>
      <div className="w-full min-h-screen h-screen bg-site-bg overflow-x-hidden">
        <Header />
        <Suspense>
          <main className="px-0 lg:px-12 pb-13 pt-22.5 lg:pt-40">
            {children}
          </main>
        </Suspense>
      </div>
    </Noise>
  );
}
