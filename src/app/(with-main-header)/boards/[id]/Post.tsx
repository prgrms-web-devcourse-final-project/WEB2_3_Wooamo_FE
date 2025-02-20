import Avatar from "@/components/common/Avatar";
import Link from "next/link";
import basic from "@/assets/images/costumes/basic.png";
import PostDeleteButton from "./PostDeleteButton";

export default function Post() {
  return (
    <>
      <div className="border-b border-site-darkgray-02">
        <h1 className="flex items-center h-20 px-8 font-semibold text-xl">
          [자유] 진짜 공부하기 싫다
        </h1>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <Link href={"/users/1"} className="flex items-center gap-2.5">
            <Avatar costumeSrc={basic} />
            <span className="font-semibold">@sooya</span>
          </Link>
          <span className="font-semibold text-sm text-site-darkgray-02">
            1분전
          </span>
        </div>
        <p className="flex gap-2">
          <Link href={"/boards/1/update"}>수정</Link>
          <span>|</span>
          <PostDeleteButton />
        </p>
      </div>
      <div className="min-h-[200px] bg-site-white-70 px-6 py-5">
        오늘은 진짜 공부 하기 싫은 날이네요...
      </div>
    </>
  );
}
