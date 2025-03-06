"use client";

import Button from "@/components/common/Button";
import Link from "next/link";
import BoardSearch from "./BoardSearch";

export default function BoardsHeader() {
  return (
    <div className="flex flex-col gap-4 lg:gap-7">
      <div className="flex items-center justify-between">
        <p className="font-galmuri text-xl lg:text-[28px]">전체</p>
        <Link href={"boards/create"}>
          <Button type="button">글쓰기</Button>
        </Link>
      </div>
      <BoardSearch />
    </div>
  );
}
