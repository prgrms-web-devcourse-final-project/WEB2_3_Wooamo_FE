import { ReactNode } from "react";
import Header from "./header";
import Noise from "@/components/common/Noise";
import { hasCookieAtServer } from "@/api/cookie";

export default async function layout({ children }: { children: ReactNode }) {
  const serverIsLoggedIn = await hasCookieAtServer("accessToken");
  return (
    <Noise>
      <div className="w-full min-h-screen h-screen bg-site-bg overflow-x-hidden">
        <Header serverIsLoggedIn={serverIsLoggedIn} />
        <main className="px-0 lg:px-12 pb-13 pt-22.5 lg:pt-40">{children}</main>
      </div>
    </Noise>
  );
}
