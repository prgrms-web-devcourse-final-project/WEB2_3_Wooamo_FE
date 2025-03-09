import { userApi } from "@/api/user/user";
import AfterLoginHome from "./AfterLoginHome";
import BeforeLoginHome from "./BeforeLoginHome";

export default async function Home() {
  const isLoggedIn = await userApi.checkIsLoggedIn();
  return isLoggedIn?.data ? <AfterLoginHome /> : <BeforeLoginHome />;
}
