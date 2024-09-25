import { UI_DATE_FORMAT } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import dayjs from "dayjs";

type AvailabilityStatusProps = {
  readonly location: string;
  readonly amount: number;
  readonly isHomeBranch: boolean;
  readonly backOrderDate: string;
  readonly isLimitedStock: boolean;
  readonly isNotInStock: boolean;
  readonly xPlant: string;
  readonly isNotStocked: boolean;
};

const AvailabilityStatus = ({
  isLimitedStock,
  isNotInStock,
  isNotStocked,
  isHomeBranch,
  amount,
  location,
  backOrderDate,
  xPlant,
}: AvailabilityStatusProps) => {
  return (
    <div className="availability-container flex flex-row flex-wrap items-center gap-2">
      <div
        className={cn(
          "stock-position rounded px-4 py-2 text-sm font-semibold leading-4 md:px-2 md:py-1",
          isLimitedStock || isNotInStock || !isHomeBranch || isNotStocked
            ? "bg-yellow-50 text-yellow-700"
            : "bg-green-50 text-green-700",
        )}
      >
        {isNotStocked
          ? "Not Stocked"
          : isNotInStock
            ? "Backordered"
            : isLimitedStock
              ? "Limited Stock"
              : "In Stock"}
      </div>

      {isNotStocked && (
        <div className="text-sm font-medium text-wurth-gray-800">
          at {xPlant}
        </div>
      )}

      {isHomeBranch && !isNotInStock && !isNotStocked && (
        <div className="text-sm font-medium text-wurth-gray-800">
          <span className="stock-available">{amount}</span> in stock at{" "}
          <span className="stock-location">{location}</span>
        </div>
      )}
      {isNotInStock && !!backOrderDate && !isNotStocked && (
        <div className="stock-message flex-1 text-sm font-medium text-wurth-gray-800">
          Items are expected to ship by{" "}
          {dayjs(backOrderDate).format(UI_DATE_FORMAT)}.
        </div>
      )}
    </div>
  );
};

export default AvailabilityStatus;
