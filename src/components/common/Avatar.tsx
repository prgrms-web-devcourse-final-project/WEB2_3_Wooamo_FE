import Image, { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";

interface AvatarProps {
  src: StaticImageData;
  alt?: string;
  className?: string;
}

export default function Avatar({ src, alt, className }: AvatarProps) {
  return (
    <div
      className={twMerge(
        "w-10 h-10 rounded-full border border-site-darkgray-02 overflow-hidden",
        className,
      )}
    >
      <Image src={src} alt={alt ?? "유저 프로필 이미지"} className="bg-cover" />
    </div>
  );
}
