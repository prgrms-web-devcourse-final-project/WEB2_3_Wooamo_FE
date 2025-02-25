"use client";

import Link from "next/link";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Icon from "../../../components/common/Icon";
import Image from "next/image";
import WhiteDividerLongLong from "@/assets/images/WhiteDividerLongLong.svg";
import WhiteDividerShort from "@/assets/images/WhiteDividerShort.svg";
import FriendsItem from "./FriendsItem";
import FriendsRequestItem from "./FriendsRequestItem";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import { friendApi } from "@/api/friend/friend";

export default function Friends() {
  const isMobile = useIsMobile();

  const [friends, setFriends] = useState<friendType[]>([]);
  const [requestFriends, setRequestFriends] = useState<requestFriendType[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const friendsPromise = friendApi.getFriends();
      const requestFriendsPromise = friendApi.getRequestFriends();

      const [friends, requestFriends] = await Promise.all([
        friendsPromise,
        requestFriendsPromise,
      ]);
      if (friends) {
        setFriends(friends.data.contents);
      }
      if (requestFriends) {
        setRequestFriends(requestFriends.data.contents);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="flex flex-col gap-5 lg:gap-8 items-center">
      <section className="flex flex-col w-full gap-5 lg:gap-8">
        <p className="flex items-center gap-2.5 font-galmuri text-xl lg:text-2xl">
          <span>친구요청</span>
          <span>{requestFriends.length}</span>
        </p>
        <div className="flex flex-col">
          {requestFriends.map((friend) => (
            <FriendsRequestItem
              key={`requestFriends-${friend.friendId}`}
              friend={friend}
            />
          ))}
        </div>
      </section>

      <Image
        src={isMobile ? WhiteDividerShort : WhiteDividerLongLong}
        alt="긴 구분선 이미지"
      />

      <section className="flex flex-col w-full gap-5 lg:gap-8">
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-2.5 font-galmuri text-xl lg:text-2xl">
            <span>친구</span>
            <span>{friends.length}</span>
          </p>
          <Link href={"/friends/add"}>
            <Icon MuiIcon={AddRoundedIcon} />
          </Link>
        </div>
        <div className="flex flex-col">
          {friends.map((friend) => (
            <FriendsItem key={`friends-${friend.userId}`} friend={friend} />
          ))}
        </div>
      </section>
    </div>
  );
}
