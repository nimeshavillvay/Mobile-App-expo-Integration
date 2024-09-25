import { formatNumberToPrice } from "@/_lib/utils";
import { calculatePriceDetails } from "@/old/_utils/price-utils";

type UnitPriceRowForMobileProps = {
  readonly price: number;
  readonly listPrice: number;
  readonly uom: string;
};

const UnitPriceRowForMobile = ({
  price,
  listPrice,
  uom,
}: UnitPriceRowForMobileProps) => {
  const { displayPrice } = calculatePriceDetails(price, listPrice);

  return (
    <div className="mb-1 flex flex-col">
      <div className="flex flex-row items-center gap-1">
        <div className="font-bold">${formatNumberToPrice(displayPrice)}</div>
        <div className="text-sm">/ {uom ?? ""}</div>
      </div>
    </div>
  );
};

export default UnitPriceRowForMobile;
