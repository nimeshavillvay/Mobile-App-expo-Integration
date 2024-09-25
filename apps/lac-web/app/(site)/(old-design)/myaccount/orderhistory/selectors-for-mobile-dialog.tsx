"use client";

import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import { INIT_PAGE_NUMBER } from "@/_lib/constants";
import type { FilterValues } from "@/_lib/types";
import { cn, filterAndMapValues } from "@/_lib/utils";
import DatePicker from "@/old/_components/date-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/old/_components/ui/accordion";
import { Button } from "@/old/_components/ui/button";
import { Checkbox } from "@/old/_components/ui/checkbox";
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
import {
  useDeferredValue,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { MdCheck } from "react-icons/md";
import {
  DURATIONS,
  INIT_DURATION,
  INIT_FROM_DATE,
  INIT_SORT_DIRECTION,
  INIT_SORT_TYPE,
  QUERY_KEYS,
  SORTING_FILTERS_FOR_MOBILE,
  URL_DATE_FORMAT,
} from "./constants";
import FilterDetailsBoxForMobile from "./filter-details-box-for-mobile";

const customDuration = DURATIONS.at(-1);

type SelectorsForMobileDialogProps = {
  readonly token: string;
  readonly open: boolean;
  readonly onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const SelectorsForMobileDialog = ({
  token,
  open,
  onOpenChange,
}: SelectorsForMobileDialogProps) => {
  const searchParams = useSearchParams();

  const urlSortBy = searchParams.get(QUERY_KEYS.SORT_TYPE) ?? INIT_SORT_TYPE;
  const urlSortDirection =
    searchParams.get(QUERY_KEYS.SORT_DIRECTION) ?? INIT_SORT_DIRECTION;

  const [fromDate, setFromDate] = useState(new Date(INIT_FROM_DATE));
  const [toDate, setToDate] = useState(new Date());
  const [duration, setDuration] = useState(INIT_DURATION);
  const [orderTypes, setOrderTypes] = useState<number[]>([]);
  const [poNos, setPoNos] = useState<number[]>([]);
  const [jobNames, setJobNames] = useState<number[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState(urlSortBy);
  const [sortDirection, setSortDirection] = useState(urlSortDirection);

  const deferredFromDate = useDeferredValue(fromDate);
  const deferredToDate = useDeferredValue(toDate);

  const filterQuery = useSuspenseFilters(token, {
    type: "Order History",
    from: dayjs(deferredFromDate).format(URL_DATE_FORMAT),
    to: dayjs(deferredToDate).format(URL_DATE_FORMAT),
  });

  const poNoFilter = filterAndMapValues(filterQuery.data, "PO #");
  const jobNameFilter = filterAndMapValues(filterQuery.data, "Job Name");
  const statusFilter = filterAndMapValues(filterQuery.data, "Status");
  const typesFilter = filterAndMapValues(filterQuery.data, "Transaction Type");

  const resetFilters = () => {
    setOrderTypes([]);
    setOrderStatuses([]);
    setPoNos([]);
    setJobNames([]);
  };

  const handleDurationChange = (value: string) => {
    const duration = DURATIONS.find((duration) => duration.value === value);

    if (duration) {
      setDuration(duration);
    }

    if (value !== "0") {
      const newFromDate = dayjs()
        .subtract(Number(value), "days")
        .format(URL_DATE_FORMAT);
      const newToDate = dayjs().format(URL_DATE_FORMAT);

      setFromDate(new Date(newFromDate));
      setToDate(new Date(newToDate));
    }

    resetFilters();
  };

  const handleOrderTypeCheckedChanged = (id: number, checked: boolean) => {
    if (checked) {
      setOrderTypes((prev) => [...prev, id]);
    } else {
      setOrderTypes((prev) => prev.filter((type) => type !== id));
    }
  };

  const handlePoNoCheckedChanged = (id: number, checked: boolean) => {
    if (checked) {
      setPoNos((prev) => [...prev, id]);
    } else {
      setPoNos((prev) => prev.filter((po) => po !== id));
    }
  };

  const handleJobNameCheckedChanged = (id: number, checked: boolean) => {
    if (checked) {
      setJobNames((prev) => [...prev, id]);
    } else {
      setJobNames((prev) => prev.filter((job) => job !== id));
    }
  };

  const handleStatusesCheckedChanged = (id: number, checked: boolean) => {
    if (checked) {
      setOrderStatuses((prev) => [...prev, id]);
    } else {
      setOrderStatuses((prev) => prev.filter((status) => status !== id));
    }
  };

  const handleApplyFilters = () => {
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

    if (sortBy) {
      newUrlSearchParams.set(QUERY_KEYS.SORT_TYPE, sortBy);
    }

    if (sortDirection) {
      newUrlSearchParams.set(QUERY_KEYS.SORT_DIRECTION, sortDirection);
    }

    window.history.pushState(null, "", `?${newUrlSearchParams.toString()}`);

    // Close the dialog
    onOpenChange(false);
  };

  const handleResetFilters = () => {
    setDuration(INIT_DURATION);
    setFromDate(new Date(INIT_FROM_DATE));
    setToDate(new Date());
    resetFilters();
    setSortBy(urlSortBy);
    setSortDirection(urlSortDirection);
    onOpenChange(false);
    const params = new URLSearchParams();

    updateSearchParams(params);
  };

  const formatDisplayFilter = (
    selectedIds: Array<number>,
    filter: FilterValues,
  ) => {
    const selectedFilterList = filter
      .filter((item) => selectedIds.includes(item.id))
      .map((item) => item.value);

    return selectedFilterList.length < 3
      ? selectedFilterList.join(", ")
      : `${selectedFilterList[0]}, ${selectedFilterList[1]} (+ ${selectedFilterList.length - 2})`;
  };

  return (
    <>
      {typesFilter?.values?.length !== undefined &&
        orderTypes?.length !== undefined &&
        typesFilter?.values?.length > 0 &&
        orderTypes?.length > 0 && (
          <FilterDetailsBoxForMobile
            key={`type-${typesFilter.id}`}
            label="Order Type"
            value={formatDisplayFilter(orderTypes, typesFilter.values)}
          />
        )}

      {poNoFilter?.values?.length !== undefined &&
        poNos?.length !== undefined &&
        poNoFilter?.values?.length > 0 &&
        poNos?.length > 0 && (
          <FilterDetailsBoxForMobile
            key={`type-${poNoFilter.id}`}
            label="PO No."
            value={formatDisplayFilter(poNos, poNoFilter.values)}
          />
        )}

      {jobNameFilter?.values?.length !== undefined &&
        jobNames?.length !== undefined &&
        jobNameFilter?.values?.length > 0 &&
        jobNames?.length > 0 && (
          <FilterDetailsBoxForMobile
            key={`type-${jobNameFilter.id}`}
            label="Job Name"
            value={formatDisplayFilter(jobNames, jobNameFilter.values)}
          />
        )}

      {statusFilter?.values?.length !== undefined &&
        orderStatuses?.length !== undefined &&
        statusFilter?.values?.length > 0 &&
        orderStatuses?.length > 0 && (
          <FilterDetailsBoxForMobile
            key={`type-${statusFilter.id}`}
            label="Order Status"
            value={formatDisplayFilter(orderStatuses, statusFilter.values)}
          />
        )}

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bottom-0 top-auto max-w-[768px] translate-y-[0%] gap-0 md:bottom-auto md:top-[50%] md:translate-y-[-50%]">
          <DialogHeader>
            <DialogTitle className="text-left font-wurth font-extrabold md:text-center">
              Sort & Filter
            </DialogTitle>

            <DialogDescription className="sr-only">
              Filters for my orders
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[80vh] overflow-y-scroll">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="duration-item"
            >
              {/* Duration selector */}
              <AccordionItem value="duration-item">
                <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-black hover:no-underline">
                  Duration
                </AccordionTrigger>

                <AccordionContent className="grid gap-y-5 px-5 py-3">
                  <div className="flex flex-row items-center justify-between">
                    <DatePicker
                      date={fromDate}
                      onSelectDate={(date) => {
                        setFromDate(date);
                        setDuration(customDuration);
                        resetFilters();
                      }}
                    />

                    <div>to</div>

                    <DatePicker
                      date={toDate}
                      onSelectDate={(date) => {
                        setToDate(date);
                        setDuration(customDuration);
                        resetFilters();
                      }}
                    />
                  </div>

                  <div>
                    <RadioGroup
                      value={duration?.value}
                      onValueChange={(value) => {
                        handleDurationChange(value);
                      }}
                      className="gap-auto grid grid-cols-2 justify-between"
                    >
                      {DURATIONS.map((item) => (
                        <div
                          key={`mobile-${item.value}-${item.label}`}
                          className={cn(
                            "flex flex-row items-center space-x-2 rounded border p-2",
                            duration?.value === item.value
                              ? "border-brand-secondary bg-brand-secondary bg-opacity-20"
                              : "bg-brand-gray-100",
                          )}
                        >
                          <RadioGroupItem
                            value={item.value}
                            id={`duration-${item.value}`}
                            className="min-h-4 min-w-4"
                          />

                          <Label
                            htmlFor={`duration-${item.value}`}
                            className={cn(
                              "w-full",
                              duration?.value === item.value
                                ? "text-brand-secondary"
                                : "text-black",
                            )}
                          >
                            {item.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Order Types selector */}
              <AccordionItem value="type-item">
                <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-black hover:no-underline">
                  Order Types
                </AccordionTrigger>

                <AccordionContent className="grid gap-y-5 px-5 py-3">
                  {typesFilter?.values.length &&
                    typesFilter.values.map((item) => (
                      <CheckboxWithLabel
                        key={`mobile-type-${item.id}`}
                        flag="type"
                        checked={orderTypes.includes(item.id)}
                        onCheckedChanged={(checked) =>
                          handleOrderTypeCheckedChanged(item.id, checked)
                        }
                        {...item}
                      />
                    ))}
                </AccordionContent>
              </AccordionItem>

              {/* PO No selector */}
              <AccordionItem value="po-item">
                <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-black hover:no-underline">
                  PO No
                </AccordionTrigger>

                <AccordionContent className="grid gap-y-5 px-5 py-3">
                  {poNoFilter?.values?.length &&
                    poNoFilter.values.map((item) => (
                      <CheckboxWithLabel
                        key={`mobile-po-${item.id}`}
                        flag="po"
                        checked={poNos.includes(item.id)}
                        onCheckedChanged={(checked) =>
                          handlePoNoCheckedChanged(item.id, checked)
                        }
                        {...item}
                      />
                    ))}
                </AccordionContent>
              </AccordionItem>

              {/* Job Name selector */}
              <AccordionItem value="job-item">
                <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-black hover:no-underline">
                  Job Name
                </AccordionTrigger>

                <AccordionContent className="grid gap-y-5 px-5 py-3">
                  {jobNameFilter?.values?.length &&
                    jobNameFilter.values.map((item) => (
                      <CheckboxWithLabel
                        key={`mobile-job-${item.id}`}
                        flag="job"
                        checked={jobNames.includes(item.id)}
                        onCheckedChanged={(checked) =>
                          handleJobNameCheckedChanged(item.id, checked)
                        }
                        {...item}
                      />
                    ))}
                </AccordionContent>
              </AccordionItem>

              {/* Order Status selector */}
              <AccordionItem value="status-item">
                <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-black hover:no-underline">
                  Order Status
                </AccordionTrigger>

                <AccordionContent className="grid gap-y-5 px-5 py-3">
                  {statusFilter?.values?.length &&
                    statusFilter.values.map((item) => (
                      <CheckboxWithLabel
                        key={`mobile-status-${item.id}`}
                        flag="status"
                        checked={orderStatuses.includes(item.id)}
                        onCheckedChanged={(checked) =>
                          handleStatusesCheckedChanged(item.id, checked)
                        }
                        {...item}
                      />
                    ))}
                </AccordionContent>
              </AccordionItem>

              {/* Sort direction selector */}
              <AccordionItem value="sort-item">
                <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-black hover:no-underline">
                  Sort
                </AccordionTrigger>

                <AccordionContent className="grid">
                  {SORTING_FILTERS_FOR_MOBILE.map((sort) => (
                    <div key={`sort-direction-${sort.title}`}>
                      <MobileSortFilterHeading title={sort.title} />
                      {sort.options.map((option) => (
                        <MobileSortFilterOption
                          key={`${option.type}-${option.title}`}
                          title={option.title}
                          active={
                            sortBy === option.type &&
                            sortDirection === option.direction
                          }
                          onChecked={() => {
                            setSortBy(option.type);
                            setSortDirection(option.direction);
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="grid grid-cols-2 gap-3 p-5">
            <Button
              variant="secondary"
              className="h-12 border-brand-primary text-brand-primary"
              onClick={() => handleResetFilters()}
              data-button-action="Order History Reset for Mobile Filter"
            >
              Reset
            </Button>

            <Button
              className="h-12"
              onClick={() => handleApplyFilters()}
              data-button-action="Order History Apply for Mobile Filter"
            >
              Apply
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectorsForMobileDialog;

// TODO: Move this to a separate file (Reusable component)
const CheckboxWithLabel = ({
  id,
  flag = "checkbox",
  value,
  active,
  checked,
  onCheckedChanged,
}: {
  readonly id: number;
  readonly flag: string;
  readonly value: string;
  readonly active: boolean;
  readonly checked: boolean;
  readonly onCheckedChanged: (checked: boolean) => void;
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Checkbox
        id={`${flag}-${id}`}
        disabled={!active}
        checked={checked}
        onCheckedChange={onCheckedChanged}
      />

      <Label htmlFor={`${flag}-${id}`} className="w-full text-wrap">
        {value}
      </Label>
    </div>
  );
};

const MobileSortFilterHeading = ({ title }: { readonly title: string }) => {
  return (
    <div className="bg-brand-gray-200 px-5 py-3 text-base text-brand-gray-500">
      {title}
    </div>
  );
};

const MobileSortFilterOption = ({
  title,
  active,
  onChecked,
}: {
  readonly title: string;
  readonly active: boolean;
  readonly onChecked: () => void;
}) => {
  return (
    <div
      className={cn(
        "py-2 pl-8 pr-2",
        active ? "bg-brand-secondary bg-opacity-20 text-brand-secondary" : "",
      )}
    >
      <Button
        variant="ghost"
        className="font-base flex w-full items-center justify-between font-bold normal-case"
        onClick={onChecked}
        data-button-action="Order History Sort Mobile Filter"
      >
        {title}
        <MdCheck
          className={cn(
            "text-2xl leading-none text-brand-secondary",
            active ? "block" : "hidden",
          )}
          data-button-action="Order History Sort Mobile Filter"
        />
      </Button>
    </div>
  );
};
