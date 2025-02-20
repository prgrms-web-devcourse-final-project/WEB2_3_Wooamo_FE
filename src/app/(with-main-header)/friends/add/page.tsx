"use client";

import InputIcon from "@/components/common/InputIcon";
import { FormEvent, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FriendsItem from "../FriendsItem";
import Image from "next/image";
import WhiteDividerLongLong from "@/assets/images/WhiteDividerLongLong.svg";

export default function FriendsAdd() {
  const [keyword, setKeyword] = useState("");

  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("사용자 검색");
  };

  return (
    <div className="flex flex-col items-center gap-5 lg:gap-8">
      <section className="w-full">
        <form onSubmit={search} className="flex flex-col gap-4 lg:gap-7">
          <p className="h-11 lg:h-15 flex items-center font-galmuri text-xl lg:text-2xl">
            사용자 검색
          </p>
          <InputIcon
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            Icon={SearchRoundedIcon}
            placeholder="사용자를 검색해주세요"
          />
          <div className="flex flex-col">
            {[1, 2, 3, 4].map((_, index) => (
              <FriendsItem key={index} />
            ))}
          </div>
        </form>
      </section>

      <Image
        src={WhiteDividerLongLong}
        alt="긴 구분선 이미지"
        className="fill-site-main"
      />

      <section className="flex flex-col w-full gap-4 lg:gap-7">
        <p className="font-galmuri text-xl lg:text-2xl">추천 친구</p>
        <div className="flex flex-col">
          {[1, 2, 3, 4].map((_, index) => (
            <FriendsItem key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
