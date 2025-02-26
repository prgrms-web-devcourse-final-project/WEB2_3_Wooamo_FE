const getTimerList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/timer`,
      { next: { tags: ["timer-list"] } },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getTimerListRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getStudyTimeForMonth = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/time/monthly`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getStudyTimeForMonthRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getStudyTimeForWeek = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/time/weekly`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getStudyTimeForWeekRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getStudyTimeForDaily = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/timer/daily`,
      { next: { tags: ["daily-time"] } },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getStudyTimeForDailyRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postTimerCategoryAdd = async (timer: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/timer/category`,
      {
        method: "POST",
        body: JSON.stringify(timer),
      },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: postTimerCategoryAddRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteTimerCategory = async (categoryId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/timer/category/${categoryId}`,
      {
        method: "DELETE",
        body: JSON.stringify(categoryId),
      },
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postStudyTimeSave = async (categoryId: number, time: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/timer/${categoryId}`,
      {
        method: "POST",
        body: JSON.stringify({ time }),
      },
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
