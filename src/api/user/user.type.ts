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
  profile: string;
}

interface topRankingUserInfo {
  nickname: string;
  studyTime: string;
}

interface costumeType {
  costumeId: number;
  image: string;
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
