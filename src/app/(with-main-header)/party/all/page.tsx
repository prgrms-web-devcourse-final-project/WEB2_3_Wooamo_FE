"use client";

import Link from "next/link";
import Button from "../../../../components/common/Button";
import InputIcon from "@/components/common/InputIcon";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PartyItem from "../PartyItem";
import { FormEvent, useState } from "react";

export default function PartyAll() {
  const [keyword, setKeyword] = useState("");

  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("팟 검색");
  };
  return (
    <form onSubmit={search} className="flex flex-col">
      <div className="px-5 lg:px-0">
        <div className="flex justify-between items-center mb-5 lg:mb-7">
          <p className="font-galmuri text-xl lg:text-[28px]">전체</p>
          <Link href={"/party/create"}>
            <Button type="button">팟 생성</Button>
          </Link>
        </div>
        <InputIcon
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          Icon={SearchRoundedIcon}
          className="mb-7.5 lg:mb-13"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center font-semibold lg:text-xl px-5 lg:px-7">
          <p className="flex-5">팟</p>
          <p className="flex-2">인원</p>
          <p className="flex-3">시작일</p>
        </div>
        {[1, 2, 3].map((_, index) => (
          <PartyItem key={index} />
        ))}
      </div>
    </form>
  );
}
