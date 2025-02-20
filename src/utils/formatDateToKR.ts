/**
 * @description 한국 날짜로 시간을 yyyy-mm-dd 형식으로 포맷팅한다.
 * @param {Date} date
 * @example formatDateToKR(new Date())
 */
const formatDateToKR = (date: Date) => {
  if (!date) {
    console.error("date가 undefined 혹은 null 입니다");
    return null;
  }

  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
};

export default formatDateToKR;
