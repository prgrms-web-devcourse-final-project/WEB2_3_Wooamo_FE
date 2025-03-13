import { getCookie } from "cookies-next";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useEffect, useRef, useState, useCallback } from "react";

export function useSSE(
  onNewNotification: (notification: notificationItem) => void,
) {
  const eventSource = useRef<EventSourcePolyfill | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("초기화");
  const retryCount = useRef(0);
  const maxRetries = 5;
  const lastPingTime = useRef<number>(Date.now());

  const connectSSE = useCallback(async () => {
    try {
      const accessToken = (await getCookie("accessToken")) || "";
      if (!accessToken) return;

      if (eventSource.current) {
        eventSource.current.close();
      }

      eventSource.current = new EventSourcePolyfill(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/sse/connect`,
        {
          headers: { access: accessToken },
          withCredentials: true,
          heartbeatTimeout: 60 * 1000 * 10,
        },
      );

      eventSource.current.onopen = () => {
        setConnectionStatus("연결됨");
        retryCount.current = 0;
        lastPingTime.current = Date.now();
      };

      eventSource.current.onmessage = (event) => {
        lastPingTime.current = Date.now();

        if (event.data === "ping" || event.data === "connected") {
          return;
        }

        try {
          const newMessage = JSON.parse(event.data);
          if (newMessage && typeof onNewNotification === "function") {
            onNewNotification(newMessage);
          }
        } catch (error) {
          console.warn("알림 메시지 파싱 실패:", error);
        }
      };

      eventSource.current.onerror = (error) => {
        console.error("SSE 연결 실패:", error);

        if (eventSource.current) {
          eventSource.current.close();
        }

        if (retryCount.current < maxRetries) {
          retryCount.current++;
          const retryDelay = Math.min(
            1000 * Math.pow(2, retryCount.current),
            10000,
          );
          console.log(
            `${retryDelay}ms 후 재연결 시도 (${retryCount.current}/${maxRetries})`,
          );

          setTimeout(() => {
            connectSSE();
          }, retryDelay);
        } else {
          setConnectionStatus("연결 실패");
        }
      };
    } catch (error) {
      console.error("SSE 초기화 실패:", error);
      setConnectionStatus("초기화 실패");
    }
  }, [onNewNotification]);

  useEffect(() => {
    let checkInterval: NodeJS.Timeout;

    const startConnectionCheck = () => {
      checkInterval = setInterval(() => {
        const now = Date.now();

        if (now - lastPingTime.current > 120000) {
          console.log("Heartbeat 타임아웃 - 재연결 시도");
          connectSSE();
          return;
        }

        if (eventSource.current?.readyState === EventSourcePolyfill.CLOSED) {
          console.log("연결 끊김 감지 - 재연결 시도");
          connectSSE();
        }
      }, 15000);
    };

    connectSSE();
    startConnectionCheck();

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      if (eventSource.current) {
        eventSource.current.close();
        eventSource.current = null;
      }
    };
  }, [connectSSE]);

  return {
    connectionStatus,
    reconnect: () => {
      retryCount.current = 0;
      connectSSE();
    },
  };
}
