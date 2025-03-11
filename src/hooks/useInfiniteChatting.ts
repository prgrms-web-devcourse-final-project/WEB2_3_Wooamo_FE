import { RefObject, useCallback, useEffect, useState } from "react";
import { chattingApi } from "../api/chatting/chatting";
import { useSocketStore } from "@/store/socketStore";
import { useUserStore } from "@/store/userStore";
import { useIsMobile } from "./useIsMobile";

interface UseInfiniteChattingProps extends IntersectionObserverInit {
  roomId: string | null;
  chatEndRef: RefObject<HTMLDivElement | null>;
  onIntersect: typeof chattingApi.getChattingMessages;
}

const DEFAULT_THRESHOLD = 1.0;
const DEFAULT_SIZE = 10;

export const useInfiniteChatting = <T>({
  root,
  rootMargin = "-200px 0px 0px 0px", // 헤더 height + 채팅방 정보 UI height
  roomId,
  threshold = DEFAULT_THRESHOLD,
  chatEndRef,
  onIntersect,
}: UseInfiniteChattingProps) => {
  const { connect, disconnect, join, leave } = useSocketStore();
  const isMobile = useIsMobile();
  const { user } = useUserStore();

  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const [lastChatId, setLastChatId] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [data, setData] = useState<ChatMessageType[]>([]);
  const [roomInfo, setRoomInfo] = useState<T | null>(null);
  const [receivedDataLength, setReceivedDataLength] = useState(0);
  const [isPending, setIsPending] = useState(true);
  const [lastAddType, setLastAddType] = useState<
    "prepend" | "appendByMe" | "appendByOther"
  >("prepend");

  const loadChatMessages = useCallback(async () => {
    if (!roomId) return;
    setIsPending(true);

    const res = await onIntersect(roomId, lastChatId, DEFAULT_SIZE);
    if (res?.status === "성공") {
      console.log("chattingMessages: ", res.data);
      if (res.data.length > 0) {
        setLastChatId(res.data[0].chatId);
      } else {
        setHasNextPage(false);
      }

      setData((prev) => [...res.data, ...prev]);
      setReceivedDataLength(res.data.length);
      setLastAddType("prepend");
    } else {
      setHasNextPage(false);
    }

    setIsPending(false);
  }, [roomId, lastChatId]);

  const refreshChatMessages = useCallback(async () => {
    if (!roomId) return;
    if (isPending) return setTimeout(refreshChatMessages, 100);

    const newChatMessages = await chattingApi.refreshChatMessages(
      roomId,
      lastChatId,
    );
    if (newChatMessages?.status === "성공") {
      console.log("newChatMessages", newChatMessages);
      setData(newChatMessages.data);
    }
  }, [roomId, isPending, lastChatId]);

  useEffect(() => {
    loadChatMessages();
  }, []);

  useEffect(() => {
    if (lastAddType === "prepend") {
      const container = document.body.children[0].children[1];
      const chatHeight = isMobile ? 104 : 108;
      container.scrollTo({
        top: chatHeight * receivedDataLength,
      });
    } else {
      const container = document.body.children[0].children[1];
      const chatHeight = isMobile ? 104 : 108;

      const isAtBottom =
        container.scrollHeight - container.scrollTop - chatHeight ===
        container.clientHeight;

      if (
        lastAddType === "appendByMe" ||
        (isAtBottom && lastAddType === "appendByOther")
      ) {
        chatEndRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [chatEndRef, lastAddType, receivedDataLength, data, isMobile]);

  useEffect(() => {
    if (!target) return;

    const debouncedOnIntersect: IntersectionObserverCallback = async ([
      { isIntersecting },
    ]) => {
      if (!isIntersecting || isPending || !hasNextPage) return;
      loadChatMessages();
    };

    const observer = new IntersectionObserver(debouncedOnIntersect, {
      root,
      rootMargin: isMobile ? "-140px 0px 0px 0px" : rootMargin,
      threshold,
    });
    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [
    root,
    rootMargin,
    target,
    threshold,
    hasNextPage,
    isPending,
    loadChatMessages,
    isMobile,
  ]);

  useEffect(() => {
    if (!roomId || !user) return;

    const subscribeChatMessages = async () => {
      const stompClient = await connect();

      stompClient.subscribe(`/topic/users/${roomId}`, (message) => {
        const roomInfo: responseType<T> = JSON.parse(message.body);
        console.log("roomInfo: ", roomInfo.data);
        setRoomInfo(roomInfo.data);
      });

      stompClient.subscribe(`/topic/messages/${roomId}`, (message) => {
        const chatMessage: responseType<ChatMessageType> = JSON.parse(
          message.body,
        );
        console.log("chatMessages: ", chatMessage);
        setData((prev) => [...prev, chatMessage.data]);

        if (chatMessage.data.userInfo.userId === user.userId) {
          setLastAddType("appendByMe");
        } else {
          setLastAddType("appendByOther");
        }
      });

      stompClient.subscribe(`/topic/read/${roomId}`, async (message) => {
        const readUser: responseType<{ userId: string }> = JSON.parse(
          message.body,
        );
        console.log("readUser: ", readUser.data);

        refreshChatMessages();
      });

      console.log(user);
      join(roomId, user.userId);
    };

    subscribeChatMessages();
    return () => {
      setTimeout(() => {
        leave(roomId, user.userId);
        disconnect();
      });
    };
  }, [roomId, user, connect, disconnect, join, leave]);

  return { setTarget, chatMessages: data, isPending, roomInfo } as const;
};
