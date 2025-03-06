"use client";

import InputIcon from "@/components/common/InputIcon";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

export default function BoardSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prevKeyword = searchParams.get("title");

  const timer = useRef<NodeJS.Timeout | null>(null);
  const [keyword, setKeyword] = useState(prevKeyword ?? "");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      const trimmedValue = value.trim();

      const params = new URLSearchParams();

      if (trimmedValue) {
        params.set("title", trimmedValue);
      }
      params.set("page", "0");

      const url = `/boards?${params.toString()}`;
      console.log("검색 URL:", url);
      router.push(url);
    }, 200);
  };

  return (
    <InputIcon
      value={keyword}
      onChange={handleSearch}
      Icon={SearchRoundedIcon}
      placeholder="게시글 제목을 검색해주세요"
      autoComplete="off"
    />
  );
}
