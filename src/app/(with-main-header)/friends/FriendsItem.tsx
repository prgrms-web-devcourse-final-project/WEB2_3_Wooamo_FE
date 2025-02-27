import ProfileSummary from "@/components/common/ProfileSummary";
import { delay } from "@/utils/delay";
import FriendDeleteButton from "./FriendDeleteButton";

export default async function FriendsItem({ friend }: { friend: friendType }) {
  await delay(5000);
  return (
    <article className="h-19 lg:h-25 flex justify-between items-center">
      <ProfileSummary
        userId={friend.userId}
        costume={friend.profile}
        nickname={friend.nickname}
        description={friend.context}
      />
      <FriendDeleteButton friend={friend} />
    </article>
  );
}
