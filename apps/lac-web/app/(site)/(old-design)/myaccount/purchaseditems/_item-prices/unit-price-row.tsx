import { formatNumberToPrice } from "@/_lib/utils";
import { calculatePriceDetails } from "@/old/_utils/price-utils";

type UnitPriceRowProps = {
  readonly price: number;
  readonly listPrice: number;
  readonly uom: string;
};

// TODO: Can be reusable in other components
const UnitPriceRow = ({ price, listPrice, uom }: UnitPriceRowProps) => {
  const { displayPrice } = calculatePriceDetails(price, listPrice);

  return (
    <div className="flex flex-row justify-end gap-1 px-4">
      <div className="font-bold">${formatNumberToPrice(displayPrice)}</div>
      <div>/ {uom ?? ""}</div>
    </div>
  );
};

export default UnitPriceRow;
