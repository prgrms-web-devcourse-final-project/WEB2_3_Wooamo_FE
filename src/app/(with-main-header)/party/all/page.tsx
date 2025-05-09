import Link from "next/link";
import Button from "../../../../components/common/Button";
import PartySearch from "./PartySearch";
import { Suspense } from "react";
import BasicSkeleton from "@/components/common/skeletons/BasicSkeleton";
import { userApi } from "@/api/user/user";
import PartyItems from "./PartyItems";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "STUV - 파티",
};

interface PartyAllProps {
  searchParams: Promise<{ name: string; page: string }>;
}

export default async function PartyAll({ searchParams }: PartyAllProps) {
  const { name, page } = await searchParams;

  const user = await userApi.getCurrentUserInfo();

  return (
    <div className="flex flex-col">
      <div className="px-5 lg:px-0">
        <div className="flex justify-between items-center mb-5 lg:mb-7">
          <p className="font-galmuri text-xl lg:text-[28px]">전체</p>
          <Link href={"/party/create"}>
            <Button type="button" disabled={!user}>
              팟 생성
            </Button>
          </Link>
        </div>
        <PartySearch />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center font-semibold lg:text-xl px-5 lg:px-7">
          <p className="flex-5">팟</p>
          <p className="flex-2">인원</p>
          <p className="flex-3">시작일</p>
        </div>
        <Suspense key={name} fallback={<BasicSkeleton count={3} />}>
          <PartyItems name={name} page={page} />
        </Suspense>
      </div>
    </div>
  );
}
