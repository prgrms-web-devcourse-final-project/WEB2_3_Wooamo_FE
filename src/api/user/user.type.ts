/* eslint-disable @typescript-eslint/no-unused-vars */
interface getUserInfoReq {
  userId: number;
}

interface userInfoRes {
  status: statusType;
  data: {
    userId: number;
    context: string;
    link: string;
    nickname: string;
    point: number;
    profile: string;
  };
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
