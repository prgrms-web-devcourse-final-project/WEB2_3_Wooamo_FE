"use client";

import { DatePicker } from "@/components/ui/datePicker";
import { useState } from "react";

interface DateProps {
  partyId: number;
  start: string;
  end: string;
}

export default function CertificationDate({ partyId, start, end }: DateProps) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const [date, setDate] = useState<Date>(startDate);

  return (
    <div>
      <DatePicker
        value={date}
        fromDate={startDate}
        toDate={endDate}
        onChange={(date) => setDate(date)}
      />
    </div>
  );
}
