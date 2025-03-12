"use client";

import { revalidateTagAction } from "@/actions";
import { friendApi } from "@/api/friend/friend";
import { userApi } from "@/api/user/user";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";

export default function FriendRequestButton({
  user,
}: {
  user: userType | PartyParticipantType;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      revalidateTagAction(`user-update-${user.userId}`);
    }
  };

  const deleteFriend = async () => {
    setIsRequestFriend(false);

    if (!friendId) return;
    const res = await friendApi.deleteFriend(friendId);
    if (res?.status === "성공") {
      setFriendId(null);
      setStatus("NOT_FRIEND");
      revalidateTagAction(`user-update-${user.userId}`);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const isLoggedIn = await userApi.checkIsLoggedIn();
      if (isLoggedIn?.status === "성공") {
        setIsLoggedIn(isLoggedIn.data);
      }
    };

    fetchCurrentUser();
  }, []);

  return isRequestFriend ? (
    <Button onClick={deleteFriend}>
      {status === "FRIEND" || status === "ACCEPTED" ? "삭제" : "요청취소"}
    </Button>
  ) : (
    <Button onClick={requestFriend} disabled={!isLoggedIn && status === null}>
      친구요청
    </Button>
  );
}
