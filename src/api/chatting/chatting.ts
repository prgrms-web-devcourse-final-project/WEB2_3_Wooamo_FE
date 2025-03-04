import { fetchCustom } from "../fetchCustom";

const getChattingList = async (userId: number) => {
  try {
    const response = await fetchCustom.get(`/rooms/list/${userId}`);
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<getChattingListRes[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const chattingApi = {
  getChattingList,
};
