import { adminApi } from "@/api/admin/admin";
import AddEvent from "./AddEvent";
import EventItem from "./EventItem";

export default async function page() {
  const fetchAllEventList = await adminApi.getAllEventList();
  const allEventList = fetchAllEventList?.data.contents;
  if (!allEventList) return;

  return (
    <div>
      <AddEvent />
      <div className="flex flex-wrap gap-5 mt-5">
        {allEventList.map((event) => (
          <EventItem
            key={event.partyId}
            image={event.image}
            name={event.name}
            point={event.bettingPointCap}
          />
        ))}
      </div>
    </div>
  );
}
