import Link from "next/link";
import PartyItem from "./PartyItem";
import { partyApi } from "@/api/party/party";

export default async function OngoingParties() {
  const fetchActivePartyList = await partyApi.getActivePartyList();
  const activePartyList = fetchActivePartyList?.data;

  if (!activePartyList) return;

  return (
    <section className="flex flex-col gap-7 lg:mt-15">
      {activePartyList.length !== 0 ? (
        <>
          <div className="flex justify-between items-end px-5 lg:px-0">
            <p className="font-galmuri text-xl lg:text-2xl">
              <span>참여 중인 팟</span>
              <span className="ml-3">{activePartyList.length}</span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center font-semibold lg:text-xl px-5 lg:px-7">
              <p className="flex-5">팟</p>
              <p className="flex-2">인원</p>
              <p className="flex-3">시작일</p>
            </div>
            {activePartyList.map((party) => (
              <PartyItem
                key={party.partyId}
                partyId={party.partyId}
                name={party.name}
                recruitCap={party.recruitCap}
                recruitCnt={party.recruitCnt}
                startDate={party.endDate}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-5 px-5 lg:px-0">
          <p className="font-galmuri text-xl lg:text-2xl">
            <span>참여 중인 팟</span>
            <span className="ml-3">0</span>
          </p>
          <p className="text-site-darkgray-02">아직 참여 중인 팟이 없습니다</p>
        </div>
      )}
    </section>
  );
}
