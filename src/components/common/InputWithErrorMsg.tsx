import { ComponentPropsWithoutRef } from "react";
import Input from "./Input";
import { twMerge } from "tailwind-merge";

interface InputWithErrorMsgProps extends ComponentPropsWithoutRef<"input"> {
  error: string | null;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputWithErrorMsg({
  error,
  value,
  onChange,
  className,
  ...props
}: InputWithErrorMsgProps) {
  return (
    <div className="flex flex-col gap-2 lg:gap-4 w-full">
      <Input
        value={String(value)}
        onChange={onChange}
        className={twMerge(
          error && "border border-site-alarm duration-200 transition-colors",
          className,
        )}
        {...props}
      />
      {error && (
        <span
          key={error}
          className="text-site-alarm text-sm lg:text-base animate-slide-down"
        >
          {error}
        </span>
      )}
    </div>
  );
}
