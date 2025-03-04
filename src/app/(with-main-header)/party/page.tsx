import { partyApi } from "@/api/party/party";
import ClosedParties from "./ClosedParties";
import EventParties from "./EventParties";
import OngoingParties from "./OngoingParties";
import UpcomingParties from "./UpcomingParties";
import PersonalQuest from "./PersonalQuest";
import { userApi } from "@/api/user/user";

export default async function Party() {
  const fetchPersonalQuestState = await partyApi.getPersonalQuestState();
  const personalQuestState = fetchPersonalQuestState?.data.state;

  const fetchCurrentUser = await userApi.getCurrentUserInfo();
  const currentUser = fetchCurrentUser?.data;

  if (!personalQuestState) return;

  return (
    <div className="flex flex-col relative">
      {currentUser && <PersonalQuest personalQuestState={personalQuestState} />}
      <EventParties />
      <UpcomingParties />
      {currentUser && (
        <>
          <OngoingParties />
          <ClosedParties />
        </>
      )}
    </div>
  );
}
