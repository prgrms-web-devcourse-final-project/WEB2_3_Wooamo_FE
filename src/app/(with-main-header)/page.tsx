import { userApi } from "@/api/user/user";
import AfterLoginHome from "./AfterLoginHome";
import BeforeLoginHome from "./BeforeLoginHome";

export default async function Home() {
  const user = await userApi.getCurrentUserInfo();
  const isLoggedIn = user?.status === "성공";

  return isLoggedIn ? <AfterLoginHome /> : <BeforeLoginHome />;
}
