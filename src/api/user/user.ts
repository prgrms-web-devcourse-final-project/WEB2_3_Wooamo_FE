import { fetchCustom } from "../fetchCustom";

const getCurrentUserInfo = async () => {
  try {
    const response = await fetchCustom.get(`/user`, {
      next: { tags: ["point-update", "user"] },
      cache: "force-cache",
    });
    if (response.status === 401) return null;
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType<userType> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getUserInfo = async (userId: number) => {
  try {
    const response = await fetchCustom.get(`/user/${userId}`, {
      next: { tags: [`user-${userId}`] },
      cache: "force-cache",
    });
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType<userType> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCurrentUserRanking = async () => {
  try {
    const response = await fetchCustom.get(`/user/ranking`);
    if (response.status === 401) return null;
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType<{ ranking: number }> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getTopRanking = async () => {
  try {
    const response = await fetchCustom.get(`/user/topranking`);
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType<topRankingUserInfo[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCurrentUserCostumes = async () => {
  try {
    const response = await fetchCustom.get(`/user/costume`);
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType<costumeType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getUserPosts = async (userId: number) => {
  try {
    const response = await fetchCustom.get(`/user/board/${userId}`, {
      cache: "force-cache",
      next: { tags: [`myPost-update-${userId}`, `myPost-create-${userId}`] },
    });
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType<boardItem[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateUserInfo = async (body: updateUserInfoReq) => {
  try {
    const response = await fetchCustom.put(`/user`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateUserCostume = async (costumeId: number) => {
  try {
    const response = await fetchCustom.patch(`/user/costume/${costumeId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType<{ profile: string }> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const userApi = {
  getCurrentUserInfo,
  getUserInfo,
  getCurrentUserRanking,
  getTopRanking,
  getCurrentUserCostumes,
  getUserPosts,
  updateUserInfo,
  updateUserCostume,
};
