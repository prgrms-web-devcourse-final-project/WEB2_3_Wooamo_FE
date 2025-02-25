const getCostumeList = async (page?: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/costume?page=${page}&size=10`,
      { next: { tags: ["costume-list"] } },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getCostumeListRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postCostumePurchase = async (body: postCostumePurchaseReq) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/costume`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
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
};
