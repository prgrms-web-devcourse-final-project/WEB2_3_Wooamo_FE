"use client";

import Button from "@/components/common/Button";
import InputIcon from "@/components/common/InputIcon";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRouter } from "next/navigation";

export default function BoardsHeader() {
  const router = useRouter();
  return (
    <section className="flex flex-col gap-7">
      <div className="flex justify-between">
        <p className="font-galmuri text-[28px]">전체</p>
        <Button onClick={() => router.push("/boards/create")}>글쓰기</Button>
      </div>
      <InputIcon
        placeholder="게시글 제목을 검색해주세요"
        Icon={SearchRoundedIcon}
        onClickIcon={() => console.log("검색")}
      />
    </section>
  );
}
