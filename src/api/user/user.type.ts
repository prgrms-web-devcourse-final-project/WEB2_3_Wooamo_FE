/* eslint-disable @typescript-eslint/no-unused-vars */
interface getUserInfoReq {
  userId: number;
}

interface userInfoRes {
  status: statusType;
  data: userType;
}
interface userType {
  userId: number;
  context: string;
  link: string;
  nickname: string;
  point: number;
  profile: string;
}

interface userRankingRes {
  status: statusType;
  data: {
    ranking: number;
  };
}

interface getTopRankingRes {
  status: statusType;
  data: topRankingUserInfo[];
}

interface topRankingUserInfo {
  nickname: string;
  studyTime: string;
}

interface getCostumesRes {
  status: statusType;
  data: costumeType[];
}
interface costumeType {
  costumeId: number;
  image: string;
}

interface getUserPostsRes {
  status: statusType;
  data: postItemType[];
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
interface updateUserInfoRes {
  status: statusType;
  data: {
    profile: string;
  };
}
