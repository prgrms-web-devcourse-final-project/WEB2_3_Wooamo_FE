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
  userId: number;
  nickname: string;
  context: string;
  profile: string;
}
