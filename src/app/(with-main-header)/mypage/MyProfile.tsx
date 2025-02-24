import Avatar from "@/components/common/Avatar";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import Icon from "@/components/common/Icon";
import Link from "next/link";
import ProfileEditButton from "./ProfileEditButton";
import { useEffect, useState } from "react";
import { userApi } from "@/api/user/user";
import { friendApi } from "@/api/friend/friend";

export default function MyProfile() {
  const [user, setUser] = useState<userType | null>(null);
  const [friendsLength, setFriendsLength] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const userPromise = userApi.getCurrentUserInfo();
      const friendsPromise = friendApi.getFriends();

      const [user, friends] = await Promise.all([userPromise, friendsPromise]);
      if (user) setUser(user.data);
      if (friends) setFriendsLength(friends.data.totalElements);
    };
    fetchUser();
  }, []);

  if (!user) return null;
  return (
    <section className="flex flex-col min-w-full lg:min-w-92 gap-2.5 lg:gap-7 px-2.5">
      <p className="font-bitbitv2 text-2xl lg:text-[28px]">{user.nickname}</p>
      <div className="flex items-center lg:items-end gap-13">
        <Avatar
          costumeSrc={user.profile}
          className="w-32.5 lg:w-40 h-32.5 lg:h-40"
        />
        <div className="flex flex-col justify-end items-center gap-6 lg:gap-7.5">
          <div className="flex flex-col gap-2">
            <p className="font-galmuri text-xl lg:text-2xl">
              <span className="mr-3">포인트</span>
              <span className="text-site-darkgray-02">{user.point}p</span>
            </p>
            <p className="font-galmuri text-xl lg:text-2xl">
              <Link href={"/friends"} className="mr-3">
                친구
              </Link>
              <span className="text-site-darkgray-02">{friendsLength}</span>
            </p>
          </div>
          <ProfileEditButton setUser={setUser} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{user.context}</p>
        <Link href={user.link} className="flex items-center" target="_blank">
          <Icon MuiIcon={LinkRoundedIcon} />
          <span className="font-semibold ml-1.5">{user.link}</span>
        </Link>
      </div>
    </section>
  );
}
