import { SvgIconTypeMap } from "@mui/material";
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Input from "./Input";
import Icon from "./Icon";

interface InputIconProps extends ComponentPropsWithoutRef<"input"> {
  value: string | number;
  Icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">> & {
    muiName: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickIcon: () => void;
}

export default function InputIcon({
  value,
  placeholder,
  className,
  Icon: MuiIcon,
  onChange,
  onClickIcon,
  ...props
}: InputIconProps) {
  return (
    <div className={twMerge("relative", className)}>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      <button
        onClick={onClickIcon}
        className="absolute top-1/2 -translate-y-1/2 right-7 text-site-darkgray-02"
      >
        <Icon MuiIcon={MuiIcon} />
      </button>
    </div>
  );
}
