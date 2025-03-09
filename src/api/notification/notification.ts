import { fetchCustom } from "../fetchCustom";
import { EventSourcePolyfill } from "event-source-polyfill";

declare global {
  interface Window {
    eventSource?: EventSourcePolyfill;
  }
}

const getNotificationList = async () => {
  try {
    const response = await fetchCustom.get("/alert");

    if (response.status === 401) return null;
    if (!response.ok) {
      throw new Error("알림 목록을 불러오는데 실패했습니다.");
    }

    const data: responseType<notificationItem[]> = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

const markAllAsRead = async () => {
  try {
    const response = await fetchCustom.patch("/alert");

    if (!response.ok) {
      throw new Error("알림을 읽음 처리하는데 실패했습니다.");
    }

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

const markAsRead = async (alertId: string) => {
  try {
    const response = await fetchCustom.patch(`/alert/${alertId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "알림을 읽음 처리하는데 실패했습니다.",
      );
    }

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

const connectSSE = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const url = `${baseUrl}/sse/connect`;

  if (window.eventSource) {
    window.eventSource.close();
    delete window.eventSource;
  }

  try {
    await disconnectSSE();
    const response = await fetchCustom.get("/sse/connect");

    if (response.status === 401) {
      console.error("인증 오류: 알림 목록을 불러오는데 실패했습니다.");
      return null;
    }
    if (!response.ok) {
      throw new Error("SSE 연결 요청에 실패했습니다.");
    }
    const eventSource = await response.json();
    console.log(eventSource);
    // const eventSource = new EventSourcePolyfill(url, {
    //   withCredentials: true,
    // });

    // eventSource.onerror = (error) => {
    //   console.error("SSE 연결 에러:", error);
    //   if (eventSource.readyState === EventSourcePolyfill.CLOSED) {
    //     console.log("SSE 연결이 종료되었습니다.");
    //   }
    // };

    // eventSource.onopen = () => {
    //   console.log("SSE 연결이 성공적으로 설정되었습니다.");
    // };

    // window.eventSource = eventSource;
    // return eventSource;
  } catch (error) {
    console.error("SSE 연결 생성 중 에러:", error);
    return null;
  }
};

const disconnectSSE = async () => {
  try {
    // const currentSource = window.eventSource;
    // if (!currentSource) {
    //   console.log("이미 연결이 해제되었거나 연결이 없습니다.");
    //   return null;
    // }

    // if (currentSource.readyState === EventSourcePolyfill.CLOSED) {
    //   console.log("이미 연결이 종료되었습니다.");
    //   delete window.eventSource;
    //   return null;
    // }

    // currentSource.close();
    // delete window.eventSource;

    const response = await fetchCustom.get("/sse/disconnect");
    if (response.status === 401) {
      console.error("인증 오류: SSE 연결 해제에 실패했습니다.");
      return null;
    }
    if (!response.ok) {
      throw new Error("SSE 연결 해제에 실패했습니다.");
    }

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error("SSE 연결 해제 중 에러:", error);
    return null;
  }
};

export const notificationApi = {
  getNotificationList,
  markAllAsRead,
  markAsRead,
  connectSSE,
  disconnectSSE,
};
