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
      inputRef.current?.focus();
    }
  }, [autoFocus]);
  return (
    <input
      ref={inputRef}
      value={value}
      onChange={onChange}
      className={twMerge(
        "flex justify-center items-center w-full h-15 bg-site-white-70 px-6 rounded-full text-xl",
        className,
      )}
      {...props}
    />
  );
}
