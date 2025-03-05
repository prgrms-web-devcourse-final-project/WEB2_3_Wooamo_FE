"use client";

import { useSocketStore } from "@/store/socketStore";
import ChattingHeader from "./ChattingHeader";
import ChattingListItem from "./ChattingListItem";
import { useEffect, useState } from "react";
import { userApi } from "@/api/user/user";

export default function Chatting() {
  const { connect, disconnect, getRooms } = useSocketStore();
  const [rooms, setRooms] = useState<RoomType[]>([]);

  useEffect(() => {
    const connectAndGetRooms = async () => {
      const user = await userApi.getCurrentUserInfo();
      if (!user) return;

      const stompClient = await connect();
      stompClient.subscribe(`/topic/rooms/${user.data.userId}`, (message) => {
        const rooms: responseType<RoomType[]> = JSON.parse(message.body);
        setRooms(rooms.data);
        console.log("rooms: ", rooms);
      });
      getRooms(user.data.userId);
    };

    connectAndGetRooms();
    return () => disconnect();
  }, [connect, disconnect, getRooms]);

  return (
    <div className="flex flex-col gap-13">
      <ChattingHeader />
      <section className="flex flex-col">
        {rooms ? (
          rooms.map((chatting) => (
            <ChattingListItem
              key={chatting.roomId}
              roomId={chatting.roomId}
              roomType={chatting.roomType}
              roomName={chatting.roomName}
              lastSenderId={chatting.lastSenderId}
              lastMessage={chatting.lastMessage}
              profile={chatting.profile}
              unreadCount={chatting.unreadCount}
            />
          ))
        ) : (
          <div className="text-site-darkgray-02">
            <p>채팅 목록이 없습니다</p>
            <p>다른 유저와 채팅을 시작해보세요!</p>
          </div>
        )}
      </section>
    </div>
  );
}
