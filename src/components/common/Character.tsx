import Image, { StaticImageData } from "next/image";
import AvatarImg from "@/assets/images/avatar.png";
import { twMerge } from "tailwind-merge";

interface CharacterProps {
  costumeSrc: StaticImageData;
  className?: string;
}

export default function Character({ costumeSrc, className }: CharacterProps) {
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
        src={costumeSrc}
        alt={"유저 코스튬 이미지"}
        className="object-contain absolute bottom-0"
        sizes="100%"
        fill
        priority
      />
    </div>
  );
}
