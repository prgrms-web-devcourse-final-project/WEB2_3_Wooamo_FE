"use client";

import { useSocketStore } from "@/store/socketStore";
import ChattingHeader from "./ChattingHeader";
import ChattingListItem from "./ChattingListItem";
import { useEffect, useState } from "react";
import { userApi } from "@/api/user/user";
import FriendItemSkeleton from "@/components/common/skeletons/FriendItemSkeleton";

export default function Chatting() {
  const { connect, disconnect, getRooms } = useSocketStore();
  const [isPending, setIsPending] = useState(true);
  const [rooms, setRooms] = useState<RoomType[]>([]);

  useEffect(() => {
    const connectAndGetRooms = async () => {
      const user = await userApi.getCurrentUserInfo();
      if (!user) return;

      const stompClient = await connect();
      stompClient.subscribe(`/topic/rooms/${user.data.userId}`, (message) => {
        const rooms: responseType<RoomType[]> = JSON.parse(message.body);
        console.log("rooms: ", rooms);
        setRooms(rooms.data);
        setIsPending(false);
      });
      getRooms(user.data.userId);
    };

    connectAndGetRooms();
    return () => disconnect();
  }, [connect, disconnect, getRooms]);

  if (isPending)
    return (
      <div className="flex flex-col gap-13">
        <ChattingHeader />
        <section className="flex flex-col">
          <FriendItemSkeleton className="h-20 lg:h-25 px-5 lg:px-8" count={3} />
        </section>
      </div>
    );
  return (
    <div className="flex flex-col gap-13">
      <ChattingHeader />
      <section className="flex flex-col">
        {rooms.length ? (
          rooms.map((chatting) => (
            <ChattingListItem
              key={`${chatting.roomType}-${chatting.roomId}`}
              roomId={chatting.roomId}
              roomType={chatting.roomType}
              roomName={chatting.roomName}
              lastMessage={chatting.lastMessage}
              unreadCount={chatting.unreadCount}
              userInfo={chatting.userInfo}
              groupInfo={chatting.groupInfo}
              createdAt={chatting.createdAt}
              lastUserInfo={chatting.lastUserInfo}
            />
          ))
        ) : (
          <div className="text-site-darkgray-02 lg:text-lg text-center my-6 lg:my-10">
            <p>채팅방이 없습니다</p>
          </div>
        )}
      </section>
    </div>
  );
}
