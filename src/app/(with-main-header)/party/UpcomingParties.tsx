import Link from "next/link";
import PartyItem from "./PartyItem";
import { partyApi } from "@/api/party/party";

export default async function UpcomingParties() {
  const fetchScheduledPartyList = await partyApi.getScheduledPartyList();
  const scheduledPartyList = fetchScheduledPartyList?.data.contents;

  if (!scheduledPartyList) return;

  return (
    <section className="flex flex-col gap-7 mt-15">
      {scheduledPartyList.length !== 0 ? (
        <>
          <div className="flex justify-between items-end px-5 lg:px-0">
            <p className="font-galmuri text-xl lg:text-2xl">
              <span>시작 전인 팟</span>
              <span className="ml-3">
                {scheduledPartyList ? scheduledPartyList.length : 0}
              </span>
            </p>
            <Link
              href={"/party/all"}
              className="text-base lg:text-xl text-site-darkgray-02"
            >
              전체보기
            </Link>
          </div>
          <div className="flex flex-col gap-2.5 lg:gap-3 mb-10">
            <div className="flex items-center font-semibold lg:text-xl px-5 lg:px-7">
              <p className="flex-5">팟</p>
              <p className="flex-2">인원</p>
              <p className="flex-3">시작일</p>
            </div>
            {scheduledPartyList.slice(0, 3).map((party) => (
              <PartyItem
                key={party.partyId}
                partyId={party.partyId}
                name={party.name}
                recruitCap={party.recruitCap}
                recruitCnt={party.recruitCnt}
                startDate={party.startDate}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-5 px-5 lg:px-0 mb-10 lg:mb-0">
          <p className="font-galmuri text-xl lg:text-2xl">
            <span>시작 전인 팟</span>
            <span className="ml-3">0</span>
          </p>
          <p className="text-site-darkgray-02">아직 시작 전인 팟이 없습니다</p>
        </div>
      )}
    </section>
  );
}
