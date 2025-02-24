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
