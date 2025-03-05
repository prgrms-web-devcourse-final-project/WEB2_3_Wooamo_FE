/* eslint-disable @typescript-eslint/no-unused-vars */
interface EventBannerType {
  image: string;
  partyId: number;
}

interface ScheduledPartyListContents {
  partyId: number;
  name: string;
  recruitCap: number;
  recruitCnt: number;
  startDate: string;
}

interface ActivePartyType {
  partyId: number;
  name: string;
  recruitCap: number;
  recruitCnt: number;
  endDate: string;
}

interface CompletedPartyType {
  partyId: number;
  name: string;
  rewordPoint: number;
  questStatus: string;
}

interface PartyDetailType {
  partyId: number;
  name: string;
  context: string;
  recruitCap: number;
  recruitCnt: number;
  startDate: string;
  endDate: string;
  bettingPointCap: number;
  isJoined: boolean;
}

interface PartyParticipantType {
  friendId: number | null;
  userId: number;
  nickname: string;
  profile: string;
  context: string;
  status: string;
}

interface postPartyCreateAndParticipateReq {
  name: string;
  context: string;
  recruitCap: number;
  startDate: string;
  endDate: string;
  bettingPointCap: number;
  userBettingPoint: number;
}
