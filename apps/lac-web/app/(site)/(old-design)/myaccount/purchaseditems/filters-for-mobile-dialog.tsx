"use client";

import { cn } from "@/_lib/utils";
import DatePicker from "@/old/_components/date-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/old/_components/ui/accordion";
import { Button } from "@/old/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import { Label } from "@/old/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/old/_components/ui/radio-group";
import { updateSearchParams } from "@/old/_utils/client-helpers";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { MdCheck } from "react-icons/md";
import { changeSearchParams } from "./client-helpers";
import {
  DURATIONS,
  INIT_DURATION,
  INIT_FROM_DATE,
  INIT_TO_DATE,
  QUERY_KEYS,
  SORTING_BY_FIELDS,
  SORTING_FILTERS_FOR_MOBILE,
  URL_DATE_FORMAT,
} from "./constants";

const customDuration = DURATIONS[DURATIONS.length - 1]; // Custom duration: last item in the `DURATIONS` array

type FiltersForMobileProps = {
  readonly open: boolean;
  readonly setOpen: Dispatch<SetStateAction<boolean>>;
};

const FiltersForMobileDialog = ({ open, setOpen }: FiltersForMobileProps) => {
  const urlSearchParams = useSearchParams();

  const [fromDate, setFromDate] = useState(new Date(INIT_FROM_DATE));
  const [toDate, setToDate] = useState(new Date());
  const [duration, setDuration] = useState(INIT_DURATION);
  const [activeFilter, setActiveFilter] = useState<string>(
    `${SORTING_BY_FIELDS.SKU}-desc`,
  );

  const handleDurationChange = (value: string) => {
    const duration = DURATIONS.find((duration) => duration.value === value);

    if (duration) {
      setDuration(duration);
    }

    if (value == "0") {
      return;
    }

    setFromDate(
      new Date(dayjs().subtract(Number(value), "months").format("YYYY-MM-DD")),
    );

    setToDate(new Date(dayjs().format("YYYY-MM-DD")));
  };

  const onResetFiltersMobile = () => {
    setDuration(INIT_DURATION);
    setFromDate(new Date(INIT_FROM_DATE));
    setToDate(new Date(INIT_TO_DATE));
    setActiveFilter(`${SORTING_BY_FIELDS.SKU}-desc`);
    const params = new URLSearchParams();
    updateSearchParams(params);

    setOpen(false);
  };

  const onSearchMobileFilters = () => {
    const [orderBy = null, orderType = null] = activeFilter.split("-");

    const searchParams = [];

    if (orderBy && orderType) {
      searchParams.push(
        {
          key: QUERY_KEYS.ORDER_BY,
          value: orderBy,
        },
        {
          key: QUERY_KEYS.ORDER_TYPE,
          value: orderType,
        },
      );
    }

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

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bottom-0 top-auto flex max-h-[calc(100vh-50px)] max-w-[500px] translate-y-[0%] flex-col gap-0">
        <DialogHeader>
          <DialogTitle className="text-left font-wurth font-extrabold">
            Sort & Filter
          </DialogTitle>

          <DialogDescription className="sr-only">
            Add a new user by entering the email
          </DialogDescription>
        </DialogHeader>

        <Accordion
          type="single"
          collapsible
          className="w-full flex-1 overflow-y-scroll"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-[#000] hover:no-underline">
              Duration
            </AccordionTrigger>

            <AccordionContent className="grid gap-y-5 px-5 py-3">
              <div className="mt-4 flex flex-row items-center justify-center gap-2">
                <DatePicker
                  date={fromDate}
                  onSelectDate={(date) => {
                    setFromDate(date);
                    setDuration(customDuration);
                  }}
                />

                <div>to</div>

                <DatePicker
                  date={toDate}
                  onSelectDate={(date) => {
                    setToDate(date);
                    setDuration(customDuration);
                  }}
                />
              </div>

              <div>
                <RadioGroup
                  value={duration?.value}
                  defaultValue="12"
                  onValueChange={(value) => {
                    handleDurationChange(value);
                  }}
                  className="gap-auto grid grid-cols-2 justify-between md:grid-cols-4"
                >
                  {DURATIONS.map(
                    (durationObj) =>
                      durationObj.value != "0" && (
                        <div
                          key={durationObj.label}
                          className={cn(
                            "flex items-center space-x-2 rounded border px-2 py-2",
                            duration?.value == durationObj.value
                              ? "border-brand-secondary bg-brand-secondary bg-opacity-20 text-brand-secondary"
                              : "bg-gray-100",
                          )}
                        >
                          <RadioGroupItem
                            value={durationObj.value}
                            id={`duration-${durationObj.value}`}
                            className="min-h-4 min-w-4"
                          />
                          <Label
                            htmlFor={`duration-${durationObj.value}`}
                            className="w-full"
                          >
                            {durationObj.label}
                          </Label>
                        </div>
                      ),
                  )}
                </RadioGroup>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-[#000] hover:no-underline">
              Sort
            </AccordionTrigger>

            <AccordionContent className="grid">
              {SORTING_FILTERS_FOR_MOBILE.map((sortingFilter) => (
                <div key={sortingFilter.title}>
                  <MobileFilterSortItem
                    key={sortingFilter.title}
                    title={sortingFilter.title}
                  />
                  <div className="bg-white font-bold">
                    {sortingFilter.options.map((sortingType) => (
                      <MobileFilterSortItemOption
                        key={sortingType.type}
                        title={sortingType.title}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        sortingType={sortingType.type}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="grid grid-cols-2 gap-3 p-5">
          <Button
            className="min-w-24 rounded-sm border border-brand-primary bg-transparent p-6 font-bold text-brand-primary"
            onClick={onResetFiltersMobile}
            data-button-action="Purchase Items Mobile Reset Filters"
          >
            Reset
          </Button>

          <Button
            className="min-w-24 p-6"
            onClick={() => onSearchMobileFilters()}
            data-button-action="Purchase Items Mobile Apply Filters"
          >
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersForMobileDialog;

const MobileFilterSortItem = ({ title }: { readonly title: string }) => {
  return (
    <div className="bg-gray-200 px-5 py-3 text-base font-bold">{title}</div>
  );
};

const MobileFilterSortItemOption = ({
  title,
  sortingType,
  activeFilter,
  setActiveFilter,
}: {
  readonly title: string;
  readonly sortingType: string;
  readonly activeFilter: string;
  readonly setActiveFilter: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div
      className={cn(
        "py-2 pl-8 pr-2",
        activeFilter == sortingType
          ? "bg-brand-secondary bg-opacity-20 text-brand-secondary"
          : "",
      )}
    >
      <button
        className="btnAction flex w-full items-center justify-between text-sm"
        onClick={() => {
          setActiveFilter(sortingType);
        }}
        data-button-action="Purchase Items Mobile Sort"
      >
        {title}
        <MdCheck
          className={cn(
            "text-3xl leading-none text-brand-secondary",
            activeFilter == sortingType ? "block" : "hidden",
          )}
          data-button-action="Purchase Items Mobile Sort"
        />
      </button>
    </div>
  );
};
