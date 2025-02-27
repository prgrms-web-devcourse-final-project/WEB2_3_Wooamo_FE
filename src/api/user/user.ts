const getCurrentUserInfo = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${userId}`,
      { next: { tags: [`user-${userId}`] }, cache: "force-cache" },
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: userInfoRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCurrentUserRanking = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/ranking`,
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: userRankingRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getTopRanking = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/topranking`,
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: getTopRankingRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCurrentUserCostumes = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/costume`,
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: getCostumesRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCurrentUserPosts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/board`,
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: getUserPostsRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateUserInfo = async (body: updateUserInfoReq) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
      method: "PUT",
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/costume/${costumeId}`,
      {
        method: "PATCH",
      },
    );
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
