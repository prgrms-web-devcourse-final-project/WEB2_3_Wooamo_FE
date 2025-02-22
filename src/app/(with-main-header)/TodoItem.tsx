import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";

export default function TodoItem() {
  return (
    <div className="flex justify-between px-2.5 lg:px-7 py-4 bg-site-white-100">
      <div className="flex gap-3 items-center relative">
        <input
          id="todo-checkbox"
          type="checkbox"
          className="appearance-none w-6 h-6 bg-site-button rounded-[3px]"
        />
        <CheckRoundedIcon className="absolute" />
        <label htmlFor="todo-checkbox" className="text-xl">
          미적분 사랑해
        </label>
      </div>
      <div>
        <Button className="bg-transparent lg:px-0">
          <Icon MuiIcon={MoreHorizRoundedIcon} />
        </Button>
      </div>
    </div>
  );
}
