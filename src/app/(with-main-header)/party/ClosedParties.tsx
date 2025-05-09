import { partyApi } from "@/api/party/party";
import Button from "../../../components/common/Button";
import ClosedPartyItem from "./ClosedPartyItem";

export default async function ClosedParties() {
  const fetchCompletedPartyList = await partyApi.getCompletedPartyList();
  const completedPartyList = fetchCompletedPartyList?.data;

  if (!completedPartyList) return;

  return (
    <section className="flex flex-col gap-7 mt-15">
      <p className="font-galmuri text-xl lg:text-2xl px-5 lg:px-0">
        <span>마감된 팟</span>
        <span className="ml-3">{completedPartyList.length}</span>
      </p>
      <div className="flex flex-col gap-2.5 lg:gap-3">
        {completedPartyList.length !== 0 ? (
          completedPartyList.map((party) => (
            <ClosedPartyItem
              key={party.partyId}
              partyId={party.partyId}
              name={party.name}
              questStatus={party.questStatus}
              rewardPoint={party.rewardPoint}
            />
          ))
        ) : (
          <div className="px-5 lg:px-0 text-site-darkgray-02">
            마감된 팟이 없습니다
          </div>
        )}
      </div>
    </section>
  );
}
