import StudyTimeJandy from "./StudyTimeJandy";
import PostsByUser from "./PostsByUser";
import UserProfile from "./UserProfile";
import Image from "next/image";
import WhiteDividerShort from "@/assets/images/WhiteDividerShort.svg";
import { userApi } from "@/api/user/user";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import PostItemSkeleton from "@/components/common/skeletons/PostItemSkeleton";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: UserDetailProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${id}`,
  );
  const user: responseType<userType> = await response.json();
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: user.data.nickname,
    openGraph: {
      images: [user.data.profile || "", ...previousImages],
    },
  };
}

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/topranking`,
  );
  const users: responseType<topRankingUserInfo[]> = await response.json();

  return users.data.map((user) => ({
    id: String(user.userId),
  }));
}

interface UserDetailProps {
  params: Promise<{ id: string }>;
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
  const userId = Number(id);
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
      <UserProfile userId={userId} />
      <Image
        src={WhiteDividerShort}
        alt="구분선 이미지"
        className="block lg:hidden"
      />
      <section className="flex flex-col w-full lg:w-206 gap-7.5 lg:gap-13">
        <StudyTimeJandy userId={userId} year={year} month={month} />
        <div>
          <Suspense fallback={<PostItemSkeleton count={3} />}>
            <PostsByUser userId={userId} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
