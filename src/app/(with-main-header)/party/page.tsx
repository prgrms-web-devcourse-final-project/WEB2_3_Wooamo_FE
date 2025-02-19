import ClosedParties from "./ClosedParties";
import EventParties from "./EventParties";
import OngoingParties from "./OngoingParties";
import UpcomingParties from "./UpcomingParties";

export default function Party() {
  return (
    <div className="flex flex-col relative">
      <div className="fixed top-25 left-0 w-screen h-15 bg-site-button flex justify-between items-center px-12 z-50">
        <p className="font-semibold">[일일미션] 공부 시간 3시간 이상</p>
        <p className="font-semibold">진행중</p>
      </div>
      <EventParties />
      <UpcomingParties />
      <OngoingParties />
      <ClosedParties />
    </div>
  );
}
