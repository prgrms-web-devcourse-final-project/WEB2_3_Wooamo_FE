"use client";

import { useInfiniteChatting } from "@/hooks/useInfiniteChatting";
import ChattingItem from "../../ChattingItem";
import { chattingApi } from "@/api/chatting/chatting";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import BasicSkeleton from "@/components/common/skeletons/BasicSkeleton";
import LoadingSpinner from "../../LoadingSpinner";

export default function ChattingList({ userId }: { userId: number }) {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { setTarget, chatMessages, isPending, roomInfo } =
    useInfiniteChatting<groupChatType>({
      chatEndRef,
      roomId,
      onIntersect: chattingApi.getChattingMessages,
    });

  return (
    <div>
      <div className="fixed flex items-center gap-3 h-20 lg:h-25 w-full top-15 lg:top-25 left-0 bg-site-button px-8 text-base lg:text-xl z-10">
        {roomInfo ? (
          <>
            <span className="font-semibold">
              {roomInfo?.groupInfo.groupName}
            </span>
            <span className="text-site-darkgray-02">
              {roomInfo?.groupInfo.totalMembers}명
            </span>
          </>
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
          profile={chatMessage.userInfo.profile}
          unreadCount={chatMessage.readByCount}
        />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}
