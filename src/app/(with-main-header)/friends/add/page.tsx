import Image from "next/image";
import WhiteDividerLongLong from "@/assets/images/WhiteDividerLongLong.svg";
import { friendApi } from "@/api/friend/friend";
import SearchedUserItem from "./SearchedUserItem";
import FriendSearch from "./FriendSearch";
import { Suspense } from "react";
import FriendItemSkeleton from "@/components/common/skeletons/FriendItemSkeleton";
import SearchedUsers from "./SearchedUsers";

export default async function FriendsAdd({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;
  const recommendedUsers = await friendApi.getRecommendFriends();

  if (!recommendedUsers) return;
  return (
    <div className="flex flex-col items-center gap-5 lg:gap-8">
      <section className="w-full">
        <div className="flex flex-col gap-4 lg:gap-7">
          <FriendSearch />
          <div>
            <Suspense key={keyword} fallback={<FriendItemSkeleton count={3} />}>
              <SearchedUsers keyword={keyword} />
            </Suspense>
          </div>
        </div>
      </section>

      <Image
        src={WhiteDividerLongLong}
        alt="긴 구분선 이미지"
        className="fill-site-main"
      />

      <section className="flex flex-col w-full gap-4 lg:gap-7">
        <p className="font-galmuri text-xl lg:text-2xl">추천 친구</p>
        <div className="flex flex-col">
          <Suspense fallback={<FriendItemSkeleton count={3} />}>
            {recommendedUsers.data.map((user) => (
              <SearchedUserItem key={`recommend-${user.userId}`} user={user} />
            ))}
          </Suspense>
        </div>
      </section>
    </div>
  );
}
