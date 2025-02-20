import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { twMerge } from "tailwind-merge";

interface IconProps {
  MuiIcon: OverridableComponent<SvgIconTypeMap<unknown, "svg">> & {
    muiName: string;
  };
  className?: string;
}

export default function Icon({ MuiIcon, className }: IconProps) {
  return (
    <MuiIcon className={twMerge("lg:!w-7 lg:!h-7 text-[#1C1B1F]", className)} />
  );
}
