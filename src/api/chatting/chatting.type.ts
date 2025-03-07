/* eslint-disable @typescript-eslint/no-unused-vars */
interface RoomType {
  roomId: string;
  roomType: string;
  roomName: string;
  lastMessage: string;
  createdAt: string;
  profile: string;
  unreadCount: number;
  userInfo: userType | null;
  groupInfo: groupType | null;
  lastUserInfo: userType | null;
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

interface groupType {
  groupId: number;
  groupName: string;
  totalMembers: number;
}

interface groupChatType {
  groupInfo: groupType;
}
