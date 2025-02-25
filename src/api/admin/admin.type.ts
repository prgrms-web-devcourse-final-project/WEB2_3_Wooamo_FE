interface getAdminWeeklyInfoRes {
  status: string;
  data: {
    weeklySignupUser: number;
    image: string;
    weeklyPointSales: number;
  };
}

interface getAdminRecentSalesRes {
  status: string;
  data: [
    {
      createdAt: string;
      nickname: string;
      amount: number;
      point: number;
    },
  ];
}

interface PartyDetailType {
  partyId: number;
  name: string;
  recruitCap: number;
  recruitCnt: number;
  startDate: string;
  endDate: string;
  isApproved: string;
}

interface getAllPartyListRes {
  status: string;
  data: {
    contents: PartyDetailType[];
    page: number;
    size: number;
    totalElementes: number;
    totalPages: number;
    hasNext: boolean;
  };
}

interface PartyMemberType {
  userId: number;
  profile: string;
  nickname: string;
  auth: string;
  isAuth: string;
}

interface getPartyDetailRes {
  status: string;
  data: {
    name: string;
    context: string;
    date: string[];
    members: PartyMemberType[];
  };
}

interface EventDetailType {
  partyId: number;
  image: string;
  name: string;
  bettingPointCap: number;
}

interface getAllEventListRes {
  status: string;
  data: {
    contents: EventDetailType[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
}

interface postEventCreateReq {
  party: {
    name: string;
    context: string;
    recruitCap: number;
    startDate: string;
    endDate: string;
    bettingPointCap: number;
  };
  image: File[];
}

interface postItemCreateReq {
  costumeName: string;
  point: number;
  image: File[];
}

interface putCostumeEditReq {
  costumeName: string;
  point: number;
}
