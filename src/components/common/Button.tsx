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
        "flex justify-center items-center w-32 h-15 bg-site-button rounded-full font-galmuri text-xl",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
