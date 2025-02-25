"use client";

import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ParticipantItemProps {
  memberId: number;
  profile: string;
  nickname: string;
}

export default function ParticipantItem({
  memberId,
  profile,
  nickname,
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
      className="w-40 px-5 py-5 bg-site-white-50 rounded-sm flex flex-col gap-4 items-center"
      onClick={handleMemberSelect}
    >
      <div className="w-18 h-18 bg-site-white-100 rounded-full">
        <Image
          src={profile}
          width={72}
          height={72}
          alt="사용자 아바타 이미지"
        />
      </div>
      <div className="text-xs font-galmuri line-clamp-2">@{nickname}</div>
    </button>
  );
}
