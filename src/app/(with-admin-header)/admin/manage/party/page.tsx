import { adminApi } from "@/api/admin/admin";
import PartyList from "../../PartyList";

export default async function page() {
  const fetchAllPartyList = await adminApi.getAllPartyList();
  const allPartyList = fetchAllPartyList?.data.contents;
  if (!allPartyList) return;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex px-5 font-semibold text-xl">
        <div className="flex-2">팟</div>
        <div className="flex-1">인원</div>
        <div className="flex-1">시작일</div>
        <div className="flex-1">마감일</div>
        <div className="flex-1">인증 상태</div>
      </div>
      <div className="flex flex-col gap-5">
        {allPartyList.map((party) => (
          <PartyList
            key={party.partyId}
            index={party.partyId}
            title={party.name}
            totalHeadcount={party.recruitCap}
            headcount={party.recruitCnt}
            startDate={party.startDate}
            endDate={party.endDate}
            status={party.isApproved}
          />
        ))}
      </div>
    </div>
  );
}
