import { partyApi } from "@/api/party/party";
import PartyItem from "../PartyItem";
import { delay } from "@/utils/delay";

interface PartyAllProps {
  name: string;
}

export default async function PartyItems({ name }: PartyAllProps) {
  await delay(1000);
  const fetchParties = await partyApi.getScheduledPartyList(name);
  const parties = fetchParties?.data.contents;

  if (!parties) return;
  return (
    <>
      {parties.map((party) => (
        <PartyItem
          key={party.partyId}
          partyId={party.partyId}
          name={party.name}
          recruitCap={party.recruitCap}
          recruitCnt={party.recruitCnt}
          startDate={party.startDate}
        />
      ))}
    </>
  );
}
