import OrangeTurtle from "@/assets/images/costumes/orangeTurtle.png";
import Image from "next/image";

export default function ParticipantItem() {
  return (
    <div className="w-40 px-5 py-5 bg-site-white-50 rounded-sm flex flex-col gap-4 items-center">
      <div className="w-18 h-18 bg-site-white-100 rounded-full">
        <Image src={OrangeTurtle} alt="사용자 아바타 이미지" />
      </div>
      <div className="text-xs font-galmuri line-clamp-2">
        @사용자 닉네임이 길어지면 어쩌지? 말줄임표~
      </div>
    </div>
  );
}
