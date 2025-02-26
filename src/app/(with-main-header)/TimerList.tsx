import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";

interface TimerListProps {
  timerId: number;
  categoryId: number;
  name: string;
  studyDate: string;
  studyTime: string;
}

export default function TimerList({
  timerId,
  categoryId,
  name,
  studyDate,
  studyTime,
}: TimerListProps) {
  return (
    <div className="flex justify-between px-2.5 lg:px-7 py-4 bg-site-white-100">
      <div className="flex gap-3 items-center">
        <div className="text-xl">{name}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-xl">{studyTime}</div>
        <Button className="bg-transparent lg:px-0">
          <Icon MuiIcon={MoreHorizRoundedIcon} />
        </Button>
      </div>
    </div>
  );
}
