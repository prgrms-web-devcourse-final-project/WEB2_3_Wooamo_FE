interface getAdminWeeklyInfoRes {
  weeklySignupUser: number;
  image: string;
  weeklyPointSales: number;
}

interface getAdminRecentSalesRes {
  createdAt: string;
  nickname: string;
  amount: number;
  point: number;
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

interface getMemberCertificationRes {
  image: string;
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
  contents: EventDetailType[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

interface putCostumeEditReq {
  costumeName: string;
  point: number;
}
