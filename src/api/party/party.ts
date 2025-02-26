const getEventBanner = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/party/event`,
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/party`);
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/party/active`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getActivePartyList = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCompletedPartyList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/party/complete`,
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/party/${partyId}`,
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/party/${partyId}/users`,
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/quest`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getPersonalQuestStateRes = await response.json();
    return data;
  } catch (error) {
    console.log(error);
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
};
