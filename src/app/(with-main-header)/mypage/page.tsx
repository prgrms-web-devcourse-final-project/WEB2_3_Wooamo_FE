import Link from "next/link";
import Button from "../../../components/common/Button";
import { twMerge } from "tailwind-merge";
import ProfileTab from "./ProfileTab";
import ClosetTab from "./ClosetTab";

export default async function Mypage({
  searchParams,
}: {
  searchParams: Promise<{ tab: "profile" | "closet" }>;
}) {
  const { tab } = await searchParams;
  const currentTab = tab ?? "profile";
  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-13",
        currentTab === "closet" && "h-175 overflow-y-hidden",
      )}
    >
      <div className="flex items-center gap-3">
        <Link href={"/mypage?tab=profile"}>
          <Button
            className={twMerge(currentTab !== "profile" && "bg-transparent")}
          >
            프로필
          </Button>
        </Link>
        <Link href={"/mypage?tab=closet"}>
          <Button
            className={twMerge(currentTab !== "closet" && "bg-transparent")}
          >
            옷장
          </Button>
        </Link>
      </div>
      {currentTab === "profile" && <ProfileTab />}
      {currentTab === "closet" && <ClosetTab />}
    </div>
  );
}
