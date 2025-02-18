import { SvgIconTypeMap } from "@mui/material";
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Input from "./Input";
import Icon from "./Icon";

interface InputIconProps extends ComponentPropsWithoutRef<"input"> {
  Icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">> & {
    muiName: string;
  };
  onClickIcon: () => void;
}

export default function InputIcon({
  placeholder,
  className,
  Icon: MuiIcon,
  onClickIcon,
  ...props
}: InputIconProps) {
  return (
    <div className={twMerge("relative", className)}>
      <Input placeholder={placeholder} {...props} />
      <button
        onClick={onClickIcon}
        className="absolute top-1/2 -translate-y-1/2 right-7 text-site-darkgray-02"
      >
        <Icon MuiIcon={MuiIcon} />
      </button>
    </div>
  );
}
