import { fetchCustom } from "../fetchCustom";

const getEventBanner = async () => {
  try {
    const response = await fetchCustom.get(`/party/event`);
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<EventBannerType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getScheduledPartyList = async (
  name?: string,
  page?: number,
  size?: number,
) => {
  try {
    const response = await fetchCustom.get(
      `/party?name=${name ?? ""}&page=${page ?? 0}&size=${size ?? 10}`,
      {
        next: { tags: ["party-list"] },
      },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: paginationType<ScheduledPartyListContents[]> =
      await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getActivePartyList = async () => {
  try {
    const response = await fetchCustom.get(`/party/active`);
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<ActivePartyType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCompletedPartyList = async () => {
  try {
    const response = await fetchCustom.get(`/party/complete`, {
      next: { tags: ["party-quest"] },
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<CompletedPartyType[]> = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPartyDetail = async (partyId: number) => {
  try {
    const response = await fetchCustom.get(`/party/${partyId}`, {
      next: { tags: ["party-detail"] },
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<PartyDetailType> = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPartyParticipantList = async (
  partyId: number,
  page?: number,
  size?: number,
) => {
  try {
    const response = await fetchCustom.get(
      `/party/${partyId}/users?page=${page ?? 0}&size=${size ?? 10}`,
      {
        next: { tags: ["participant-list"] },
      },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: paginationType<PartyParticipantType[]> = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPersonalQuestState = async () => {
  try {
    const response = await fetchCustom.get(
      `/user/quest`,
      {
        next: { tags: ["personal-quest-state"] },
      },
      true,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<{ state: string }> = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postParticiapteParty = async (partyId: number, bettingPoint: number) => {
  try {
    const response = await fetchCustom.post(`/party/${partyId}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bettingPoint }),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postPersonalQuestReward = async () => {
  try {
    const response = await fetchCustom.post(`/user/reward`, {}, true);
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postPartyQuestReward = async (partyId: number) => {
  try {
    const response = await fetchCustom.post(
      `/party/${partyId}/reward`,
      {},
      true,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<{ point: number }> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postPartyparticipationVerify = async (partyId: number, image: File[]) => {
  try {
    const response = await fetchCustom.post(`/party/${partyId}/verify`, {
      body: JSON.stringify(image),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postPartyCreateAndParticipate = async (
  body: postPartyCreateAndParticipateReq,
) => {
  try {
    const response = await fetchCustom.post(`/party`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<{ partyId: string }> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const partyApi = {
  getEventBanner,
  getScheduledPartyList,
  getActivePartyList,
  getCompletedPartyList,
  getPartyDetail,
  getPartyParticipantList,
  getPersonalQuestState,
  postParticiapteParty,
  postPersonalQuestReward,
  postPartyQuestReward,
  postPartyparticipationVerify,
  postPartyCreateAndParticipate,
};
