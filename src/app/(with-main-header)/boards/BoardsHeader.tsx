"use client";

import Button from "@/components/common/Button";
import InputIcon from "@/components/common/InputIcon";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function BoardsHeader() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/boards?keyword=${keyword}`);
  };

  return (
    <form onSubmit={search} className="flex flex-col gap-4 lg:gap-7">
      <div className="flex items-center justify-between">
        <p className="font-galmuri text-xl lg:text-[28px]">전체</p>
        <Link href={"boards/create"}>
          <Button type="button">글쓰기</Button>
        </Link>
      </div>
      <InputIcon
        placeholder="게시글 제목을 검색해주세요"
        Icon={SearchRoundedIcon}
        onClickIcon={() => console.log("검색")}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </form>
  );
}
