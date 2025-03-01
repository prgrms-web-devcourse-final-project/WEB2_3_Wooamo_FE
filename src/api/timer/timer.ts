import { fetchCustom } from "../fetchCustom";

const getTimerList = async () => {
  try {
    const response = await fetchCustom.get(
      `/timer`,
      {
        next: { tags: ["timer-list"] },
      },
      true,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<TimerCategoryType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getStudyTimeForMonth = async (year: number, month: number) => {
  try {
    const response = await fetchCustom.get(
      `/time/monthly?year=${year}&month=${month}`,
      {},
      true,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<studyTimeType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getStudyTimeForWeek = async () => {
  try {
    const response = await fetchCustom.get(`/time/weekly`, {}, true);
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<{ studyTime: string }> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getStudyTimeForDaily = async () => {
  try {
    const response = await fetchCustom.get(
      `/timer/daily`,
      {
        next: { tags: ["daily-time"] },
      },
      true,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<studyTimeType> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postTimerCategoryAdd = async (timer: string) => {
  try {
    const response = await fetchCustom.post(`/timer/category`, {
      body: JSON.stringify(timer),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<{ categoryId: number }> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteTimerCategory = async (categoryId: number) => {
  try {
    const response = await fetchCustom.delete(`/timer/category/${categoryId}`, {
      body: JSON.stringify(categoryId),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postStudyTimeSave = async (categoryId: number, time: string) => {
  try {
    const response = await fetchCustom.post(
      `/timer/${categoryId}`,
      {
        body: JSON.stringify({ time }),
      },
      true,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const timerApi = {
  getTimerList,
  getStudyTimeForWeek,
  getStudyTimeForMonth,
  getStudyTimeForDaily,
  postTimerCategoryAdd,
  deleteTimerCategory,
  postStudyTimeSave,
};
