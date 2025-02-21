import OrangeTurtle from "@/assets/images/costumes/orangeTurtle.png";
import Character from "@/components/common/Character";

export default function UserCard() {
  return (
    <section className="flex justify-center">
      <div className="flex gap-10 items-center w-130 px-5 py-7 bg-site-button rounded-lg border-4 border-site-white-100">
        <div className="w-45 h-45 bg-site-profile rounded-full">
          <Character costumeSrc={OrangeTurtle} className="-translate-y-5" />
        </div>
        <div className="flex flex-col gap-5 font-galmuri text-2xl">
          <div className="font-bitbitv2 text-[28px]">@binnie</div>
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
