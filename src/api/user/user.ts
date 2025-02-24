const getCurrentUserInfo = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`);
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

export const userApi = {
  getCurrentUserInfo,
  getUserInfo,
  getCurrentUserRanking,
  getTopRanking,
};
