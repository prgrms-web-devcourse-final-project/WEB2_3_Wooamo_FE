"use client";

import { friendApi } from "@/api/friend/friend";
import { revalidateTagAction } from "@/actions";
import Button from "@/components/common/Button";

export default function FriendAcceptDenyButton({
  friend,
}: {
  friend: requestFriendType;
}) {
  const acceptFriend = async () => {
    await friendApi.acceptFriend(friend.friendId);
    revalidateTagAction("friends");
  };

  const deleteFriend = async () => {
    await friendApi.deleteFriend(friend.friendId);
    revalidateTagAction("request-friends");
  };

  return (
    <div className="flex gap-2.5 lg:gap-5">
      <Button onClick={acceptFriend} className="bg-site-main text-white">
        수락
      </Button>
      <Button onClick={deleteFriend}>거절</Button>
    </div>
  );
}
