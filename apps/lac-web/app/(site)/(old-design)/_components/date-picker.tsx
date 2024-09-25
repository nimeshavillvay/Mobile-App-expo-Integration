"use client";

import { cn } from "@/_lib/utils";
import { Button } from "@/old/_components/ui/button";
import { Calendar } from "@/old/_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/old/_components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { useState, type Dispatch, type SetStateAction } from "react";

type DatePickerProps = {
  readonly date: Date;
  readonly onSelectDate: Dispatch<SetStateAction<Date>>;
  readonly dateFormat?: "MM/DD/YYYY" | "DD/MM/YYYY";
  readonly placeholder?: string;
  readonly containerClassName?: string;
};

const DatePicker = ({
  date,
  onSelectDate,
  dateFormat = "MM/DD/YYYY",
  placeholder = "Pick a date",
  containerClassName,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "font-base justify-start gap-2 text-left font-normal",
            !date && "text-muted-foreground",
            containerClassName,
          )}
          data-button-action="Open Date Picker"
        >
          <CalendarIcon
            className="h-4 w-4"
            data-button-action="Open Date Picker"
          />

          {date ? dayjs(date).format(dateFormat) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          selectedDate={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              onSelectDate(selectedDate);
            }

            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
