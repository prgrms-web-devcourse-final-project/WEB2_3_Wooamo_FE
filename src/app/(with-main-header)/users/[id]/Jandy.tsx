import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { twMerge } from "tailwind-merge";

export default function Jandy({ studyTime }: { studyTime: studyTimeType }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          key={studyTime.studyDate}
          className={twMerge(
            "w-full h-9 bg-white/50",
            Number(studyTime.studyTime.split(":")[2]) >= 1 && "bg-[#C0D9EF]",
            Number(studyTime.studyTime.split(":")[0]) >= 2 && "bg-[#9EC1E2]",
            Number(studyTime.studyTime.split(":")[0]) >= 4 && "bg-[#5D8FC8]",
            Number(studyTime.studyTime.split(":")[0]) >= 6 && "bg-site-main",
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
