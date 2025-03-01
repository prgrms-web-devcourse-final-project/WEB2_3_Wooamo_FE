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
  message?: string;
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
  memberId: number;
  profile: string;
  nickname: string;
  isAuth: string;
}

interface PartyDetailDataType {
  name: string;
  context: string;
  startDate: string;
  endDate: string;
  members: PartyMemberType[];
}

interface getPartyDetailRes {
  status: string;
  data: PartyDetailDataType;
}

interface getMemberCertificationRes {
  status: statusType;
  data: {
    image: string;
  };
}

interface patchConfirmCertificationReq {
  date: string;
  auth: boolean;
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

interface putCostumeEditReq {
  costumeName: string;
  point: number;
}
