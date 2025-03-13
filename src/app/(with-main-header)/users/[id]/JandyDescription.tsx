import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { twMerge } from "tailwind-merge";

interface JandyDescriptionProps {
  description: string;
  className?: string;
}

export default function JandyDescription({
  className,
  description,
}: JandyDescriptionProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={twMerge("w-4 h-4 lg:w-5 lg:h-5", className)}></div>
      </TooltipTrigger>
      <TooltipContent className="bg-site-darkgray-02">
        <p className="text-center">{description}</p>
      </TooltipContent>
    </Tooltip>
  );
}
