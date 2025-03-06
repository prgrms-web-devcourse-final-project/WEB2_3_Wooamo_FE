"use client";

import { useParams, useRouter } from "next/navigation";
import CertificationDate from "./CertificationDate";
import CertificationViewer from "./CertificationViewer";
import ParticipantItem from "./ParticipantItem";
import { useState } from "react";
import formatDateToKR from "@/utils/formatDateToKR";

export default function Certification({
  partyDetail,
}: {
  partyDetail: PartyDetailDataType;
}) {
  const { id } = useParams();
  const router = useRouter();
  const partyMembers = partyDetail.members;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMember, setSelectedMember] = useState<PartyMemberType>(
    partyMembers[0],
  );

  console.log(selectedDate);
  console.log(selectedMember);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const stringDate = formatDateToKR(date);
    router.replace(`?date=${stringDate}`);
  };

  const handleUserSelect = (member: PartyMemberType) => {
    setSelectedMember(member);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="font-semibold text-xl">날짜 선택</div>
        <CertificationDate
          partyId={Number(id)}
          start={partyDetail.startDate}
          end={partyDetail.endDate}
          onChange={handleDateSelect}
          selectedDate={selectedDate}
        />
      </div>
      <div className="flex gap-30">
        <CertificationViewer
          selectedDate={selectedDate}
          selectedMember={selectedMember}
        />
        <div className="flex flex-col gap-5">
          <div className="font-semibold text-xl">팟 인원</div>
          <div className="flex flex-wrap gap-8">
            {partyMembers.map((member) => (
              <ParticipantItem
                key={member.memberId}
                member={member}
                onChange={handleUserSelect}
                selectedMember={selectedMember}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
