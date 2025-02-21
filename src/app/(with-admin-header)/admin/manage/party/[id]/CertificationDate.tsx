"use client";

import { DatePicker } from "@/components/ui/datePicker";
import { useState } from "react";

export default function CertificationDate() {
  const today = new Date();
  const tomorrow = new Date(today).setDate(today.getDate() + 1);
  const [date, setDate] = useState<Date>(today);

  return (
    <div>
      <DatePicker
        value={date}
        fromDate={new Date()}
        toDate={new Date(tomorrow)}
        onChange={(date) => setDate(date)}
      />
    </div>
  );
}
