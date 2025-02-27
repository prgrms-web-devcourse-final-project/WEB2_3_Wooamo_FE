import formatDateToKR from "@/utils/formatDateToKR";
import Link from "next/link";

interface PartyItemProps {
  partyId: number;
  name: string;
  recruitCap: number;
  recruitCnt: number;
  startDate: string;
}

export default function PartyItem({
  partyId,
  name,
  recruitCap,
  recruitCnt,
  startDate,
}: PartyItemProps) {
  return (
    <Link
      href={`/party/${partyId}`}
      className="flex items-center font-semibold lg:text-xl h-25 px-5 lg:px-7 bg-site-button"
    >
      <p className="flex-5 line-clamp-1">{name}</p>
      <p className="flex-2">
        {recruitCnt}/{recruitCap}
      </p>
      <p className="flex-3">{startDate}</p>
    </Link>
  );
}
