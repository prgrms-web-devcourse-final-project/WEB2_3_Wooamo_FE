"use client";

import Link from "next/link";

interface PartyListProps {
  index: number;
  title: string;
  description: string;
  totalHeadcount: number;
  headcount: string; // 인원 수 -> 다만 전체 인원을 표시해줘야하니 팟에 포함된 전체 사용자를 받아오게 될 수도 있음 그럴 땐 형식에 맞춰 배열로 바꾼 후 인원수는 length로 사용하면 될 듯
  startDate: string;
  endDate: string;
  status: string;
  certificationPhoto: string; // 인증 사진
}

export default function PartyList({
  index,
  title,
  totalHeadcount,
  headcount,
  startDate,
  endDate,
  status,
}: PartyListProps) {
  return (
    <>
      <Link
        href={`/admin/manage/party/${index}`}
        className="flex px-5 py-10 bg-site-white-70 cursor-pointer"
      >
        <div className="flex-2">{title}</div>
        <div className="flex-1">
          {headcount} / {totalHeadcount}
        </div>
        <div className="flex-1">{startDate}</div>
        <div className="flex-1">{endDate}</div>
        <div className="flex-1">{status}</div>
      </Link>
    </>
  );
}
