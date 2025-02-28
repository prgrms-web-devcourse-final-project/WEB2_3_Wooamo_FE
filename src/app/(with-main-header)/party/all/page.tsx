"use client";

import Link from "next/link";
import Button from "../../../../components/common/Button";
import InputIcon from "@/components/common/InputIcon";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PartyItem from "../PartyItem";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { partyApi } from "@/api/party/party";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

export default function PartyAll() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("name");
  const [keyword, setKeyword] = useState(searchValue ?? "");
  const [parties, setParties] = useState<ScheduledPartyListContents[]>([]);

  const debouncedValue = useDebounce(keyword, 200);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    if (value) {
      router.push(`/party/all?name=${value}`);
    } else {
      router.push(`/party/all`);
    }
  };

  useEffect(() => {
    const fetchParties = async () => {
      const results = await partyApi.getScheduledPartyList(
        debouncedValue || undefined,
      );
      if (!results) return;
      setParties(results.data.contents);
    };

    fetchParties();
  }, [debouncedValue]);

  useEffect(() => {
    const searchValue = searchParams.get("name");
    if (searchValue) {
      setKeyword(searchValue);
    }
  }, [searchParams]);

  return (
    <form className="flex flex-col">
      <div className="px-5 lg:px-0">
        <div className="flex justify-between items-center mb-5 lg:mb-7">
          <p className="font-galmuri text-xl lg:text-[28px]">전체</p>
          <Link href={"/party/create"}>
            <Button type="button">팟 생성</Button>
          </Link>
        </div>
        <InputIcon
          value={keyword}
          onChange={handleSearch}
          Icon={SearchRoundedIcon}
          className="mb-7.5 lg:mb-13"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center font-semibold lg:text-xl px-5 lg:px-7">
          <p className="flex-5">팟</p>
          <p className="flex-2">인원</p>
          <p className="flex-3">시작일</p>
        </div>
        {parties.map((party) => (
          <PartyItem
            key={party.partyId}
            partyId={party.partyId}
            name={party.name}
            recruitCap={party.recruitCap}
            recruitCnt={party.recruitCnt}
            startDate={party.startDate}
          />
        ))}
      </div>
    </form>
  );
}
