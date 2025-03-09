import { RefObject, useCallback, useEffect, useState } from "react";
import { chattingApi } from "../api/chatting/chatting";
import { useSocketStore } from "@/store/socketStore";
import { useUserStore } from "@/store/userStore";

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
  }, [roomId, onIntersect, lastChatId]);

  useEffect(() => {
    loadChatMessages();
  }, []);

  useEffect(() => {
    if (lastAddType === "prepend") {
      const container = document.body.children[0].children[1];
      container.scrollTo({
        top: 108.8 * receivedDataLength,
      });
    } else {
      const container = document.body.children[0].children[1];
      const isAtBottom =
        container.scrollHeight - container.scrollTop - 108 ===
        container.clientHeight;

      if (
        isAtBottom &&
        (lastAddType === "appendByMe" || lastAddType === "appendByOther")
      ) {
        chatEndRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [chatEndRef, lastAddType, receivedDataLength, data]);

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
      rootMargin,
      threshold,
    });
    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [
    root,
    rootMargin,
    onIntersect,
    threshold,
    target,
    hasNextPage,
    lastChatId,
    roomId,
    isPending,
    loadChatMessages,
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

      stompClient.subscribe(`/topic/read/${user.userId}`, async (message) => {
        const readUser: responseType<{ userId: string }> = JSON.parse(
          message.body,
        );
        console.log("readUser: ", readUser.data);

        const newChatMessages = await chattingApi.refreshChatMessages(
          roomId,
          lastChatId,
        );
        if (newChatMessages?.status === "성공") {
          setData(newChatMessages.data);
        }
      });

      join(roomId, user.userId);
    };

    subscribeChatMessages();
    return () => {
      if (roomId) leave(roomId, user.userId);
      disconnect();
    };
  }, [roomId, connect, disconnect, join, user, leave, chatEndRef, lastChatId]);

  return { setTarget, chatMessages: data, isPending, roomInfo } as const;
};
