import PostsByUser from "../users/[id]/PostsByUser";
import StudyTimeJandy from "../users/[id]/StudyTimeJandy";
import MyProfile from "./MyProfile";
import Image from "next/image";
import WhiteDividerShort from "@/assets/images/WhiteDividerShort.svg";
import { Suspense } from "react";
import PostItemSkeleton from "@/components/common/skeletons/PostItemSkeleton";
import { userApi } from "@/api/user/user";

interface ProfileTabProps {
  year: number;
  month: number;
}

export default async function ProfileTab({ year, month }: ProfileTabProps) {
  const user = await userApi.getCurrentUserInfo();
  if (!user) return;
  return (
    <div className="flex flex-col lg:flex-row lg:justify-center items-center lg:items-start gap-12.5 lg:gap-20 px-5 lg:px-8">
      <MyProfile />
      <div>
        <Image
          src={WhiteDividerShort}
          alt="구분선 이미지"
          className="block lg:hidden"
        />
      </div>
      <section className="flex flex-col w-full lg:w-206 gap-7.5 lg:gap-13">
        <StudyTimeJandy userId={user.data.userId} year={year} month={month} />
        <div>
          <Suspense fallback={<PostItemSkeleton count={3} />}>
            <PostsByUser userId={user.data.userId} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
