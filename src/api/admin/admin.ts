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

const getPartyDetails = async (partyId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/party/${partyId}`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getPartyDetailsRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const adminApi = {
  getAdminWeeklyInfo,
  getAdminRecentSales,
  getAllPartyList,
  getPartyDetails,
};
