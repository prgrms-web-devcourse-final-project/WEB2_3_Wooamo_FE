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

const getAllEventList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/event`,
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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const adminApi = {
  getAdminWeeklyInfo,
  getAdminRecentSales,
  getAllEventList,
  postEventCreate,
};
