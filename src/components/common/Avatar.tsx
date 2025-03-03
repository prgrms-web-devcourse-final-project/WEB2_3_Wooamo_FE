import { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";
import Character from "./Character";
import basic from "@/assets/images/costumes/basic.png";

interface AvatarProps {
  costumeSrc: StaticImageData | string;
  className?: string;
}

export default function Avatar({ costumeSrc, className }: AvatarProps) {
  return (
    <div
      className={twMerge(
        "w-10 h-10 rounded-full bg-site-profile border border-site-lightgray overflow-hidden",
        className,
      )}
    >
      <Character
        costumeSrc={costumeSrc || basic}
        className="w-full h-full -translate-y-1/8"
      />
    </div>
  );
}
