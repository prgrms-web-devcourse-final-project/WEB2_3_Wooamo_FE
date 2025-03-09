import Avatar from "@/components/common/Avatar";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import Icon from "@/components/common/Icon";
import Link from "next/link";
import { userApi } from "@/api/user/user";
import RequestFriendButton from "./RequestFriendButton";

interface UserProfileProps {
  userId: number;
}

export default async function UserProfile({ userId }: UserProfileProps) {
  const user = await userApi.getUserInfo(userId);
  console.log(user);

  if (!user) return;
  return (
    <section className="flex flex-col min-w-full lg:min-w-92 gap-2.5 lg:gap-7 px-2.5">
      <p className="font-bitbitv2 text-2xl lg:text-[28px]">
        {user.data.nickname}
      </p>
      <div className="flex items-center lg:items-end gap-13">
        <Avatar
          costumeSrc={user.data.profile ?? ""}
          className="w-32.5 lg:w-40 h-32.5 lg:h-40"
        />
        <div className="flex flex-col justify-end items-center gap-6 lg:gap-7.5">
          <Link
            href={`/friends/${userId}`}
            className="font-galmuri text-xl lg:text-2xl w-fit"
          >
            <span className="mr-3">친구</span>
            <span className="text-site-darkgray-02">{user.data.friends}</span>
          </Link>
          <RequestFriendButton
            userId={userId}
            status={user.data.status}
            friendId={user.data.friendId}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{user.data.context}</p>
        {user.data.link && (
          <Link
            href={user.data.link}
            className="flex items-center"
            target="_blank"
          >
            <Icon MuiIcon={LinkRoundedIcon} />
            <span className="font-semibold ml-1.5">{user.data.link}</span>
          </Link>
        )}
      </div>
    </section>
  );
}
