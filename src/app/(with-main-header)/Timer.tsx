import TimerList from "./TimerList";
import TimerCategory from "./TimerCategory";
import TimerPlayer from "./TimerPlayer";

export default function Timer() {
  return (
    <section className="w-full lg:w-120 flex flex-col gap-4">
      <TimerCategory />
      <div className="px-3 py-3 bg-site-button rounded-lg">
        <TimerPlayer />
        <div className="flex flex-col gap-3">
          {new Array(5).fill(0).map((_, idx) => (
            <TimerList key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
