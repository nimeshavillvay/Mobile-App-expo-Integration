"use client";

import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import { INIT_PAGE_NUMBER } from "@/_lib/constants";
import { filterAndMapValues } from "@/_lib/utils";
import DatePicker from "@/old/_components/date-picker";
import { Button } from "@/old/_components/ui/button";
import { Checkbox } from "@/old/_components/ui/checkbox";
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
import { useSearchParams } from "next/navigation";
import { useDeferredValue, useId, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  CUSTOM_DURATION,
  DURATIONS,
  INIT_DURATION,
  INIT_FROM_DATE,
  INIT_PAGE_SIZE,
  INIT_TO_DATE,
  QUERY_KEYS,
  UI_DATE_FORMAT,
  URL_DATE_FORMAT,
} from "./constants";
import FilterDetailsBoxForMobile from "./filter-details-box-for-mobile";
import MultiSelect from "./multi-select";
import SelectorsForMobileDialog from "./selectors-for-mobile-dialog";
import type { Option } from "./types";
import { useFilterParams, type SelectedValues } from "./use-filter-params.hook";

type OrderHistoryListSelectorsProps = {
  readonly token: string;
  readonly totalItems: number;
};

const OrderHistoryListSelectors = ({
  token,
  totalItems,
}: OrderHistoryListSelectorsProps) => {
  const urlSearchParams = useSearchParams();

  const urlFromDate = urlSearchParams.get(QUERY_KEYS.FROM_DATE);
  const urlToDate = urlSearchParams.get(QUERY_KEYS.TO_DATE);
  const page = Number(urlSearchParams.get(QUERY_KEYS.PAGE) ?? INIT_PAGE_NUMBER);
  const perPage = Number(
    urlSearchParams.get(QUERY_KEYS.PER_PAGE) ?? INIT_PAGE_SIZE,
  );

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [duration, setDuration] = useState(INIT_DURATION);
  const [fromDate, setFromDate] = useState(
    new Date(urlFromDate ?? INIT_FROM_DATE),
  );
  const [toDate, setToDate] = useState(new Date(urlToDate ?? INIT_TO_DATE));
  const [orderStatuses, setOrderStatuses] = useState<number[]>([]);
  const [orderTypes, setOrderTypes] = useState<number[]>([]);
  const [poNos, setPoNos] = useState<number[]>([]);
  const [jobNames, setJobNames] = useState<number[]>([]);

  const deferredFromDate = useDeferredValue(fromDate);
  const deferredToDate = useDeferredValue(toDate);

  const filterQuery = useSuspenseFilters(token, {
    type: "Order History",
    from: dayjs(deferredFromDate).format(URL_DATE_FORMAT),
    to: dayjs(deferredToDate).format(URL_DATE_FORMAT),
  });

  const { selectedValues, searchParams } = useFilterParams(filterQuery.data);

  const mappedSelectedValues: (SelectedValues[string] & { id: string })[] = [];
  for (const [key, value] of Object.entries(selectedValues)) {
    mappedSelectedValues.push({ ...value, id: key });
  }

  const poNoFilter = filterAndMapValues(filterQuery.data, "PO #");
  const jobNameFilter = filterAndMapValues(filterQuery.data, "Job Name");
  const statusFilter = filterAndMapValues(filterQuery.data, "Status");
  const typesFilter = filterAndMapValues(filterQuery.data, "Transaction Type");

  const formattedFromDate = urlFromDate
    ? dayjs(urlFromDate).format(URL_DATE_FORMAT)
    : dayjs(fromDate).format(URL_DATE_FORMAT);
  const formattedToDate = urlToDate
    ? dayjs(urlToDate).format(URL_DATE_FORMAT)
    : dayjs(toDate).format(URL_DATE_FORMAT);

  const resetPoNosRef = useRef(false);
  const resetOrderStatusesRef = useRef(false);
  const resetJobNamesRef = useRef(false);

  const id = useId();
  const durationId = `duration-${id}`;

  const resetFilters = () => {
    setOrderTypes([]);
    setOrderStatuses([]);
    setPoNos([]);
    setJobNames([]);

    resetPoNosRef.current = true;
    resetJobNamesRef.current = true;
    resetOrderStatusesRef.current = true;
  };

  const handleDurationChange = (value: string) => {
    const duration = DURATIONS.find((duration) => duration.value === value);
    if (duration) {
      setDuration(duration);
    }

    if (value === "0") {
      return;
    }

    setFromDate(
      new Date(dayjs().subtract(Number(value), "days").format(URL_DATE_FORMAT)),
    );
    setToDate(new Date(dayjs().format(URL_DATE_FORMAT)));

    // Reset selected filters when the duration changes
    resetFilters();
  };

  const handleSearch = () => {
    const { id: typeAttributeId } = typesFilter ?? {};
    const { id: statusAttributeId } = statusFilter ?? {};
    const { id: poAttributeId } = poNoFilter ?? {};
    const { id: jobAttributeId } = jobNameFilter ?? {};

    const filters = [
      { key: typeAttributeId, values: orderTypes },
      { key: statusAttributeId, values: orderStatuses },
      { key: poAttributeId, values: poNos },
      { key: jobAttributeId, values: jobNames },
    ];

    const newUrlSearchParams = new URLSearchParams(searchParams);
    newUrlSearchParams.set(QUERY_KEYS.PAGE, INIT_PAGE_NUMBER);
    if (fromDate) {
      newUrlSearchParams.set(
        QUERY_KEYS.FROM_DATE,
        dayjs(fromDate).format(URL_DATE_FORMAT),
      );
    }

    if (toDate) {
      newUrlSearchParams.set(
        QUERY_KEYS.TO_DATE,
        dayjs(toDate).format(URL_DATE_FORMAT),
      );
    }

    filters.forEach(({ key, values }) => {
      if (key && values.length > 0) {
        // Delete existing parameter
        newUrlSearchParams.delete(key);
        // Append new values
        values.forEach((value) =>
          newUrlSearchParams.append(key, value.toString()),
        );
      } else {
        // If values are empty, delete the parameter
        if (key) {
          newUrlSearchParams.delete(key);
        }
      }
    });

    window.history.pushState(null, "", `?${newUrlSearchParams.toString()}`);
  };

  const handleReset = () => {
    setDuration(INIT_DURATION);
    setFromDate(new Date(INIT_FROM_DATE));
    setToDate(new Date(INIT_TO_DATE));
    resetFilters();

    const params = new URLSearchParams();

    updateSearchParams(params);
  };

  const handleOrderTypeCheckedChanged = (valueId: number, checked: boolean) => {
    if (checked) {
      setOrderTypes((prev) => [...prev, valueId]);
    } else {
      setOrderTypes((prev) => prev.filter((type) => type !== valueId));
    }
  };

  const handleOrderStatusChange = (values: Option[]) => {
    const selectedOrderStatus = values.map((value) => value.id);
    setOrderStatuses(selectedOrderStatus);
  };

  const handlePONosChange = (values: Option[]) => {
    const selectedPONos = values.map((value) => value.id);
    setPoNos(selectedPONos);
  };

  const handleJobNamesChange = (values: Option[]) => {
    const selectedJobNames = values.map((value) => value.id);
    setJobNames(selectedJobNames);
  };

  return (
    <>
      <div className="hidden flex-col justify-between gap-4 bg-brand-gray-100 px-4 py-5 md:flex md:flex-wrap lg:flex-row lg:gap-0">
        <div className="flex flex-col justify-between gap-4 lg:gap-0">
          <div className="space-y-4">
            <div className="text-brand-gray-500">
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

            <div className="flex flex-row items-center gap-2 self-start">
              <DatePicker
                date={fromDate}
                onSelectDate={(date) => {
                  setFromDate(date);
                  setDuration(CUSTOM_DURATION);
                  resetFilters();
                }}
                dateFormat={UI_DATE_FORMAT}
              />

              <div>to</div>

              <DatePicker
                date={toDate}
                onSelectDate={(date) => {
                  setToDate(date);
                  setDuration(CUSTOM_DURATION);
                  resetFilters();
                }}
                dateFormat={UI_DATE_FORMAT}
              />
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <Button
              className="min-w-24"
              onClick={handleSearch}
              data-button-action="Order History Search"
            >
              Search
            </Button>

            <Button
              className="min-w-24 bg-brand-secondary hover:bg-[#008fc6]"
              onClick={handleReset}
              data-button-action="Order History Search Reset"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Order Types Column */}
        <div>
          <Label className="text-nowrap font-bold">Order Types</Label>

          <div className="flex min-h-[186px] min-w-[170px] flex-col gap-2 rounded-sm border bg-white p-3">
            {typesFilter?.values?.length &&
              typesFilter.values.map((orderType) => (
                <OrderTypeCheckbox
                  key={`type-${orderType.id}`}
                  onCheckedChanged={(checked) =>
                    handleOrderTypeCheckedChanged(orderType.id, checked)
                  }
                  {...orderType}
                />
              ))}
          </div>
        </div>

        {/* Filter By Column */}
        <div>
          <Label className="text-nowrap font-bold">Filter By</Label>

          <div className="flex flex-col gap-2">
            <MultiSelect
              label="PO No."
              flag="po"
              data={poNoFilter?.values ?? []}
              onValuesChange={(values) => handlePONosChange(values)}
              resetRef={resetPoNosRef}
              placeholder="None selected"
            />

            <MultiSelect
              label="Job Name"
              flag="job"
              data={jobNameFilter?.values ?? []}
              onValuesChange={(values) => handleJobNamesChange(values)}
              resetRef={resetJobNamesRef}
              placeholder="None selected"
            />

            <MultiSelect
              label="Order Status"
              flag="status"
              data={statusFilter?.values ?? []}
              onValuesChange={(values) => handleOrderStatusChange(values)}
              resetRef={resetOrderStatusesRef}
              placeholder="None selected"
            />
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="container block md:hidden">
        <div className="flex flex-row items-center justify-between">
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            data-button-action="Order History Sort & Filter"
          >
            Sort & Filter
            <MdKeyboardArrowDown
              className="text-2xl transition-transform duration-200"
              data-button-action="Order History Sort & Filter"
            />
          </Button>

          <div>
            {!filterQuery.isLoading && (
              <div className="text-base font-bold text-brand-gray-500">
                {(page - 1) * perPage + 1} -{" "}
                {Math.min(page * perPage, totalItems)} of {totalItems}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-between overflow-x-auto whitespace-nowrap text-brand-gray-500">
          <FilterDetailsBoxForMobile
            label="Duration"
            value={`${formattedFromDate} - ${formattedToDate}`}
          />

          <SelectorsForMobileDialog
            token={token}
            open={mobileFiltersOpen}
            onOpenChange={setMobileFiltersOpen}
          />
        </div>
      </div>
    </>
  );
};

export default OrderHistoryListSelectors;

const OrderTypeCheckbox = ({
  id,
  value,
  active,
  onCheckedChanged,
}: {
  readonly id: number;
  readonly value: string;
  readonly active: boolean;
  readonly onCheckedChanged: (checked: boolean) => void;
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Checkbox
        id={`type-${id}`}
        disabled={!active}
        onCheckedChange={onCheckedChanged}
      />

      <Label htmlFor={`type-${id}`} className="text-wrap">
        {value}
      </Label>
    </div>
  );
};
