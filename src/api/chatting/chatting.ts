import { fetchCustom } from "../fetchCustom";

const getChattingMessages = async (
  roomId: string,
  lastChatId?: string,
  size?: number,
) => {
  try {
    const response = await fetchCustom.get(
      `/rooms/${roomId}/messages?lastChatId=${lastChatId ?? ""}&limit=${size ?? 10}`,
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

    await addGroupChatMember(data.data, body.userId);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const addGroupChatMember = async (roomId: string, newUserId: number) => {
  try {
    const response = await fetchCustom.post(`/rooms/group/${roomId}/addUser`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newUserId }),
    });
    if (response.status === 409)
      return {
        status: "실패",
        message: "이미 채팅방에 존재하는 유저입니다",
      };
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const chattingApi = {
  getChattingMessages,
  createPersonalChatRoom,
  createGroupChatRoom,
  addGroupChatMember,
};
