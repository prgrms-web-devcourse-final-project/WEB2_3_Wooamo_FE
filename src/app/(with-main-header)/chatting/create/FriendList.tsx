"use client";

import { chattingApi } from "@/api/chatting/chatting";
import Avatar from "@/components/common/Avatar";
import { useRouter } from "next/navigation";

interface FriendListProps {
  friends: friendType[];
  myUserId: number;
}

export default function FriendList({ friends, myUserId }: FriendListProps) {
  const router = useRouter();
  console.log(friends);

  const createPersonalChatRoom = async (userId1: number, userId2: number) => {
    const roomId = await chattingApi.createPersonalChatRoom({
      userId1,
      userId2,
    });
    if (roomId?.status === "성공") {
      router.push(`/chatting/friend/${userId2}?roomId=${roomId.data}`);
    }
  };
  return (
    <>
      {friends.length === 0 ? (
        <p className="text-site-darkgray-02">친구가 없습니다</p>
      ) : (
        friends.map((friend) => (
          <button
            key={friend.friendId}
            onClick={() => createPersonalChatRoom(myUserId, friend.userId)}
          >
            <div className="flex items-center gap-2.5 lg:gap-4">
              <Avatar
                className="w-11 h-11 lg:w-15 lg:h-15"
                costumeSrc={friend.profile}
              />
              <div className="flex flex-col items-start gap-1">
                <span className="font-semibold lg:text-xl">
                  @{friend.nickname}
                </span>
                <span className="text-sm lg:text-base text-site-darkgray-02">
                  {friend.context}
                </span>
              </div>
            </div>
          </button>
        ))
      )}
      ;
    </>
  );
}
