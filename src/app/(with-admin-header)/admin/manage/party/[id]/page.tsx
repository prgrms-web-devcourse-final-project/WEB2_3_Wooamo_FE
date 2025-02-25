import ParticipantItem from "./ParticipantItem";
import Button from "@/components/common/Button";
import CertificationDate from "./CertificationDate";
import { adminApi } from "@/api/admin/admin";
import React from "react";

export default async function CertificationParty({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const fetchPartyDetail = await adminApi.getPartyDetail(id);
  const partyDetail = fetchPartyDetail?.data;
  const partyMembers = partyDetail?.members;

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
          partyId={id}
          start={partyDetail.startDate}
          end={partyDetail.endDate}
        />
      </div>
      <div className="flex gap-30">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-xl">팟 인증</div>
            <div className="flex gap-2">
              <Button className="lg:text-sm lg:px-3 lg:h-10 bg-site-alarm text-site-white-100 font-pretendard">
                실패
              </Button>
              <Button className="lg:text-sm lg:px-3 lg:h-10 bg-site-main text-site-white-100 font-pretendard">
                성공
              </Button>
            </div>
          </div>
          <div className="w-100 h-100 bg-site-lightgray rounded-xl flex items-center justify-center">
            {/* <Image src={} width={400} height={400} alt="사용자가 인증한 사진" /> */}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-semibold text-xl">팟 인원</div>
          <div className="flex flex-wrap gap-8">
            {partyMembers.map((member) => (
              <ParticipantItem
                key={member.memberId}
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
