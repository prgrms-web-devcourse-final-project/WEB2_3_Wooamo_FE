"use client";

import { DatePicker } from "@/components/ui/datePicker";
import formatDateToKR from "@/utils/formatDateToKR";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface DateProps {
  partyId: number;
  start: string;
  end: string;
}

export default function CertificationDate({ partyId, start, end }: DateProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(
    new Date(searchParams.get("date") || start),
  );

  const dateParam = searchParams.get("date");
  useEffect(() => {
    if (dateParam) setSelectedDate(new Date(dateParam));
  }, [dateParam]);

  const handleDateSelect = (date: Date) => {
    const dateString = formatDateToKR(date);

    router.push(`/admin/manage/party/${partyId}?date=${dateString}`);
  };

  return (
    <div>
      <DatePicker
        value={selectedDate}
        fromDate={new Date(start)}
        toDate={new Date(end)}
        onChange={handleDateSelect}
      />
    </div>
  );
}
