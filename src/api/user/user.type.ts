/* eslint-disable @typescript-eslint/no-unused-vars */
interface getUserInfoReq {
  userId: number;
}

interface getUserInfoRes {
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
