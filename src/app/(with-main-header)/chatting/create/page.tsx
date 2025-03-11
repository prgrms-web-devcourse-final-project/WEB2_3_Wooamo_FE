import { friendApi } from "@/api/friend/friend";
import { userApi } from "@/api/user/user";
import FriendList from "./FriendList";

export default async function ChattingCreate() {
  const user = await userApi.getCurrentUserInfo();
  if (!user) return;

  const friends = await friendApi.getUserFriends(user.data.userId);
  if (!friends) return;
  return (
    <div className="flex flex-col gap-13 px-5 lg:px-0">
      <div className="flex justify-between">
        <p className="font-galmuri text-xl lg:text-[28px]">친구 선택</p>
      </div>
      <div className="flex flex-col gap-6">
        <FriendList myUserId={user.data.userId} friends={friends.data} />
      </div>
    </div>
  );
}
