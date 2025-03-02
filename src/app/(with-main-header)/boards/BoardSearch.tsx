"use client";

import InputIcon from "@/components/common/InputIcon";
import useDebounce from "@/hooks/useDebounce";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function BoardSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("title");

  const [keyword, setKeyword] = useState(searchValue ?? "");
  const debouncedValue = useDebounce(keyword, 200);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
  };

  useEffect(() => {
    if (debouncedValue) {
      router.push(`/boards?title=${debouncedValue}`);
    } else {
      router.push("/boards");
    }
  }, [debouncedValue, router]);

  useEffect(() => {
    const searchValue = searchParams.get("title");
    if (searchValue) {
      setKeyword(searchValue);
    }
  }, [searchParams]);

  return (
    <InputIcon
      value={keyword}
      onChange={handleSearch}
      Icon={SearchRoundedIcon}
      placeholder="게시글 제목을 검색해주세요"
    />
  );
}
