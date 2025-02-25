"use client";

import InputIcon from "@/components/common/InputIcon";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Image from "next/image";
import WhiteDividerLongLong from "@/assets/images/WhiteDividerLongLong.svg";
import { friendApi } from "@/api/friend/friend";
import SearchedUserItem from "./SearchedUserItem";

export default function FriendsAdd() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [keyword, setKeyword] = useState("");
  const [searchedUsers, setSearchedUsers] = useState<userType[]>([]);
  const [recommendedUsers, setRecommendedUsers] = useState<userType[]>([]);

  const search = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const keyword = e.target.value;
    setKeyword(keyword);

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      const users = await friendApi.search(keyword);
      if (users?.status === "성공") {
        setSearchedUsers(users.data);
      }
    }, 500);
  };

  useEffect(() => {
    const fetchRecommendedUsers = async () => {
      const users = await friendApi.getRecommendFriends();
      if (users?.status === "성공") {
        setRecommendedUsers(users.data);
      }
    };

    fetchRecommendedUsers();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 lg:gap-8">
      <section className="w-full">
        <div className="flex flex-col gap-4 lg:gap-7">
          <p className="h-11 lg:h-15 flex items-center font-galmuri text-xl lg:text-2xl">
            사용자 검색
          </p>
          <InputIcon
            value={keyword}
            onChange={search}
            Icon={SearchRoundedIcon}
            placeholder="사용자를 검색해주세요"
            autoCorrect="off"
          />
          <div className="flex flex-col">
            {searchedUsers.map((user) => (
              <SearchedUserItem key={`search-${user.userId}`} user={user} />
            ))}
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
          {recommendedUsers.map((user) => (
            <SearchedUserItem key={`recommend-${user.userId}`} user={user} />
          ))}
        </div>
      </section>
    </div>
  );
}
