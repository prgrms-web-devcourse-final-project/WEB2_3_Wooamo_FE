import { fetchCustom } from "../fetchCustom";

const getCurrentUserInfo = async () => {
  try {
    const response = await fetchCustom.get(`/user`, {
      next: { tags: ["point", "user"] },
      cache: "force-cache",
    });
    if (!response.ok) throw new Error(response.statusText);

    const data: userInfoRes = await response.json();
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

    const data: userInfoRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCurrentUserRanking = async () => {
  try {
    const response = await fetchCustom.get(`/user/ranking`, {}, true);
    if (!response.ok) throw new Error(response.statusText);

    const data: userRankingRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getTopRanking = async () => {
  try {
    const response = await fetchCustom.get(`/user/topranking`, {}, true);
    if (!response.ok) throw new Error(response.statusText);

    const data: getTopRankingRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCurrentUserCostumes = async () => {
  try {
    const response = await fetchCustom.get(`/user/costume`);
    if (!response.ok) throw new Error(response.statusText);

    const data: getCostumesRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCurrentUserPosts = async () => {
  try {
    const response = await fetchCustom.get(`/user/board`);
    if (!response.ok) throw new Error(response.statusText);

    const data: getUserPostsRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateUserInfo = async (body: updateUserInfoReq) => {
  try {
    const response = await fetchCustom.put(`/user`, {
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
    const response = await fetchCustom.patch(`/user/costume/${costumeId}`);
    if (!response.ok) throw new Error(response.statusText);

    const data: updateUserInfoRes = await response.json();
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
  getCurrentUserPosts,
  updateUserInfo,
  updateUserCostume,
};
