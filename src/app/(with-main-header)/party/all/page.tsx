"use client";

import Link from "next/link";
import Button from "../../../../components/common/Button";
import InputIcon from "@/components/common/InputIcon";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PartyItem from "../PartyItem";
import { useState } from "react";

export default function PartyAll() {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-7">
        <p className="font-galmuri text-[28px]">전체</p>
        <Link href={"/party/create"}>
          <Button>팟 생성</Button>
        </Link>
      </div>
      <InputIcon
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        Icon={SearchRoundedIcon}
        onClickIcon={() => console.log("검색")}
        className="mb-13"
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center font-semibold text-xl">
          <p className="flex-5">팟</p>
          <p className="flex-2">인원</p>
          <p className="flex-3">시작일</p>
        </div>
        {[1, 2, 3].map((_, index) => (
          <PartyItem key={index} />
        ))}
      </div>
    </div>
  );
}
