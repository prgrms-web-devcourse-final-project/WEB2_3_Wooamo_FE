const getEventBanner = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/party/event`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getEventBannerRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getScheduledPartyList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/party`,
      {
        next: { tags: ["party-list"] },
      },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getScheduledPartyListRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getActivePartyList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/party/active`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getActivePartyListRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCompletedPartyList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/party/complete`,
      {
        next: { tags: ["party-quest"] },
      },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getCompletedPartyListRes = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPartyDetail = async (partyId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/party/${partyId}`,
      {
        next: { tags: ["party-detail"] },
      },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getPartyPageDetailRes = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPartyParticipantList = async (partyId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/party/${partyId}/users`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getPartyParticipantListRes = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPersonalQuestState = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/user/quest`,
      { next: { tags: ["personal-quest-state"] } },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getPersonalQuestStateRes = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postParticiapteParty = async (partyId: number, bettingPoint: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/party/${partyId}`,
      {
        method: "POST",
        body: JSON.stringify(bettingPoint),
      },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postPersonalQuestReward = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/user/reward`,
      {
        method: "POST",
      },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postPartyQuestReward = async (partyId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/party/${partyId}/reward`,
      {
        method: "POST",
      },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postPartyparticipationVerify = async (partyId: number, image: File[]) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/party/${partyId}/verify`,
      {
        method: "POST",
        body: JSON.stringify(image),
      },
    );
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/party`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: postPartyCreateAndParticipateRes = await response.json();
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
