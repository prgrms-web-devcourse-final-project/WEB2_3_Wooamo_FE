import Link from "next/link";
import Button from "../../../components/common/Button";
import { twMerge } from "tailwind-merge";
import ProfileTab from "./ProfileTab";
import ClosetTab from "./ClosetTab";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "STUV - 마이페이지",
};

interface MypageProps {
  searchParams: Promise<{
    tab: "profile" | "closet";
    year: number;
    month: number;
  }>;
}

export default async function Mypage({ searchParams }: MypageProps) {
  const { tab, year: selectedYear, month: selectedMonth } = await searchParams;
  const currentDate = new Date();

  const currentTab = tab ?? "profile";
  const year = selectedYear ?? currentDate.getFullYear();
  const month = selectedMonth ?? currentDate.getMonth() + 1;
  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-13",
        currentTab === "closet" &&
          "gap-5 lg:gap-0 h-full lg:h-176 overflow-y-hidden",
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
      {currentTab === "profile" && <ProfileTab year={year} month={month} />}
      {currentTab === "closet" && <ClosetTab />}
    </div>
  );
}
