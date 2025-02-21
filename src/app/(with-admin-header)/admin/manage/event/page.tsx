import AddEvent from "./AddEvent";
import EventItem from "./EventItem";

export default function page() {
  return (
    <div>
      <AddEvent />
      <div className="flex flex-wrap gap-5 mt-5">
        {new Array(5).fill(0).map((_, idx) => (
          <EventItem key={idx} />
        ))}
      </div>
    </div>
  );
}
