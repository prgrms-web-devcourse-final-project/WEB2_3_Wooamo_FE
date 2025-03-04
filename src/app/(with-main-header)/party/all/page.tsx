import Link from "next/link";
import Button from "../../../../components/common/Button";
import PartyItem from "../PartyItem";
import PartySearch from "./PartySearch";
import { partyApi } from "@/api/party/party";
import { Suspense } from "react";
import BasicSkeleton from "@/components/common/skeletons/BasicSkeleton";

interface PartyAllProps {
  searchParams: Promise<{ name: string }>;
}

export default async function PartyAll({ searchParams }: PartyAllProps) {
  const { name } = await searchParams;
  const parties = await partyApi.getScheduledPartyList(name);

  if (!parties) return;

  return (
    <div className="flex flex-col">
      <div className="px-5 lg:px-0">
        <div className="flex justify-between items-center mb-5 lg:mb-7">
          <p className="font-galmuri text-xl lg:text-[28px]">전체</p>
          <Link href={"/party/create"}>
            <Button type="button">팟 생성</Button>
          </Link>
        </div>
        <Suspense fallback={<BasicSkeleton count={1} />}>
          <PartySearch />
        </Suspense>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center font-semibold lg:text-xl px-5 lg:px-7">
          <p className="flex-5">팟</p>
          <p className="flex-2">인원</p>
          <p className="flex-3">시작일</p>
        </div>
        {parties.data.contents.map((party) => (
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
    </div>
  );
}
