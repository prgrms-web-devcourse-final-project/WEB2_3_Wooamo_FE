import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={twMerge(
        "flex justify-center items-center w-fit h-11 lg:h-15 lg:text-xl px-4 lg:px-6 bg-site-button rounded-full font-galmuri ",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
