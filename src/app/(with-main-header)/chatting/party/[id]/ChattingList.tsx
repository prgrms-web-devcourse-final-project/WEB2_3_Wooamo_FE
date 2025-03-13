"use client";

import { useInfiniteChatting } from "@/hooks/useInfiniteChatting";
import ChattingItem from "../../ChattingItem";
import { chattingApi } from "@/api/chatting/chatting";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import BasicSkeleton from "@/components/common/skeletons/BasicSkeleton";
import LoadingSpinner from "../../LoadingSpinner";
import ChattingInput from "../../ChattingInput";
import { useIsMobile } from "@/hooks/useIsMobile";
import Avatar from "@/components/common/Avatar";
import Icon from "@/components/common/Icon";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

export default function ChattingList({ userId }: { userId: number }) {
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const roomId = searchParams.get("roomId");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const {
    setTarget,
    sendMessage,
    chatMessages,
    isPending,
    roomInfo,
    lastChatMessage,
    setLastChatMessage,
  } = useInfiniteChatting<groupChatType>({
    chatEndRef,
    roomId,
    onIntersect: chattingApi.getChattingMessages,
  });

  const handleLastChatMessage = () => {
    if (lastChatMessage) {
      setLastChatMessage(null);
      chatEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!lastChatMessage) return;
    const container = document.body.children[0].children[1];

    const handleScroll = () => {
      const chatHeight = isMobile ? 104 : 108;

      const isAtBottom =
        container.scrollHeight - container.scrollTop - chatHeight <=
        container.clientHeight;

      if (isAtBottom) {
        setLastChatMessage(null);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [lastChatMessage, isMobile, setLastChatMessage]);

  return (
    <>
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
      {lastChatMessage && (
        <button
          onClick={handleLastChatMessage}
          className="flex justify-between items-center fixed bottom-18 lg:bottom-24 w-[calc(100%-4rem)] lg:w-120 h-12 lg:h-14 left-1/2 -translate-x-1/2 bg-site-button px-5 rounded-xl shadow-md animate-show-toast"
        >
          <div className="flex items-center gap-2 lg:gap-2.5 text-sm lg:text-base relative">
            <Avatar
              costumeSrc={lastChatMessage.userInfo.profile ?? ""}
              className="w-8 h-8 lg:w-10 lg:h-10"
            />
            <p className="min-w-fit font-semibold">
              {lastChatMessage.userInfo.nickname} :
            </p>
            <p className="line-clamp-1">{lastChatMessage.message}</p>
          </div>
          <Icon MuiIcon={KeyboardArrowDownRoundedIcon} />
        </button>
      )}
      <ChattingInput sendMessage={sendMessage} />
    </>
  );
}
