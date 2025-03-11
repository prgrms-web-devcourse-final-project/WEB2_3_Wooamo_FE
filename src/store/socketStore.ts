import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { create } from "zustand";

interface sendMessageReq {
  roomId: string;
  userInfo: {
    userId: number;
    nickname: string;
    profile: string;
  };
  message: string;
}

interface SocketStore {
  stompClient: Client | null;
  sendMessage: (body: sendMessageReq) => void;
  connect: () => Promise<Client>;
  disconnect: () => void;
  join: (roomId: string, userId: number) => void;
  leave: (roomId: string, userId: number) => void;
  readMessage: (
    roomId: string,
    userId: number,
    page?: number,
    size?: number,
  ) => void;
  getRooms: (userId: number) => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  stompClient: null,
  sendMessage: (body: sendMessageReq) => {
    const stompClient = get().stompClient;
    if (!stompClient) return console.log("Not connected");

    stompClient.publish({
      destination: "/app/chat/send",
      body: JSON.stringify(body),
    });
  },
  connect: () => {
    const connectPromise = new Promise<Client>((resolve) => {
      const socket = new SockJS(process.env.NEXT_PUBLIC_SOCKET_URL);
      const stompClient = new Client({
        webSocketFactory: () => socket,
        debug: (str) => {
          console.log(str);
        },
        onConnect: () => {
          console.log("Connected");
          resolve(stompClient);
        },
        onStompError: (frame) => {
          console.error(`Broker reported error: ${frame.headers["message"]}`);
          console.error(`Additional details: ${frame.body}`);
        },
      });
      set({ stompClient });
      stompClient.activate();
    });

    return connectPromise;
  },
  disconnect: () => {
    const stompClient = get().stompClient;
    if (!stompClient) return;
    stompClient.deactivate();
    set({ stompClient: null });
  },
  join: (roomId: string, userId: number) => {
    const stompClient = get().stompClient;
    if (!stompClient) return;
    stompClient.publish({
      destination: "/app/chat/join",
      body: JSON.stringify({
        roomId,
        userId,
      }),
    });
  },
  leave: (roomId: string, userId: number) => {
    const stompClient = get().stompClient;
    if (!stompClient) return;
    stompClient.publish({
      destination: "/app/chat/leave",
      body: JSON.stringify({
        roomId,
        userId,
      }),
    });
  },
  readMessage: (roomId: string, userId: number, page = 0, size = 10) => {
    const stompClient = get().stompClient;
    if (!stompClient) return;
    stompClient.publish({
      destination: "/app/chat/read",
      body: JSON.stringify({
        roomId,
        userId,
        page,
        size,
      }),
    });
  },
  getRooms: (userId: number) => {
    const stompClient = get().stompClient;
    if (!stompClient) return;
    stompClient.publish({
      destination: "/app/chat/list/join",
      body: JSON.stringify({
        userId,
      }),
    });
  },
}));
