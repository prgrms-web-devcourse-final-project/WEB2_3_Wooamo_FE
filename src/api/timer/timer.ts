const getTimerList = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/timer`);
    if (!response.ok) throw new Error(response.statusText);
    const data: getTimerListRes = await response.json();
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

export const timerApi = {
  getTimerList,
  getStudyTimeForWeek,
  getStudyTimeForMonth,
};
