/* eslint-disable @typescript-eslint/no-unused-vars */
interface friendType {
  friendId: number;
  userId: number;
  nickname: string;
  context: string;
  profile: string;
}

interface requestFriendType {
  friendId: number;
  senderId: number;
  profile: string;
  nickname: string;
  context: string;
  receiverId: number;
  status: string;
}

interface searchFriendsRes {
  status: statusType;
  data: friendType[];
}

interface requestFriendRes {
  status: statusType;
  data: {
    friendId: number;
    senderId: number;
    receiverId: number;
    status: string;
  };
}
