import { IN_STOCK, LIMITED_STOCK } from "@/_lib/constants";
import { cn } from "@/_lib/utils";

type AvailabilityStatusProps = {
  readonly availabilityStatus: string;
  readonly amount: number;
  readonly branch: string;
  readonly isHomePlant: boolean;
};

const AvailabilityStatus = ({
  availabilityStatus,
  amount,
  branch,
  isHomePlant,
}: AvailabilityStatusProps) => {
  const isLimitedStock = availabilityStatus === LIMITED_STOCK && amount > 0;
  const isInStock = availabilityStatus === IN_STOCK && amount > 0;
  let statusText = "";

  if (!isHomePlant) {
    statusText = "Not stocked";
  } else if (isInStock) {
    statusText = `${amount} in stock`;
  } else if (isLimitedStock) {
    statusText = `Only ${amount} in stock`;
  } else {
    statusText = "Out of stock";
  }

  return (
    <div className="text-sm text-wurth-gray-800">
      <span
        className={cn(
          "font-semibold",
          isInStock
            ? "text-green-700"
            : isLimitedStock
              ? "text-yellow-700"
              : "text-red-700",
        )}
      >
        {statusText}
      </span>
      &nbsp;at&nbsp;
      {branch}
    </div>
  );
};

export default AvailabilityStatus;
