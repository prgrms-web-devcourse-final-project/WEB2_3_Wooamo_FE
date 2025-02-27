"use client";

import * as React from "react";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Icon from "../common/Icon";
import formatDateToKR from "@/utils/formatDateToKR";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  fromDate?: Date;
  toDate?: Date;
}

export function DatePicker({
  value,
  onChange,
  fromDate,
  toDate,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-38 lg:w-44 h-11 lg:h-15 justify-between px-4 lg:px-6 font-pretendard font-normal text-base rounded-full bg-site-white-70",
            !value && "text-muted-foreground",
          )}
        >
          {value ? formatDateToKR(value) : <span>시작일</span>}
          <Icon
            MuiIcon={CalendarMonthRoundedIcon}
            className="text-site-darkgray-02"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => date && onChange(date)}
          fromDate={fromDate}
          toDate={toDate}
        />
      </PopoverContent>
    </Popover>
  );
}
