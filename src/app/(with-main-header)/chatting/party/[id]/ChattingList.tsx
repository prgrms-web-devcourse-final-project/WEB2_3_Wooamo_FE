"use client";

import { useSocketStore } from "@/store/socketStore";
import ChattingItem from "../../ChattingItem";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { chattingApi } from "@/api/chatting/chatting";

export default function ChattingList({ userId }: { userId: number }) {
  const { connect, disconnect, join, leave } = useSocketStore();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [groupInfo, setGroupInfo] = useState<groupType>();

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
      stompClient.subscribe(`/topic/users/${roomId}`, (message) => {
        const groupDetail: responseType<groupType> = JSON.parse(message.body);
        console.log("groupInfo: ", groupDetail.data);
        setGroupInfo(groupDetail.data);
      });
      stompClient.subscribe(`/topic/messages/${roomId}`, (message) => {
        const chatMessages: responseType<ChatMessageType> = JSON.parse(
          message.body,
        );
        console.log("chatMessages: ", chatMessages);
        setChatMessages((prev) => [...prev, chatMessages.data]);
      });
      join(roomId, userId);
    };

    subscribeChatMessages();
    return () => {
      if (roomId) leave(roomId, userId);
      disconnect();
    };
  }, [roomId, connect, disconnect, join, userId, leave]);

  return (
    <div>
      <div className="fixed flex items-center h-20 lg:h-25 w-full top-15 lg:top-25 left-0 bg-site-button px-8 text-base lg:text-xl font-semibold z-10">
        <span>{groupInfo?.groupName}</span>|
        <span>{groupInfo?.totalMembers}명</span>
      </div>
      {chatMessages.map((chatMessage) => (
        <ChattingItem
          key={chatMessage.chatId}
          chatTime={chatMessage.createdAt}
          nickname={chatMessage.userInfo.nickname}
          isMe={chatMessage.userInfo.userId === userId}
          chatting={chatMessage.message}
          profile={chatMessage.userInfo.profile}
          unreadCount={chatMessage.readByCount}
        />
      ))}
    </div>
  );
}
