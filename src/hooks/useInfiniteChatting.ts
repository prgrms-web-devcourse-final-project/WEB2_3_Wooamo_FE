import { RefObject, useCallback, useEffect, useState } from "react";
import { chattingApi } from "../api/chatting/chatting";
import { useUserStore } from "@/store/userStore";
import { useIsMobile } from "./useIsMobile";
import { WebSocketClient } from "@/components/common/WebSocketClient";

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
  const isMobile = useIsMobile();
  const { user } = useUserStore();

  const [websocketClient, setWebsocketClient] =
    useState<WebSocketClient | null>(null);
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

    const newChatMessages = await chattingApi.refreshChatMessages(
      roomId,
      lastChatId,
    );
    if (newChatMessages?.status === "성공") {
      console.log("newChatMessages", newChatMessages);
      setData(newChatMessages.data);
    }
  }, [roomId, lastChatId]);

  const sendMessage = (message: string) => {
    if (!websocketClient) return;

    websocketClient.publish(
      "/app/chat/send",
      JSON.stringify({
        roomId,
        userInfo: user,
        message,
      }),
    );
  };

  useEffect(() => {
    loadChatMessages();
  }, []);

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

      websocketClient.subscribe(`/topic/users/${roomId}`, (message) => {
        const roomInfo: responseType<T> = JSON.parse(message.body);
        console.log("roomInfo: ", roomInfo.data);
        setRoomInfo(roomInfo.data);
      });

      websocketClient.subscribe(`/topic/messages/${roomId}`, (message) => {
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

      websocketClient.subscribe(`/topic/read/${roomId}`, async (message) => {
        const readUser: responseType<{ userId: string }> = JSON.parse(
          message.body,
        );
        console.log("readUser: ", readUser.data);
        refreshChatMessages();
      });

      websocketClient.publish(
        "/app/chat/join",
        JSON.stringify({
          roomId,
          userId: user.userId,
        }),
      );
    };

    connectWebSocket();
    return () => {
      websocketClient.disconnect();
    };
  }, [refreshChatMessages, roomId, user, websocketClient]);

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
  }, [chatEndRef, data, isMobile, lastAddType, receivedDataLength]);

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

  return {
    setTarget,
    sendMessage,
    chatMessages: data,
    isPending,
    roomInfo,
  } as const;
};
