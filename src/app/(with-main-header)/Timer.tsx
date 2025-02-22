import TimerList from "./TimerList";
import TimerCategory from "./TimerCategory";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import StopCircleRoundedIcon from "@mui/icons-material/StopCircleRounded";
import Icon from "../../components/common/Icon";

export default function Timer() {
  return (
    <section className="w-full lg:w-120 flex flex-col gap-4">
      <TimerCategory />
      <div className="px-3 py-3 bg-site-button rounded-lg">
        <div className="flex justify-center items-center gap-7 mt-2 lg:mt-3 mb-5 lg:mb-6">
          <p className="text-[32px] text-site-darkgray-02 font-galmuri">
            00:00:00
          </p>
          <div className="flex items-center gap-3">
            <Icon MuiIcon={PlayCircleFilledRoundedIcon} />
            <Icon MuiIcon={StopCircleRoundedIcon} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {new Array(5).fill(0).map((_, idx) => (
            <TimerList key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
