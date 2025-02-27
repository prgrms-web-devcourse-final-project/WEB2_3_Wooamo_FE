import ProfileSummary from "@/components/common/ProfileSummary";
import FriendAcceptDenyButton from "./FriendAcceptDenyButton";
import { delay } from "@/utils/delay";

export default async function FriendsRequestItem({
  friend,
}: {
  friend: requestFriendType;
}) {
  await delay(5000);
  return (
    <article className="h-19 lg:h-25 flex justify-between items-center">
      <ProfileSummary
        userId={friend.senderId}
        costume={friend.profile}
        nickname={friend.nickname}
        description={friend.context}
      />
      <FriendAcceptDenyButton friend={friend} />
    </article>
  );
}
