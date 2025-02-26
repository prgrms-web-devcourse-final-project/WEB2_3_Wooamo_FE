import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import StopCircleRoundedIcon from "@mui/icons-material/StopCircleRounded";
import Icon from "../../components/common/Icon";

export default function TimerPlayer() {
  return (
    <div className="flex justify-center items-center gap-7 mt-2 lg:mt-3 mb-5 lg:mb-6">
      <p className="text-[32px] text-site-darkgray-02 font-galmuri">00:00:00</p>
      <div className="flex items-center gap-3">
        <Icon MuiIcon={PlayCircleFilledRoundedIcon} />
        <Icon MuiIcon={StopCircleRoundedIcon} />
      </div>
    </div>
  );
}
