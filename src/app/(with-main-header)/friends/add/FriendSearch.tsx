"use client";

import InputIcon from "@/components/common/InputIcon";
import { ChangeEvent, useRef, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRouter, useSearchParams } from "next/navigation";

export default function FriendSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prevKeyword = searchParams.get("keyword");

  const timer = useRef<NodeJS.Timeout | null>(null);
  const [keyword, setKeyword] = useState(prevKeyword ?? "");

  const search = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const keyword = e.target.value;
    setKeyword(keyword);

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      router.push(`/friends/add?keyword=${keyword}`);
    }, 500);
  };
  return (
    <>
      <p className="h-11 lg:h-15 flex items-center font-galmuri text-xl lg:text-2xl">
        사용자 검색
      </p>
      <InputIcon
        value={keyword}
        onChange={search}
        Icon={SearchRoundedIcon}
        placeholder="사용자를 검색해주세요"
        autoCorrect="off"
      />
    </>
  );
}
