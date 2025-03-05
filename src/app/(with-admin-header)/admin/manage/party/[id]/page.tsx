import { adminApi } from "@/api/admin/admin";
import React from "react";
import Certification from "./Certification";

export default async function CertificationParty({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fetchPartyDetail = await adminApi.getPartyDetail(Number(id));
  const partyDetail = fetchPartyDetail?.data;

  console.log(partyDetail);

  if (!partyDetail) return;

  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl font-semibold px-4">{partyDetail.name}</div>
      <div className="w-full px-5 py-5 bg-site-white-70 rounded-xl border border-site-lightgray">
        {partyDetail.context}
      </div>
      <Certification partyDetail={partyDetail} />
    </div>
  );
}
