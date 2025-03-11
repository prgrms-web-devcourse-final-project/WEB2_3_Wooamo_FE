import { Client, messageCallbackType } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export class WebSocketClient {
  client: Client;
  isConnected = false;
  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(process.env.NEXT_PUBLIC_SOCKET_URL),
      debug: function (str) {
        console.log("STOMP: " + str);
      },
      onConnect: () => {
        console.log("Connected to WebSocket");
        this.isConnected = true;
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
        this.isConnected = false;
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });
  }

  connect() {
    return new Promise<void>((resolve, reject) => {
      this.client.activate();

      this.client.onConnect = () => {
        this.isConnected = true;
        resolve();
      };

      this.client.onDisconnect = () => {
        this.isConnected = false;
      };

      this.client.onStompError = (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
        reject(new Error("STOMP error: " + frame.body));
      };
    });
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
    }
  }

  subscribe(destination: string, callback: messageCallbackType) {
    if (this.isConnected) {
      console.log("LISTENING ...", destination);
      return this.client.subscribe(destination, callback);
    } else {
      throw new Error("No active STOMP connection");
    }
  }

  publish(destination: string, body?: string) {
    if (this.isConnected) {
      console.log("PUBLISHING ...", destination);
      this.client.publish({ destination, body });
    } else {
      throw new Error("No active STOMP connection");
    }
  }
}
