"use client";

import { friendApi } from "@/api/friend/friend";
import { revalidateTagAction } from "@/actions";
import Button from "@/components/common/Button";
import { useRef, useState } from "react";

export default function FriendRequestButton({
  user,
}: {
  user: userType | PartyParticipantType;
}) {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [isRequestFriend, setIsRequestFriend] = useState(false);
  const [friendId, setFriendId] = useState<number | null>(null);

  const requestFriend = async () => {
    if (timer.current) clearTimeout(timer.current);
    setIsRequestFriend(true);

    timer.current = setTimeout(async () => {
      const res = await friendApi.requestFriend(user.userId);
      if (res?.data) {
        setFriendId(res.data.friendId);
      }
    }, 1000);
  };

  const deleteFriend = async () => {
    if (timer.current) clearTimeout(timer.current);
    setIsRequestFriend(false);

    timer.current = setTimeout(async () => {
      if (!friendId) return;

      const res = await friendApi.deleteFriend(friendId);
      if (res?.status === "성공") {
        setFriendId(null);
      }
    }, 1000);
  };
  return isRequestFriend ? (
    <Button onClick={deleteFriend}>취소</Button>
  ) : (
    <Button onClick={requestFriend}>친구요청</Button>
  );
}
