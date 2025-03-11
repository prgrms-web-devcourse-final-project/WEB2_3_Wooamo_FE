import { fetchCustom } from "../fetchCustom";

const getCostumeList = async () => {
  try {
    const response = await fetchCustom.get(`/costume`, {
      next: { tags: ["costume-update"] },
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<CostumeType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postCostumePurchase = async (body: postCostumePurchaseReq) => {
  try {
    const response = await fetchCustom.post(`/costume`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postCostumeRandomPurchase = async (point = 100) => {
  try {
    const response = await fetchCustom.post(`/costume/random`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ point }),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<CostumeType> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postPointPurchase = async (body: postPointPurchaseReq) => {
  try {
    const response = await fetchCustom.post(`/payments`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<paymentType> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postPointPurchaseConfirm = async (body: postPointPurchaseConfirmReq) => {
  try {
    const response = await fetchCustom.post(`/payments/confirm`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const shopApi = {
  getCostumeList,
  postCostumePurchase,
  postCostumeRandomPurchase,
  postPointPurchase,
  postPointPurchaseConfirm,
};
