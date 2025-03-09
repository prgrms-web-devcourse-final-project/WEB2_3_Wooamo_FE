"use client";

import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  className,
  value,
  onChange,
  autoFocus,
  ...props
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, [autoFocus]);
  return (
    <input
      ref={inputRef}
      value={value}
      onChange={onChange}
      className={twMerge(
        "flex justify-center items-center w-full h-11 lg:h-15 bg-site-white-70 px-5 lg:px-6 rounded-full text-base lg:text-xl",
        className,
      )}
      {...props}
    />
  );
}
