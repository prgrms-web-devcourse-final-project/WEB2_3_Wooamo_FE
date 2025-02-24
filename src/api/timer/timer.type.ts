/* eslint-disable @typescript-eslint/no-unused-vars */
interface getStudyTimeForWeekRes {
  status: statusType;
  data: {
    studyTime: string;
  };
}

interface getStudyTimeForMonthRes {
  status: statusType;
  data: studyTimeType[];
}
interface studyTimeType {
  studyTime: string;
  studyDate: string;
}
