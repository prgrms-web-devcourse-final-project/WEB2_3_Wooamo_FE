import Button from "@/components/common/Button";
import Link from "next/link";
import BoardSearch from "./BoardSearch";
import { userApi } from "@/api/user/user";

export default async function BoardsHeader() {
  const userInfo = await userApi.getCurrentUserInfo();
  return (
    <div className="flex flex-col gap-4 lg:gap-7">
      <div className="flex items-center justify-between">
        <p className="font-galmuri text-xl lg:text-[28px]">전체</p>
        <Link href={userInfo?.data ? "/boards/create" : "/signin"}>
          <Button type="button">글쓰기</Button>
        </Link>
      </div>
      <BoardSearch />
    </div>
  );
}
