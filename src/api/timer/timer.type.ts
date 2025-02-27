/* eslint-disable @typescript-eslint/no-unused-vars */
interface getTimerListRes {
  status: statusType;
  data: TimerCategoryType[];
}

interface TimerCategoryType {
  timerId: number;
  categoryId: number;
  name: string;
  studyDate: string;
  studyTime: string;
}

interface getStudyTimeForMonthRes {
  status: statusType;
  data: studyTimeType[];
}

interface studyTimeType {
  studyTime: string;
  studyDate: string;
}

interface getStudyTimeForWeekRes {
  status: statusType;
  data: {
    studyTime: string;
  };
}

interface getStudyTimeForDailyRes {
  status: statusType;
  data: studyTimeType;
}

interface postTimerCategoryAddRes {
  status: statusType;
  data: {
    categoryId: number;
  };
}
