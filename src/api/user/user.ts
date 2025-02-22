const getUserInfo = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/1`,
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: getUserInfoRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const userApi = {
  getUserInfo,
};
