import Avatar from "@/components/common/Avatar";
import Link from "next/link";
import AvatarImg from "@/assets/images/avatar.png";

export default function Comment() {
  return (
    <article className="flex gap-2.5 items-center">
      <Link href="/users/1">
        <Avatar src={AvatarImg} className="w-14 h-14" />
      </Link>
      <div className="flex flex-col gap-1">
        <Link href="/users/1" className="w-fit">
          <p className="font-semibold text-xl ">@binnie</p>
        </Link>
        <p className="text-site-darkgray-02">
          아 저도 오늘 진짜 공부 하기가 싫더라구요 주말이라 그런가... 주말에도
          공부하는 습관을 들여야하는데...
        </p>
      </div>
    </article>
  );
}
