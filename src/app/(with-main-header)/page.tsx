import { cookies } from "next/headers";
import AfterLoginHome from "./AfterLoginHome";
import BeforeLoginHome from "./BeforeLoginHome";
import { hasCookie } from "cookies-next";

export default async function Home() {
  const isLoggedIn = hasCookie("accessToken");
  const serverLoggedIn = (await cookies()).get("accessToken");

  return isLoggedIn || serverLoggedIn ? (
    <AfterLoginHome />
  ) : (
    <BeforeLoginHome />
  );
}
