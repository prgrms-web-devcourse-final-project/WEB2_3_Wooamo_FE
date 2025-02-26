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
