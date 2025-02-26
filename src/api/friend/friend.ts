const getFriends = async (page?: number, size?: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/friend?page=${page}&size=${size}`,
      { next: { tags: ["friends"] } },
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: getFriendsRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getRecommendFriends = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/friend/recommend`,
      { cache: "force-cache", next: { revalidate: 1000 * 60 * 60 * 24 } }, // 하루에 한 번씩 갱신
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: getUsersRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getRequestFriends = async (page?: number, size?: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/friend/request?page=${page}&size=${size}`,
      { next: { tags: ["request-friends"] } },
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: getRequestFriendsRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const search = async (query: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/friend/search?query=${query}`,
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: getUsersRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const requestFriend = async (receiverId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/friend/request/${receiverId}`,
      {
        method: "POST",
      },
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: requestFriendRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const acceptFriend = async (friendId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/friend/${friendId}`,
      {
        method: "PATCH",
      },
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteFriend = async (friendId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/friend/${friendId}`,
      {
        method: "DELETE",
      },
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const friendApi = {
  getFriends,
  getRequestFriends,
  getRecommendFriends,
  search,
  requestFriend,
  acceptFriend,
  deleteFriend,
};
