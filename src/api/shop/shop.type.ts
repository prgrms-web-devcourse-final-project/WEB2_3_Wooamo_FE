/* eslint-disable @typescript-eslint/no-unused-vars */
interface CostumeType {
  costumeId: number;
  image: string;
  costumeName: string;
  point: number;
}

interface postCostumePurchaseReq {
  costumeId: number;
  point: number;
}

interface postPointPurchaseReq {
  amount: number;
  point: number;
}

interface paymentType {
  orderId: string;
  amount: number;
  point: number;
}

interface postPointPurchaseConfirmReq {
  orderId: string;
  paymentKey: string;
  amount: number;
  point: number;
}
