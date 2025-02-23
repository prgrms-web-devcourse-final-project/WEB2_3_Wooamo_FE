import Character from "@/components/common/Character";
import { costumes } from "@/consts/costumes";
import Image from "next/image";
import WhiteDividerLong from "@/assets/images/WhiteDividerLong.svg";
import basic from "@/assets/images/costumes/basic.png";
import spotlight from "@/assets/images/spotlight.png";
import WhiteDividerShort from "@/assets/images/WhiteDividerShort.svg";

export default function ClosetTab() {
  return (
    <div className="flex flex-col lg:flex-row gap-0 lg:gap-17 px-8 overflow-y-auto">
      <div className="relative w-full h-90 lg:w-117 lg:h-184 flex-shrink-0">
        <Image
          src={spotlight}
          alt="캐릭터를 비추는 스포트라이트 이미지"
          className="object-contain"
          sizes="100%"
          fill
        />
        <Character
          costumeSrc={basic}
          className="translate-y-[15%] h-58 lg:h-119"
        />
      </div>
      <section className="flex flex-col items-center w-full gap-5 lg:gap-8 lg:mt-28">
        <Image
          src={WhiteDividerLong}
          alt="흰 구분선 이미지"
          className="hidden lg:block"
        />
        <Image
          src={WhiteDividerShort}
          alt="흰 구분선 이미지"
          className="lg:hidden"
        />
        <section className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 auto-rows-auto w-full justify-items-center gap-4 lg:gap-6 h-120">
          {costumes.map((costume, index) => (
            <button
              key={`costume-${index}`}
              className="w-full aspect-square max-w-[224px]"
            >
              <article className="bg-site-white-70 rounded-[10px] relative hover:drop-shadow-6.2 transition-all h-full w-full">
                <Image
                  src={costume}
                  alt="코스튬 입은 아바타 미리보기 이미지"
                  className="w-full h-full object-contain"
                />
              </article>
            </button>
          ))}
        </section>
      </section>
    </div>
  );
}
