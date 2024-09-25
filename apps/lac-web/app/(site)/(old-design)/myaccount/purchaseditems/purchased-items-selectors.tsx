"use client";

import { INIT_PAGE_NUMBER } from "@/_lib/constants";
import DatePicker from "@/old/_components/date-picker";
import { Button } from "@/old/_components/ui/button";
import { Label } from "@/old/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import { updateSearchParams } from "@/old/_utils/client-helpers";
import dayjs from "dayjs";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { changeSearchParams } from "./client-helpers";
import {
  CUSTOM_DURATION,
  DURATIONS,
  INIT_DURATION,
  INIT_FROM_DATE,
  INIT_PER_PAGE,
  INIT_TO_DATE,
  QUERY_KEYS,
  URL_DATE_FORMAT,
} from "./constants";
import FiltersForMobileDialog from "./filters-for-mobile-dialog";

type PurchasedItemsSelectorProps = {
  readonly isLoading: boolean;
  readonly totalItems: number;
};

const PurchasedItemsSelectors = ({
  isLoading,
  totalItems,
}: PurchasedItemsSelectorProps) => {
  const urlSearchParams = useSearchParams();
  const page = Number(urlSearchParams.get(QUERY_KEYS.PAGE) ?? INIT_PAGE_NUMBER);
  const perPage = Number(
    urlSearchParams.get(QUERY_KEYS.PER_PAGE) ?? INIT_PER_PAGE,
  );

  const [fromDate, setFromDate] = useState(
    new Date(urlSearchParams.get(QUERY_KEYS.FROM_DATE) ?? INIT_FROM_DATE),
  );
  const [toDate, setToDate] = useState(
    new Date(urlSearchParams.get(QUERY_KEYS.TO_DATE) ?? INIT_TO_DATE),
  );

  const [duration, setDuration] = useState(INIT_DURATION);
  const [open, setOpen] = useState(false);

  const id = useId();
  const durationId = `duration-${id}`;

  const urlFromDate = urlSearchParams.get(QUERY_KEYS.FROM_DATE);
  const urlToDate = urlSearchParams.get(QUERY_KEYS.TO_DATE);

  const formattedFromDate = urlFromDate
    ? dayjs(urlFromDate).format(URL_DATE_FORMAT)
    : dayjs(fromDate).format(URL_DATE_FORMAT);
  const formattedToDate = urlToDate
    ? dayjs(urlToDate).format(URL_DATE_FORMAT)
    : dayjs(toDate).format(URL_DATE_FORMAT);

  const handleDurationChange = (value: string) => {
    const duration = DURATIONS.find((duration) => duration.value === value);

    if (duration) {
      setDuration(duration);
    }

    if (value == "0") {
      return;
    }

    setFromDate(
      new Date(
        dayjs().subtract(Number(value), "months").format(URL_DATE_FORMAT),
      ),
    );

    setToDate(new Date(dayjs().format(URL_DATE_FORMAT)));
  };

  const search = () => {
    const searchParams = [];

    searchParams.push(
      {
        key: QUERY_KEYS.FROM_DATE,
        value: dayjs(fromDate).format(URL_DATE_FORMAT),
      },
      {
        key: QUERY_KEYS.TO_DATE,
        value: dayjs(toDate).format(URL_DATE_FORMAT),
      },
    );

    changeSearchParams(urlSearchParams, searchParams);
  };

  const onClickReset = () => {
    setDuration(INIT_DURATION);
    setFromDate(new Date(INIT_FROM_DATE));
    setToDate(new Date(INIT_TO_DATE));

    const params = new URLSearchParams();
    updateSearchParams(params);
  };

  return (
    <>
      <div className="col-span-4 hidden flex-col items-center justify-between bg-brand-gray-100 px-4 py-5 md:flex md:flex-wrap lg:flex-row">
        <div className="min-w-[160px] text-brand-gray-500">
          <Label htmlFor={durationId} className="text-nowrap font-bold">
            Duration
          </Label>

          <Select
            value={duration?.value}
            onValueChange={(value) => {
              handleDurationChange(value);
            }}
          >
            <SelectTrigger id={durationId} className="h-8 py-0">
              <SelectValue>{duration?.label}</SelectValue>
            </SelectTrigger>

            <SelectContent>
              {DURATIONS.map((duration) => (
                <SelectItem key={duration.value} value={duration.value}>
                  {duration.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2 md:flex-row">
          <DatePicker
            date={fromDate}
            onSelectDate={(date) => {
              setFromDate(date);
              setDuration(CUSTOM_DURATION);
            }}
          />

          <div>to</div>

          <DatePicker
            date={toDate}
            onSelectDate={(date) => {
              setToDate(date);
              setDuration(CUSTOM_DURATION);
            }}
          />
        </div>

        <div className="mt-4 flex flex-row items-center gap-2">
          <Button
            className="min-w-24"
            onClick={search}
            data-button-action="Purchase Items Mobile View Search"
          >
            Search
          </Button>
          <Button
            className="min-w-24 bg-brand-secondary"
            onClick={() => {
              onClickReset();
            }}
            data-button-action="Purchase Items Mobile View Reset Filters"
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="block px-4 md:hidden">
        <div className="mb-3 flex justify-between">
          <button
            className="btnAction items-left flex cursor-pointer items-center font-wurth text-base font-bold uppercase tracking-wide"
            onClick={() => setOpen(true)}
            data-button-action="Purchase Items Mobile Sort & Filter"
          >
            Sort & Filter
            <ChevronDown
              className="h-4 w-4 shrink-0 transition-transform duration-200"
              data-button-action="Purchase Items Mobile Sort & Filter"
            />
          </button>
          <div>
            {!isLoading && (
              <div className="text-base">
                {(page - 1) * perPage + 1} -{" "}
                {Math.min(page * perPage, totalItems)} of {totalItems}
              </div>
            )}
          </div>
        </div>
        <div className="mb-4 w-fit content-end rounded border bg-gray-100 p-2">
          <div className="text-[10px] uppercase">Duration</div>
          <div className="font-bold">{`${formattedFromDate} - ${formattedToDate}`}</div>
        </div>
      </div>

      <div className="flex md:hidden">
        <FiltersForMobileDialog open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default PurchasedItemsSelectors;
