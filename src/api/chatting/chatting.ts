import { fetchCustom } from "../fetchCustom";

const getChattingMessages = async (
  roomId: string,
  page?: number,
  size?: number,
) => {
  try {
    const response = await fetchCustom.get(
      `/rooms/${roomId}/messages?page=${page ?? 0}&size=${size ?? 10}`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<ChatMessageType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const createPersonalChatRoom = async (body: createPersonalChatRoomReq) => {
  try {
    const response = await fetchCustom.post(`/rooms/private`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<string> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const createGroupChatRoom = async (body: createGroupChatRoomReq) => {
  try {
    const response = await fetchCustom.post(`/rooms/group`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<string> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const chattingApi = {
  getChattingMessages,
  createPersonalChatRoom,
  createGroupChatRoom,
};
