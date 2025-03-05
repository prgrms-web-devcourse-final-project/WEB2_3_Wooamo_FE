import { fetchCustom } from "../fetchCustom";

const getAdminWeeklyInfo = async () => {
  try {
    const response = await fetchCustom.get(`/admin`);
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<getAdminWeeklyInfoRes> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAdminRecentSales = async () => {
  try {
    const response = await fetchCustom.get(`/admin/payment`);
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<getAdminRecentSalesRes[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAllPartyList = async (page?: number, size?: number) => {
  try {
    const response = await fetchCustom.get(
      `/admin/party?page=${page ?? 0}&size=${size ?? 10}`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: paginationType<PartyDetailType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getPartyDetail = async (partyId: number) => {
  try {
    const response = await fetchCustom.get(`/admin/party/${partyId}`, {
      next: { tags: ["member-list"] },
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<PartyDetailDataType> = await response.json();
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
    const response = await fetchCustom.get(
      `/admin/party/${partyId}/${memberId}?date=${date}`,
      {
        next: { tags: ["certification-status"] },
      },
    );
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<getMemberCertificationRes> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const patchConfirmCertification = async (
  partyId: number,
  memberId: number,
  body: patchConfirmCertificationReq,
) => {
  try {
    const response = await fetchCustom.patch(
      `/admin/party/${partyId}/${memberId}`,
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAllEventList = async () => {
  try {
    const response = await fetchCustom.get(`/admin/event`, {
      next: { tags: ["event-list"] },
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<getAllEventListRes> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postEventCreate = async (formData: FormData) => {
  try {
    const response = await fetchCustom.post(`/admin/event`, {
      body: formData,
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postItemCreate = async (formData: FormData) => {
  try {
    const response = await fetchCustom.post(`/admin/costume`, {
      body: formData,
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const putCostumeEdit = async (costumeId: number, body: putCostumeEditReq) => {
  try {
    const response = await fetchCustom.put(`/admin/costume/${costumeId}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteCostume = async (costumeId: number) => {
  try {
    const response = await fetchCustom.delete(`/admin/costume/${costumeId}`);
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
  postItemCreate,
  putCostumeEdit,
  deleteCostume,
};
