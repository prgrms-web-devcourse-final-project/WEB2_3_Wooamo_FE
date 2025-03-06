"use client";

import { friendApi } from "@/api/friend/friend";
import Button from "@/components/common/Button";
import { useState } from "react";

interface RequestFriendButtonProps {
  userId: number;
  status: "ACCEPTED" | "PENDING" | null;
  friendId: number | null;
}

export default function RequestFriendButton({
  userId,
  status,
  friendId: prevFriendId,
}: RequestFriendButtonProps) {
  const [isRequested, setIsRequested] = useState(!!status);
  const [friendId, setFriendId] = useState(prevFriendId);

  const requestFriend = async () => {
    const response = await friendApi.requestFriend(userId);
    if (response?.status === "성공") {
      setFriendId(response.data.friendId);
      setIsRequested((prev) => !prev);
    }
  };

  const deleteFriend = async () => {
    if (!friendId) return;
    const response = await friendApi.deleteFriend(friendId);
    if (response?.status === "성공") {
      setFriendId(null);
      setIsRequested((prev) => !prev);
    }
  };

  return isRequested ? (
    <Button onClick={deleteFriend}>요청취소</Button>
  ) : (
    <Button onClick={requestFriend}>친구요청</Button>
  );
}
