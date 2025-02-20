import Button from "@/components/common/Button";
import Link from "next/link";

export default function ChattingHeader() {
  return (
    <div className="flex justify-between items-center px-5 lg:px-0">
      <p className="font-galmuri text-xl lg:text-[28px]">전체</p>
      <Link href={"/chatting/create"}>
        <Button>새 채팅</Button>
      </Link>
    </div>
  );
}
