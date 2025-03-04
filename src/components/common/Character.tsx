import Image from "next/image";
import AvatarImg from "@/assets/images/avatar.png";
import { twMerge } from "tailwind-merge";
import basic from "@/assets/images/costumes/basic.png";

interface CharacterProps {
  costumeSrc: string;
  className?: string;
}

export default function Character({ costumeSrc, className }: CharacterProps) {
  const modifiedProfile = costumeSrc.includes("null") ? basic : costumeSrc;
  return (
    <div className={twMerge("w-full h-46 relative", className)}>
      <Image
        src={AvatarImg}
        alt={"유저 프로필 이미지"}
        className="object-contain absolute bottom-0"
        sizes="100%"
        fill
        priority
      />
      <Image
        src={modifiedProfile || basic}
        alt={"유저 코스튬 이미지"}
        className="object-contain absolute bottom-0"
        sizes="100%"
        fill
        priority
      />
    </div>
  );
}
