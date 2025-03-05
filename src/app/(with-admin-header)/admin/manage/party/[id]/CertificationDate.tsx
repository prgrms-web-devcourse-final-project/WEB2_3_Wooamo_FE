"use client";

import { DatePicker } from "@/components/ui/datePicker";
import formatDateToKR from "@/utils/formatDateToKR";

interface DateProps {
  partyId: number;
  start: string;
  end: string;
  onChange: (date: Date) => void;
  selectedDate: Date;
}

export default function CertificationDate({
  partyId,
  start,
  end,
  onChange,
  selectedDate,
}: DateProps) {
  return (
    <div>
      <DatePicker
        value={selectedDate}
        fromDate={new Date(start)}
        toDate={new Date(end)}
        onChange={onChange}
      />
    </div>
  );
}
