import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { twMerge } from "tailwind-merge";

export default function Jandy({ studyTime }: { studyTime: studyTimeType }) {
  const hour = Number(studyTime.studyTime.split(":")[0]);
  const minute = Number(studyTime.studyTime.split(":")[1]);
  const second = Number(studyTime.studyTime.split(":")[2]);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          key={studyTime.studyDate}
          className={twMerge(
            "w-full h-9 bg-white/50",
            (hour >= 1 || minute >= 1 || (minute > 0 && second >= 1)) &&
              "bg-[#FBF3B9]",
            hour >= 2 && "bg-[#FFDCCC]",
            hour >= 4 && "bg-[#FDB7EA]",
            hour >= 6 && "bg-[#B7B1F2",
          )}
        ></div>
      </TooltipTrigger>
      <TooltipContent className="bg-site-darkgray-02">
        <p>{studyTime.studyDate}</p>
        <p className="text-center">{studyTime.studyTime}</p>
      </TooltipContent>
    </Tooltip>
  );
}
