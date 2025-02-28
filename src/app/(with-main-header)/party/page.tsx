import { partyApi } from "@/api/party/party";
import ClosedParties from "./ClosedParties";
import EventParties from "./EventParties";
import OngoingParties from "./OngoingParties";
import UpcomingParties from "./UpcomingParties";
import PersonalQuest from "./PersonalQuest";

export default async function Party() {
  const fetchPersonalQuestState = await partyApi.getPersonalQuestState();
  const personalQuestState = fetchPersonalQuestState?.data.state;

  if (!personalQuestState) return;

  return (
    <div className="flex flex-col relative">
      <PersonalQuest personalQuestState={personalQuestState} />
      <EventParties />
      <UpcomingParties />
      <OngoingParties />
      <ClosedParties />
    </div>
  );
}
