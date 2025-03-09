"use client";

import ChattingItem from "../../ChattingItem";
import { useSearchParams } from "next/navigation";
import { chattingApi } from "@/api/chatting/chatting";
import { useInfiniteChatting } from "@/hooks/useInfiniteChatting";
import { useRef } from "react";
import ProfileSummary from "@/components/common/ProfileSummary";
import LoadingSpinner from "../../LoadingSpinner";
import BasicSkeleton from "@/components/common/skeletons/BasicSkeleton";

export default function ChattingList({ userId }: { userId: number }) {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { setTarget, chatMessages, isPending, roomInfo } =
    useInfiniteChatting<privateChatType>({
      chatEndRef,
      roomId,
      onIntersect: chattingApi.getChattingMessages,
    });

  return (
    <div>
      <div className="fixed w-full top-15 lg:top-25 left-0 bg-site-button py-2 lg:py-5 px-5 lg:px-8 z-10">
        {roomInfo ? (
          <ProfileSummary
            nickname={roomInfo.userInfo.nickname}
            description={roomInfo.userInfo.context}
            userId={roomInfo.userInfo.userId}
            costume={roomInfo.userInfo.profile ?? ""}
          />
        ) : (
          <BasicSkeleton className="lg:h-10" count={1} />
        )}
      </div>

      {isPending ? <LoadingSpinner /> : <div ref={setTarget}></div>}
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
      <div ref={chatEndRef} />
    </div>
  );
}
