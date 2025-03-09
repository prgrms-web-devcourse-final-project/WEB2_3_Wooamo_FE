import Link from "next/link";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Icon from "../../../components/common/Icon";
import Image from "next/image";
import WhiteDividerLongLong from "@/assets/images/WhiteDividerLongLong.svg";
import WhiteDividerShort from "@/assets/images/WhiteDividerShort.svg";
import FriendsItem from "./FriendsItem";
import FriendsRequestItem from "./FriendsRequestItem";
import { Suspense } from "react";
import { friendApi } from "@/api/friend/friend";
import FriendItemSkeleton from "@/components/common/skeletons/FriendItemSkeleton";
import { userApi } from "@/api/user/user";

export default async function Friends() {
  const user = await userApi.getCurrentUserInfo();
  if (!user) return null;

  const friends = await friendApi.getUserFriends(user.data.userId);
  const requestFriends = await friendApi.getRequestFriends();

  if (!friends || !requestFriends) return null;
  return (
    <div className="flex flex-col gap-5 lg:gap-8 items-center px-5 lg:px-0">
      <section className="flex flex-col w-full gap-5 lg:gap-8">
        <p className="flex items-center gap-2.5 font-galmuri text-xl lg:text-2xl">
          <span>친구요청</span>
          <span>{requestFriends.data.totalElements}</span>
        </p>
        <div className="flex flex-col">
          <Suspense fallback={<FriendItemSkeleton count={3} />}>
            {requestFriends.data.contents.length === 0 ? (
              <div className="h-19 lg:h-25 flex justify-center items-center">
                <p className="text-site-darkgray-02">친구 요청이 없습니다.</p>
              </div>
            ) : (
              requestFriends.data.contents.map((friend) => (
                <FriendsRequestItem
                  key={`requestFriends-${friend.friendId}`}
                  friend={friend}
                />
              ))
            )}
          </Suspense>
        </div>
      </section>

      <Image
        src={WhiteDividerShort}
        alt="짧은 구분선 이미지"
        className="block lg:hidden"
      />
      <Image
        src={WhiteDividerLongLong}
        alt="긴 구분선 이미지"
        className="hidden lg:block"
      />

      <section className="flex flex-col w-full gap-5 lg:gap-8">
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-2.5 font-galmuri text-xl lg:text-2xl">
            <span>친구</span>
            <span>{friends.data.totalElements}</span>
          </p>
          <Link href={"/friends/add"}>
            <Icon MuiIcon={AddRoundedIcon} />
          </Link>
        </div>
        <div className="flex flex-col">
          <Suspense fallback={<FriendItemSkeleton count={3} />}>
            {friends.data.contents.length === 0 ? (
              <div className="h-19 lg:h-25 flex justify-center items-center">
                <p className="text-site-darkgray-02">친구가 없습니다.</p>
              </div>
            ) : (
              friends.data.contents.map((friend) => (
                <FriendsItem key={`friends-${friend.userId}`} friend={friend} />
              ))
            )}
          </Suspense>
        </div>
      </section>
    </div>
  );
}
