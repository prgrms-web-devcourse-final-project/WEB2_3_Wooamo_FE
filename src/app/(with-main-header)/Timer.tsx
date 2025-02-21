import TimerList from "./TimerList";
import TimerCategory from "./TimerCategory";

export default function Timer() {
  return (
    <section className="w-120 flex flex-col gap-4">
      <TimerCategory />
      <div className="px-3 py-3 bg-site-button rounded-lg">
        <div className="flex flex-col gap-3">
          {new Array(5).fill(0).map((_, idx) => (
            <TimerList key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
