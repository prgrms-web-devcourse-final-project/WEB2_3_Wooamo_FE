import { fetchCustom } from "../fetchCustom";

const getUserFriends = async (userId: number, page?: number, size?: number) => {
  try {
    const response = await fetchCustom.get(
      `/friend/${userId}?page=${page ?? 0}&size=${size ?? 10}`,
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType<friendType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getRecommendFriends = async () => {
  try {
    const response = await fetchCustom.get(`/friend/recommend`);
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType<userType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getRequestFriends = async (page?: number, size?: number) => {
  try {
    const response = await fetchCustom.get(
      `/friend/request?page=${page ?? 0}&size=${size ?? 10}`,
      { next: { tags: ["request-friends"] } },
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType<requestFriendType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const search = async (query: string) => {
  try {
    const response = await fetchCustom.get(
      `/friend/search?query=${query ?? ""}`,
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: paginationType<userType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const requestFriend = async (receiverId: number) => {
  try {
    const response = await fetchCustom.post(`/friend/request/${receiverId}`);
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType<requestFriendType> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const acceptFriend = async (friendId: number) => {
  try {
    const response = await fetchCustom.patch(`/friend/${friendId}`);
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteFriend = async (friendId: number) => {
  try {
    const response = await fetchCustom.delete(`/friend/${friendId}`);
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const friendApi = {
  getUserFriends,
  getRequestFriends,
  getRecommendFriends,
  search,
  requestFriend,
  acceptFriend,
  deleteFriend,
};
