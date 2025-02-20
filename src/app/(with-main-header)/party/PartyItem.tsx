import formatDateToKR from "@/utils/formatDateToKR";
import Link from "next/link";

export default function PartyItem() {
  return (
    <Link
      href={"/party/1"}
      className="flex items-center font-semibold text-xl h-25 px-7 bg-site-button"
    >
      <p className="flex-5">오하요-기상인증🔥</p>
      <p className="flex-2">99/100</p>
      <p className="flex-3">{formatDateToKR(new Date())}</p>
    </Link>
  );
}
