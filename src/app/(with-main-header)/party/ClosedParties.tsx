import { partyApi } from "@/api/party/party";
import Button from "../../../components/common/Button";

export default async function ClosedParties() {
  const fetchCompletedPartyList = await partyApi.getCompletedPartyList();
  const completedPartyList = fetchCompletedPartyList?.data;

  if (!completedPartyList) return;

  return (
    <section className="flex flex-col gap-7 mt-15">
      <p className="font-galmuri text-xl lg:text-2xl px-5 lg:px-0">
        <span>마감된 팟</span>
        <span className="ml-3">3</span>
      </p>
      <div className="flex flex-col gap-2.5 lg:gap-3">
        {completedPartyList.map((party) => (
          <article
            key={party.partyId}
            className="flex justify-between items-center h-14 lg:h-25 bg-site-button px-5"
          >
            <div className="flex gap-2.5 items-end">
              <p className="font-semibold text-xl">{party.name}</p>
              <p className="font-semibold">{party.rewordPoint}p</p>
            </div>
            <Button
              className={`${
                party.questStatus === "보상받기"
                  ? "bg-site-main text-site-white"
                  : party.questStatus === "보상완료"
                  ? "bg-site-profile text-site-black-100"
                  : "bg-site-darkgray-01 text-white"
              }`}
            >
              {party.questStatus}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
