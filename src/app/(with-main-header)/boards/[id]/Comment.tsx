import Avatar from "@/components/common/Avatar";
import Link from "next/link";
import basic from "@/assets/images/costumes/basic.png";

export default function Comment() {
  return (
    <article className="flex gap-2.5">
      <Link href="/users/1">
        <Avatar costumeSrc={basic} className="w-11 lg:w-14 h-11 lg:h-14" />
      </Link>
      <div className="flex flex-col lg:gap-1">
        <Link href="/users/1" className="w-fit">
          <p className="font-semibold lg:text-xl">@binnie</p>
        </Link>
        <p className="text-site-darkgray-02 text-sm lg:text-base">
          아 저도 오늘 진짜 공부 하기가 싫더라구요 주말이라 그런가... 주말에도
          공부하는 습관을 들여야하는데...
        </p>
      </div>
    </article>
  );
}
