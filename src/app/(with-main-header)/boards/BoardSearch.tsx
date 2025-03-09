"use client";

import InputIcon from "@/components/common/InputIcon";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

export default function BoardSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prevKeyword = searchParams.get("title");

  const [keyword, setKeyword] = useState(prevKeyword ?? "");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    const trimmedValue = value.trim();
    if (trimmedValue) {
      router.push(`?title=${trimmedValue}`);
    } else {
      router.push(`/boards`);
    }
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
