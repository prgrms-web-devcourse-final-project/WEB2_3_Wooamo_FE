import Character from "@/components/common/Character";
import { costumes } from "@/consts/costumes";
import Image from "next/image";
import BlueDividerLong from "@/assets/images/BlueDividerLong.svg";
import basic from "@/assets/images/costumes/basic.png";
import spotlight from "@/assets/images/spotlight.png";

export default function ClosetTab() {
  return (
    <div className="flex gap-17 px-8">
      <div className="relative min-w-117 h-184">
        <Image
          src={spotlight}
          alt="캐릭터를 비추는 스포트라이트 이미지"
          className="-translate-y-20 h-184"
          sizes="100%"
          fill
        />
        <Character costumeSrc={basic} className="h-119" />
      </div>
      <section className="flex flex-col items-center w-full gap-8">
        <Image src={BlueDividerLong} alt="파란 구분선 이미지" />
        <section className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 auto-rows-auto w-full justify-items-center gap-6 h-120 overflow-auto">
          {costumes.map((costume, index) => (
            <button
              key={`costume-${index}`}
              className="flex items-end w-56 h-56"
            >
              <article className="bg-site-white-70 rounded-[10px] relative hover:drop-shadow-6.2 transition-all">
                <Image src={costume} alt="코스튬 입은 아바타 미리보기 이미지" />
              </article>
            </button>
          ))}
        </section>
      </section>
    </div>
  );
}
