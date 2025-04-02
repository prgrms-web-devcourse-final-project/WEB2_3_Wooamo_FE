import { fetchCustom } from "../fetchCustom";

const getTimerList = async () => {
  try {
    const response = await fetchCustom.get(`/timer`, {
      next: { tags: ["category-update"] },
    });
    if (response.status === 401) return null;
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<TimerCategoryType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getStudyTimeForMonth = async (
  userId: number,
  year: number,
  month: number,
) => {
  try {
    const response = await fetchCustom.get(
      `/time/monthly/${userId}?year=${year}&month=${month}`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60 * 10, // 10분마다 갱신
        },
        isTokenExclude: true,
      },
    );
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<studyTimeType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getStudyTimeForWeek = async () => {
  try {
    const response = await fetchCustom.get(`/time/weekly`);
    if (response.status === 401) return null;
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType<{ studyTime: string }> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getStudyTimeForDaily = async () => {
  try {
    const response = await fetchCustom.get(`/time/daily`, {
      next: { tags: ["dailyTime-update"] },
    });
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timer }),
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
    const response = await fetchCustom.post(`/timer/${categoryId}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ time }),
    });
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
