import formatDateToKR from "./formatDateToKR";

/**
 *
 * @description 현재 시간을 기준으로, 얼마 전인지 알려주는 함수 ex) 1시간 전
 * @param targetDate 얼마 전인지 알고 싶은 날짜
 * @example formatDateToTimeAgo(new Date())
 */
const formatDateToTimeAgo = (targetDate: Date) => {
  if (!targetDate) {
    console.error("date가 undefined 혹은 null 입니다");
    return null;
  }

  const now = new Date(formatDateToKR(new Date())!);
  const diffInMilliseconds = now.getTime() - targetDate.getTime();

  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = now.getMonth() - targetDate.getMonth();
  const diffInYears = now.getFullYear() - targetDate.getFullYear();

  if (diffInYears >= 1) return formatDateToKR(targetDate);
  else if (diffInMonths >= 1) return `${diffInMonths}개월 전`;
  else if (diffInDays >= 1) return `${diffInDays}일 전`;
  else if (diffInHours >= 1) return `${diffInHours}시간 전`;
  else if (diffInMinutes >= 1) return `${diffInMinutes}분 전`;
  else return "방금 전";
};

export default formatDateToTimeAgo;
