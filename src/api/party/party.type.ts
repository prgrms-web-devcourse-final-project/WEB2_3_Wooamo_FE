interface EventBannerType {
  image: string;
  partyId: number;
}

interface getEventBannerRes {
  status: statusType;
  data: EventBannerType[];
}

interface ScheduledPartyListContents {
  partyId: number;
  name: string;
  recruitCap: number;
  recruitCnt: number;
  startDate: string;
}

interface getScheduledPartyListRes {
  status: statusType;
  data: {
    contents: ScheduledPartyListContents[];
    page: number;
    size: number;
    totalElementes: number;
    totalPages: number;
    hasNext: boolean;
  };
}

interface ActivePartyType {
  partyId: number;
  name: string;
  recruitCap: number;
  recruitCnt: number;
  endDate: string;
}

interface getActivePartyList {
  status: statusType;
  data: ActivePartyType[];
}

interface CompletedPartyType {
  partyId: number;
  name: string;
  rewordPoint: number;
  questStatus: string;
}

interface getCompletedPartyListRes {
  status: statusType;
  data: CompletedPartyType[];
}

interface getPartyPageDetailRes {
  status: statusType;
  data: {
    partyId: number;
    name: string;
    context: string;
    recruitCap: number;
    recruitCnt: number;
    startDate: string;
    endDate: string;
    bettingPointCap: number;
    isJoined: boolean;
  };
}

interface PartyParticipantType {
  userId: string;
  userName: string;
  profile: string;
  context: string;
  isFriend: boolean;
}

interface getPartyParticipantListRes {
  status: statusType;
  data: {
    content: PartyParticipantType[];
    page: number;
    size: number;
    totalElementes: number;
    totalPages: number;
    hasNext: boolean;
  };
}
