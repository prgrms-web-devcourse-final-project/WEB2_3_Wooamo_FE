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
