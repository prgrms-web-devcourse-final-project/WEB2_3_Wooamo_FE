"use client";

import ChattingItem from "../../ChattingItem";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSocketStore } from "@/store/socketStore";
import { chattingApi } from "@/api/chatting/chatting";

export default function ChattingList({ userId }: { userId: number }) {
  const { connect, disconnect, join, leave } = useSocketStore();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    const getChatMessages = async () => {
      if (!roomId) return;
      const chatMessages = await chattingApi.getChattingMessages(roomId);
      if (!chatMessages) return;
      setChatMessages(chatMessages.data);
    };
    getChatMessages();
  }, [roomId]);

  useEffect(() => {
    const subscribeChatMessages = async () => {
      if (!roomId) return;
      const stompClient = await connect();
      join(roomId, userId);
      stompClient.subscribe(`/topic/messages/${roomId}`, (message) => {
        const chatMessages: responseType<ChatMessageType> = JSON.parse(
          message.body,
        );
        console.log("chatMessages: ", chatMessages);
        setChatMessages((prev) => [...prev, chatMessages.data]);
      });
    };

    subscribeChatMessages();
    return () => {
      if (roomId) leave(roomId, userId);
      disconnect();
    };
  }, [roomId, connect, disconnect, join, userId, leave]);

  return (
    <div>
      {chatMessages.map((chatMessage) => (
        <ChattingItem
          key={chatMessage.chatId}
          chatTime={chatMessage.createdAt}
          nickname={chatMessage.userInfo.nickname}
          isMe={chatMessage.userInfo.userId === userId}
          chatting={chatMessage.message}
          unreadCount={chatMessage.readByCount}
          profile={chatMessage.userInfo.profile}
        />
      ))}
    </div>
  );
}
