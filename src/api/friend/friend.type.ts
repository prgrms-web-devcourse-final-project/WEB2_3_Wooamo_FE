/* eslint-disable @typescript-eslint/no-unused-vars */
interface getFriendsRes {
  status: statusType;
  data: {
    contents: friendType[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
}
interface friendType {
  friendId: number;
  userId: number;
  nickname: string;
  context: string;
  profile: string;
}

interface getRequestFriendsRes {
  status: statusType;
  data: {
    contents: requestFriendType[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
}
interface requestFriendType {
  friendId: number;
  senderId: number;
  profile: string;
  nickname: string;
  context: string;
}

interface searchFriendsRes {
  status: statusType;
  data: friendType[];
}

interface getUsersRes {
  status: statusType;
  data: userType[];
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
