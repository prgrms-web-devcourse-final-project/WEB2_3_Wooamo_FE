import { cookies } from "next/headers";
import { hasCookieAtServer } from "@/api/cookie";
import AfterLoginHome from "./AfterLoginHome";
import BeforeLoginHome from "./BeforeLoginHome";
import { hasCookie } from "cookies-next";

export default async function Home() {
  const clientIsLoggedIn = hasCookie("accessToken");
  const serverIsLoggedIn = await hasCookieAtServer("accessToken");
  const isLoggedIn = clientIsLoggedIn || serverIsLoggedIn;

  return isLoggedIn ? (
    <AfterLoginHome />
  ) : (
    <BeforeLoginHome />
  );
}
