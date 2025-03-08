"use client";

import { friendApi } from "@/api/friend/friend";
import Button from "@/components/common/Button";
import { useState } from "react";

export default function FriendRequestButton({
  user,
}: {
  user: userType | PartyParticipantType;
}) {
  const [isRequestFriend, setIsRequestFriend] = useState(
    user.status && user.status !== "NOT_FRIEND",
  );
  const [status, setStatus] = useState(user.status);
  const [friendId, setFriendId] = useState<number | null>(user?.friendId);

  const requestFriend = async () => {
    setIsRequestFriend(true);

    const res = await friendApi.requestFriend(user.userId);
    if (res?.data) {
      setFriendId(res.data.friendId);
      setStatus("PENDING");
    }
  };

  const deleteFriend = async () => {
    setIsRequestFriend(false);

    if (!friendId) return;
    const res = await friendApi.deleteFriend(friendId);
    if (res?.status === "성공") {
      setFriendId(null);
      setStatus("NOT_FRIEND");
    }
  };
  return isRequestFriend ? (
    <Button onClick={deleteFriend}>
      {status === "FRIEND" ? "삭제" : "요청취소"}
    </Button>
  ) : (
    <Button onClick={requestFriend}>친구요청</Button>
  );
}
