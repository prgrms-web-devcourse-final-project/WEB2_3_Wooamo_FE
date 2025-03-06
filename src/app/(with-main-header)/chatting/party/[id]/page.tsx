import ChattingInput from "../../ChattingInput";
import ChattingList from "./ChattingList";
import { userApi } from "@/api/user/user";
import { partyApi } from "@/api/party/party";

interface ChattingWithPartyProps {
  params: Promise<{ id: string }>;
}

export default async function ChattingWithParty({
  params,
}: ChattingWithPartyProps) {
  const { id } = await params;
  const currentUser = await userApi.getCurrentUserInfo();
  const participants = await partyApi.getPartyParticipantList(Number(id));
  const partyDetail = await partyApi.getPartyDetail(Number(id));

  if (!currentUser || !partyDetail || !participants) return;
  return (
    <div className="relative">
      
      <div className="px-5 lg:px-0 pt-12 pb-5">
        <ChattingList userId={currentUser.data.userId} />
      </div>
      <div>
        <ChattingInput currentUser={currentUser.data} />
      </div>
    </div>
  );
}
