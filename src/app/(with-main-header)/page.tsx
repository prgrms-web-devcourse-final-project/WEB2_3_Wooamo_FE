import AfterLoginHome from "./AfterLoginHome";
import BeforeLoginHome from "./BeforeLoginHome";

export default function Home() {
  const isLoggedIn = true;

  return isLoggedIn ? <AfterLoginHome /> : <BeforeLoginHome />;
}
