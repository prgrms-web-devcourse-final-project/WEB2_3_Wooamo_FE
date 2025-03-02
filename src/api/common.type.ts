/* eslint-disable @typescript-eslint/no-unused-vars */
type statusType = "성공";

interface responseType<T = null> {
  status: statusType;
  message?: string;
  data?: T;
}

interface paginationType<T = null> {
  status: statusType;
  message?: string;
  data: {
    contents: T;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
}
