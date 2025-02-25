interface CostumeType {
  costumeId: number;
  image: string;
  costumeName: string;
  point: number;
}

interface getCostumeListRes {
  status: statusType;
  data: {
    contents: CostumeType[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
}

interface postCostumePurchaseReq {
  costumeId: number;
  point: number;
}

interface postCostumeRandomPurchaseRes {
  status: statusType;
  data: {
    image: string;
    costumeName: string;
  };
}

interface postPointPurchaseReq {
  amount: number;
  point: number;
}

interface postPointPurchaseRes {
  status: statusType;
  data: {
    orderId: number;
    paymentKey: string;
    amount: number;
    point: number;
  };
}
