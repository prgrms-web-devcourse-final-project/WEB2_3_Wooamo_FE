import Link from "next/link";
import PartyItem from "./PartyItem";

export default function UpcomingParties() {
  return (
    <section className="flex flex-col gap-7 mt-15">
      <div className="flex justify-between items-end px-5 lg:px-0">
        <p className="font-galmuri text-xl lg:text-2xl">
          <span>시작 전인 팟</span>
          <span className="ml-3">6</span>
        </p>
        <Link
          href={"/party/all"}
          className="text-base lg:text-xl text-site-darkgray-01"
        >
          전체보기
        </Link>
      </div>
      <div className="flex flex-col gap-2.5 lg:gap-3">
        <div className="flex items-center font-semibold lg:text-xl px-5 lg:px-7">
          <p className="flex-5">팟</p>
          <p className="flex-2">인원</p>
          <p className="flex-3">시작일</p>
        </div>
        {[1, 2, 3].map((_, index) => (
          <PartyItem key={index} />
        ))}
      </div>
    </section>
  );
}
