"use client";

import { ReactNode, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownProps {
  children: ReactNode;
  className?: string;
  onClose: () => void;
}

export default function Dropdown({
  children,
  className,
  onClose,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div
      ref={dropdownRef}
      className={twMerge(
        "w-25 lg:w-38.5 absolute top-10 lg:top-12 right-4 lg:right-0 bg-site-button rounded-lg shadow-sm z-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
