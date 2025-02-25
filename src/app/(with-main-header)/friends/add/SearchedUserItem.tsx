import { friendApi } from "@/api/friend/friend";
import { revalidateTagAction } from "@/app/actions";
import Button from "@/components/common/Button";
import ProfileSummary from "@/components/common/ProfileSummary";
import { useState } from "react";

export default function SearchedUserItem({ user }: { user: userType }) {
  const [isRequestFriend, setIsRequestFriend] = useState(false);
  const [friendId, setFriendId] = useState<number | null>(null);

  const requestFriend = async () => {
    const res = await friendApi.requestFriend(user.userId);
    if (res?.status === "성공") {
      setFriendId(res.data.friendId);
      setIsRequestFriend(true);
      revalidateTagAction("friends");
    }
  };

  const deleteFriend = async () => {
    if (!friendId) return;

    const res = await friendApi.deleteFriend(friendId);
    if (res?.status === "성공") {
      setFriendId(null);
      setIsRequestFriend(false);
      revalidateTagAction("friends");
    }
  };
  return (
    <article className="h-19 lg:h-25 flex justify-between items-center">
      <ProfileSummary
        userId={user.userId}
        costume={user.profile}
        nickname={user.nickname}
        description={user.context}
      />
      {isRequestFriend ? (
        <Button onClick={deleteFriend}>취소</Button>
      ) : (
        <Button onClick={requestFriend}>친구요청</Button>
      )}
    </article>
  );
}
