import FriendsItem from "../FriendsItem";
import { friendApi } from "../../../../api/friend/friend";

interface UserFriendsProps {
  params: Promise<{ id: string }>;
}

export default async function UserFriends({ params }: UserFriendsProps) {
  const { id } = await params;
  const userId = parseInt(id);
  const friends = await friendApi.getUserFriends(userId);

  if (!friends) return;
  return (
    <section className="flex flex-col w-full gap-5 lg:gap-8 px-5 lg:px-8">
      <p className="flex items-center gap-2.5 font-galmuri text-xl lg:text-2xl">
        <span>친구</span>
        <span>{friends.data.length}</span>
      </p>
      <div className="flex flex-col">
        {friends.data.map((friend) => (
          <FriendsItem key={friend.friendId} friend={friend} />
        ))}
      </div>
    </section>
  );
}
