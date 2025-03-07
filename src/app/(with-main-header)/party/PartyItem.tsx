import { userApi } from "@/api/user/user";
import { delay } from "@/utils/delay";
import Link from "next/link";

interface PartyItemProps {
  partyId: number;
  name: string;
  recruitCap: number;
  recruitCnt: number;
  startDate: string;
}

export default async function PartyItem({
  partyId,
  name,
  recruitCap,
  recruitCnt,
  startDate,
}: PartyItemProps) {
  const user = await userApi.getCurrentUserInfo();
  return (
    <Link
      href={`${user ? `/party/${partyId}` : `/party/all`}`}
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
