import { partyApi } from "@/api/party/party";
import ClosedParties from "./ClosedParties";
import EventParties from "./EventParties";
import OngoingParties from "./OngoingParties";
import UpcomingParties from "./UpcomingParties";
import Button from "@/components/common/Button";

export default async function Party() {
  const fetchPersonalQuestState = await partyApi.getPersonalQuestState();
  const personalQuestState = fetchPersonalQuestState?.data.state;

  console.log(personalQuestState);

  return (
    <div className="flex flex-col relative">
      <div className="fixed top-15 lg:top-25 left-0 w-screen h-15 bg-site-button flex justify-between items-center px-12 z-10">
        <p className="font-semibold">[일일미션] 공부 시간 3시간 이상</p>
        {personalQuestState === "보상받기" ? (
          <Button className="h-0 lg:h-0 lg:text-base font-pretendard font-semibold">
            {personalQuestState}
          </Button>
        ) : (
          <p className="font-semibold">{personalQuestState}</p>
        )}
      </div>
      <EventParties />
      <UpcomingParties />
      <OngoingParties />
      <ClosedParties />
    </div>
  );
}
