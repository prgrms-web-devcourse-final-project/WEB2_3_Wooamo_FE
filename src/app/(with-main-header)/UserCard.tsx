import OrangeTurtle from "@/assets/images/costumes/orangeTurtle.png";
import Character from "@/components/common/Character";

export default function UserCard() {
  return (
    <section className="flex justify-center">
      <div className="flex gap-4 lg:gap-10 items-center w-full lg:w-130 px-5 py-7 bg-site-button rounded-lg border-4 border-site-white-100">
        <div className="bg-site-profile rounded-full relative">
          <Character
            costumeSrc={OrangeTurtle}
            className="w-24 lg:w-45 h-24 lg:h-45 -translate-y-3 lg:-translate-y-5"
          />
        </div>
        <div className="flex flex-col gap-2.5 lg:gap-5 font-galmuri text-xl lg:text-2xl">
          <div className="font-bitbitv2 text-2xl lg:text-[28px]">@binnie</div>
          <div className="flex gap-2">
            <div>공부 시간</div>
            <div className="text-site-darkgray-02">00:00:00</div>
          </div>
          <div className="flex gap-2">
            <div>랭킹</div>
            <div className="text-site-darkgray-02">1000등</div>
          </div>
        </div>
      </div>
    </section>
  );
}
