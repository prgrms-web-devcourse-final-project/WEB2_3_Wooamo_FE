import ClosedParties from "./ClosedParties";
import EventParties from "./EventParties";
import OngoingParties from "./OngoingParties";
import UpcomingParties from "./UpcomingParties";
import PersonalQuest from "./PersonalQuest";
import { userApi } from "@/api/user/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "STUV - 파티",
};

export default async function Party() {
  const fetchCurrentUser = await userApi.getCurrentUserInfo();
  const currentUser = fetchCurrentUser?.data;

  return (
    <div className="flex flex-col relative">
      {currentUser && <PersonalQuest />}
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
