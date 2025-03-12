import StudyTimeJandy from "./StudyTimeJandy";
import PostsByUser from "./PostsByUser";
import UserProfile from "./UserProfile";
import Image from "next/image";
import WhiteDividerShort from "@/assets/images/WhiteDividerShort.svg";
import { userApi } from "@/api/user/user";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import PostItemSkeleton from "@/components/common/skeletons/PostItemSkeleton";

interface UserDetailProps {
  params: Promise<{ id: number }>;
  searchParams: Promise<{
    year: number;
    month: number;
  }>;
}

export default async function UserDetail({
  params,
  searchParams,
}: UserDetailProps) {
  const { id } = await params;
  const { year: selectedYear, month: selectedMonth } = await searchParams;
  const currentUser = await userApi.getCurrentUserInfo();

  const currentDate = new Date();
  const year = selectedYear ?? currentDate.getFullYear();
  const month = selectedMonth ?? currentDate.getMonth() + 1;

  if (currentUser?.data.userId === Number(id)) {
    redirect("/mypage");
  }
  return (
    <div className="flex flex-col lg:flex-row lg:justify-center items-center lg:items-start gap-12.5 lg:gap-20 px-5 lg:px-8">
      <UserProfile userId={id} />
      <Image
        src={WhiteDividerShort}
        alt="구분선 이미지"
        className="block lg:hidden"
      />
      <section className="flex flex-col w-full lg:w-206 gap-7.5 lg:gap-13">
        <StudyTimeJandy userId={id} year={year} month={month} />
        <div>
          <Suspense fallback={<PostItemSkeleton count={3} />}>
            <PostsByUser userId={id} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
