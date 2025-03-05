"use client";

import Avatar from "@/components/common/Avatar";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface ParticipantItemProps {
  member: PartyMemberType;
  onChange: (member: PartyMemberType) => void;
  selectedMember: PartyMemberType;
}

export default function ParticipantItem({
  member,
  onChange,
  selectedMember,
}: ParticipantItemProps) {
  return (
    <button
      className={`w-40 px-5 py-5 ${
        member.isAuth === "SUCCESS"
          ? "bg-site-main text-site-white-100"
          : member.isAuth === "FAIL"
          ? "bg-site-alarm"
          : "bg-site-white-50"
      } rounded-sm flex flex-col gap-4 items-center`}
      onClick={() => onChange(member)}
    >
      <div className="w-18 h-18 rounded-full">
        <Avatar costumeSrc={member.profile} className="w-18 h-18" />
      </div>
      <div className="text-xs font-galmuri line-clamp-2">
        @{member.nickname}
      </div>
    </button>
  );
}
