"use client";

import InputIcon from "@/components/common/InputIcon";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function PartySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("name");

  const [keyword, setKeyword] = useState(searchValue ?? "");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    if (value) {
      router.push(`/party/all?name=${value}`);
    } else {
      router.push(`/party/all`);
    }
  };

  return (
    <InputIcon
      value={keyword}
      onChange={handleSearch}
      Icon={SearchRoundedIcon}
      className="mb-7.5 lg:mb-13"
    />
  );
}
