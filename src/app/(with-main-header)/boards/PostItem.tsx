import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/Logo.svg";
import formatDateToTimeAgo from "../../../utils/formatDateToTimeAgo";

export default function PostItem() {
  return (
    <Link href="/boards/1">
      <article className="flex justify-between items-center h-40 p-2.5 bg-site-white-70">
        <div className="flex flex-col gap-2.5 px-5">
          <p className="font-semibold line-clamp-1">진짜 공부하기 싫다</p>
          <p className="text-site-darkgray-02 line-clamp-1">
            오늘은 진짜 공부하기 싫은 날이네요...
          </p>
          <p className="text-site-darkgray-01 text-sm">
            {formatDateToTimeAgo(new Date())}
          </p>
        </div>
        <Image src={Logo} alt="STUV 로고 이미지" className="w-35 h-35" />
      </article>
    </Link>
  );
}
