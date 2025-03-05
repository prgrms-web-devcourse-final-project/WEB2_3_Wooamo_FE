/* eslint-disable @typescript-eslint/no-unused-vars */
interface RoomType {
  roomId: string;
  roomType: string;
  roomName: string;
  lastSenderId: number;
  lastMessage: string;
  createdAt: string;
  profile: string;
  unreadCount: number;
}

interface createPersonalChatRoomReq {
  userId1: number;
  userId2: number;
}

interface ChatMessageType {
  chatId: string;
  roomId: string;
  userInfo: userType;
  message: string;
  readByCount: number;
  createdAt: string;
}
