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
  return <MuiIcon className={twMerge("!w-7 !h-7", className)} />;
}
