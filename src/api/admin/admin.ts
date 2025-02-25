const getAdminWeeklyInfo = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin`);
    if (!response.ok) throw new Error(response.statusText);
    const data: getAdminWeeklyInfoRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAdminRecentSales = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/payment`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getAdminRecentSalesRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAllPartyList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/party`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getAllPartyListRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getPartyDetail = async (partyId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/party/${partyId}`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getPartyDetailRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getMemberCertification = async (
  partyId: number,
  memberId: number,
  date: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/party/${partyId}/${memberId}?date=${date}`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getMemberCertificationRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const patchConfirmCertification = async (
  partyId: number,
  userId: number,
  isConfirm: boolean,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/party/${partyId}/${userId}`,
      { method: "PATCH", body: JSON.stringify({ auth: isConfirm }) },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAllEventList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/event`,
      { next: { tags: ["event-list"] } },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getAllEventListRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postEventCreate = async (body: postEventCreateReq) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/event`,
      { method: "POST", body: JSON.stringify(body) },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const adminApi = {
  getAdminWeeklyInfo,
  getAdminRecentSales,
  getAllPartyList,
  getPartyDetail,
  getMemberCertification,
  patchConfirmCertification,
  getAllEventList,
  postEventCreate,
};
