import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export default function Input({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={twMerge(
        "flex justify-center items-center w-full h-15 bg-site-white-70 px-6 rounded-full text-xl",
        className,
      )}
      {...props}
    />
  );
}
