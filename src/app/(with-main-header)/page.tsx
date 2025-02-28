import AfterLoginHome from "./AfterLoginHome";
import BeforeLoginHome from "./BeforeLoginHome";
import { hasCookie } from "cookies-next";

export default async function Home() {
  const isLoggedIn = hasCookie("accessToken");

  return isLoggedIn ? <AfterLoginHome /> : <BeforeLoginHome />;
}
