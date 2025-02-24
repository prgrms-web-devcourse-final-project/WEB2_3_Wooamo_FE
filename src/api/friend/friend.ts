const getFriends = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/friend`,
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: getFriendsRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const friendApi = {
  getFriends,
};
