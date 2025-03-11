"use client";

import ChattingHeader from "./ChattingHeader";
import ChattingListItem from "./ChattingListItem";
import { useEffect, useState } from "react";
import FriendItemSkeleton from "@/components/common/skeletons/FriendItemSkeleton";
import { WebSocketClient } from "@/components/common/WebSocketClient";
import { useUserStore } from "@/store/userStore";

export default function Chatting() {
  const { user } = useUserStore();

  const [websocketClient, setWebsocketClient] =
    useState<WebSocketClient | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [rooms, setRooms] = useState<RoomType[]>([]);

  useEffect(() => {
    const client = new WebSocketClient();
    setWebsocketClient(client);

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!websocketClient || !user) return;

    const connectWebSocket = async () => {
      await websocketClient.connect();

      websocketClient.subscribe(`/topic/rooms/${user.userId}`, (message) => {
        const rooms: responseType<RoomType[]> = JSON.parse(message.body);
        console.log("rooms: ", rooms);
        setRooms(rooms.data);
        setIsPending(false);
      });

      websocketClient.publish(
        "/app/chat/list/join",
        JSON.stringify({
          userId: user.userId,
        }),
      );
    };

    connectWebSocket();
    return () => {
      websocketClient.disconnect();
    };
  }, [user, websocketClient]);

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
