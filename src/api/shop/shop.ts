import { fetchCustom } from "../fetchCustom";

const getCostumeList = async (page?: number) => {
  try {
    const response = await fetchCustom.get(`/costume?page=${page}&size=10`, {
      next: { tags: ["costume-list"] },
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: getCostumeListRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postCostumePurchase = async (body: postCostumePurchaseReq) => {
  try {
    const response = await fetchCustom.post(
      `/costume`,
      {
        body: JSON.stringify(body),
      },
      true,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postCostumeRandomPurchase = async (point = 100) => {
  try {
    const response = await fetchCustom.post(
      `/costume/random`,
      {
        body: JSON.stringify({ point }),
      },
      true,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: postCostumeRandomPurchaseRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postPointPurchase = async (body: postPointPurchaseReq) => {
  try {
    const response = await fetchCustom.post(
      `/payments`,
      {
        body: JSON.stringify(body),
      },
      true,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: postPointPurchaseRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postPointPurchaseConfirm = async (body: postPointPurchaseConfirmReq) => {
  try {
    const response = await fetchCustom.post(
      `/payments/confirm`,
      {
        body: JSON.stringify(body),
      },
      true,
    );
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
