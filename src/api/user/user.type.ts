/* eslint-disable @typescript-eslint/no-unused-vars */
interface getUserInfoReq {
  userId: number;
}
interface getUserInfoRes {
  status: string;
  data: {
    userId: number;
    context: string;
    link: string;
    nickname: string;
    point: number;
    profile: string;
  };
}
