"use client";

import Avatar from "@/components/common/Avatar";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface ParticipantItemProps {
  memberId: number;
  profile: string;
  nickname: string;
  isAuth: string;
}

export default function ParticipantItem({
  memberId,
  profile,
  nickname,
  isAuth,
}: ParticipantItemProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { id } = useParams();
  const date = searchParams.get("date");

  const handleMemberSelect = () => {
    router.push(`/admin/manage/party/${id}?date=${date}&memberId=${memberId}`);
  };

  return (
    <button
      className={`w-40 px-5 py-5 ${
        isAuth === "SUCCESS"
          ? "bg-site-main text-site-white-100"
          : isAuth === "FAIL"
          ? "bg-site-alarm"
          : "bg-site-white-50"
      } rounded-sm flex flex-col gap-4 items-center`}
      onClick={() => isAuth === "PENDING" && handleMemberSelect()}
    >
      <div className="w-18 h-18 rounded-full">
        <Avatar costumeSrc={profile} className="w-18 h-18" />
      </div>
      <div className="text-xs font-galmuri line-clamp-2">@{nickname}</div>
    </button>
  );
}
