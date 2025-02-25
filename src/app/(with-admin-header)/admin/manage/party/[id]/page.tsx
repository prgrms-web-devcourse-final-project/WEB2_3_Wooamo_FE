"use client";

import ParticipantItem from "./ParticipantItem";
import CertificationDate from "./CertificationDate";
import { adminApi } from "@/api/admin/admin";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import CertificationViewer from "./CertificationViewer";

export default function CertificationParty() {
  const { id } = useParams();

  const [partyDetail, setPartyDetail] = useState<PartyDetailDataType>();
  const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>();

  useEffect(() => {
    const fetchPartyDetail = async () => {
      if (!id) return;
      const fetchPartyDetail = await adminApi.getPartyDetail(Number(id));
      const partyDetail = fetchPartyDetail?.data;
      const partyMembers = partyDetail?.members;
      setPartyDetail(partyDetail);
      setPartyMembers(partyMembers);
    };

    fetchPartyDetail();
  }, []);

  if (!partyDetail) return;
  if (!partyMembers) return;

  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl font-semibold px-4">{partyDetail.name}</div>
      <div className="w-full px-5 py-5 bg-site-white-70 rounded-xl border border-site-lightgray">
        {partyDetail.context}
      </div>
      <div className="flex flex-col gap-5">
        <div className="font-semibold text-xl">날짜 선택</div>
        <CertificationDate
          partyId={Number(id)}
          start={partyDetail.startDate}
          end={partyDetail.endDate}
        />
      </div>
      <div className="flex gap-30">
        <CertificationViewer />
        <div className="flex flex-col gap-5">
          <div className="font-semibold text-xl">팟 인원</div>
          <div className="flex flex-wrap gap-8">
            {partyMembers.map((member) => (
              <ParticipantItem
                key={member.memberId}
                memberId={member.memberId}
                profile={member.profile}
                nickname={member.nickname}
              />
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
