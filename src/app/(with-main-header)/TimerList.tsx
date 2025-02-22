import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";

export default function TimerList() {
  return (
    <div className="flex justify-between px-2.5 lg:px-7 py-4 bg-site-white-100">
      <div className="flex gap-3 items-center">
        <div className="text-xl">미적분 사랑해</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-xl">00:00:00</div>
        <Button className="bg-transparent lg:px-0">
          <Icon MuiIcon={MoreHorizRoundedIcon} />
        </Button>
      </div>
    </div>
  );
}
