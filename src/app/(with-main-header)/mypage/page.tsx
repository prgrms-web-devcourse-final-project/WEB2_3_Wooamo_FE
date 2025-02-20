"use client";

import Link from "next/link";
import Button from "../../../components/common/Button";
import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import ProfileTab from "./ProfileTab";
import ClosetTab from "./ClosetTab";

export default function Mypage() {
  const params = useSearchParams();
  const tab = (params.get("tab") ?? "profile") as "profile" | "closet";
  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-13",
        tab === "closet" && "h-175 overflow-y-hidden",
      )}
    >
      <div className="flex items-center gap-3">
        <Link href={"/mypage?tab=profile"}>
          <Button className={twMerge(tab !== "profile" && "bg-transparent")}>
            프로필
          </Button>
        </Link>
        <Link href={"/mypage?tab=closet"}>
          <Button className={twMerge(tab !== "closet" && "bg-transparent")}>
            옷장
          </Button>
        </Link>
      </div>
      {tab === "profile" && <ProfileTab />}
      {tab === "closet" && <ClosetTab />}
    </div>
  );
}
