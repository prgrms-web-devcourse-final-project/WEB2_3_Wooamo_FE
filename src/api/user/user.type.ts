/* eslint-disable @typescript-eslint/no-unused-vars */
interface getUserInfoReq {
  userId: number;
}

interface userType {
  userId: number;
  context: string;
  link: string;
  nickname: string;
  point: number;
  profile: string | null;
  friends: number;
  friendId: number | null;
  // NOT_FRIEND 및 FRIEND는 친구 API쪽의 응답으로 오는 status 값
  status: "ACCEPTED" | "PENDING" | "NOT_FRIEND" | "FRIEND" | null;
  role: "USER" | "ADMIN";
}

interface topRankingUserInfo {
  userId: number;
  nickname: string;
  studyTime: string;
  profile: string;
}

interface costumeType {
  entityId: number;
  newFileName: string;
}

interface postItemType {
  boardId: number;
  title: string;
  context: string;
  type: "질문" | "자유";
  createAt: string;
  image: string;
}

interface updateUserInfoReq {
  context: string;
  link: string;
}
