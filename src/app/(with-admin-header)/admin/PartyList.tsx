"use client";

import Link from "next/link";

interface PartyListProps {
  partyId: number;
  title: string;
  totalHeadcount: number;
  headcount: number;
  startDate: string;
  endDate: string;
  status: string;
}

export default function PartyList({
  partyId,
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
        href={`/admin/manage/party/${partyId}`}
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
