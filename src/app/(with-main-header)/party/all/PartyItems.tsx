import { partyApi } from "@/api/party/party";
import PartyItem from "../PartyItem";
import Pagination from "./Pagination";

interface PartyAllProps {
  name: string;
  page: string;
}

export default async function PartyItems({ name, page }: PartyAllProps) {
  page = page ?? 0;
  const fetchParties = await partyApi.getScheduledPartyList(name, Number(page));
  const totalPages = fetchParties?.data.totalPages;
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
      {!name && (
        <div>
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
