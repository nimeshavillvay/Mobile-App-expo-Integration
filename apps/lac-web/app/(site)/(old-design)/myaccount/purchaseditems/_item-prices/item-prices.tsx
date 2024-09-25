import { formatNumberToPrice } from "@/_lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import type { PriceRow } from "./types";
import UnitPriceRow from "./unit-price-row";
import UnitPriceRowForMobile from "./unit-price-row-for-mobile";

type ItemPricesProps = {
  readonly quantity: number;
  readonly uom: string;
  readonly listPrice: number;
  readonly showUnitPrice?: boolean;
  readonly unitPriceOnly?: boolean;
  readonly prices: {
    price: number;
    priceUnit: string;
    quantity: number;
    uomPrice?: number;
    uomPriceUnit?: string;
    priceBreakDowns: {
      quantity: number;
      price: number;
    }[];
  }[];
};

const ItemPrices = ({
  quantity,
  uom,
  listPrice,
  showUnitPrice = false,
  unitPriceOnly = false,
  prices,
}: ItemPricesProps) => {
  const initialPriceData = prices.find((price) => price.quantity === 1);
  const initialPrice =
    initialPriceData?.uomPrice ?? initialPriceData?.price ?? 0;

  const minQuantityPriceData = prices.find(
    (price) => price.quantity === quantity,
  );
  const priceUnit =
    minQuantityPriceData?.uomPriceUnit ?? minQuantityPriceData?.priceUnit ?? "";
  const priceBreakDownArray = minQuantityPriceData?.priceBreakDowns;

  const displayPrice = minQuantityPriceData?.uomPrice
    ? minQuantityPriceData?.uomPrice
    : minQuantityPriceData?.price ?? 0;

  if (unitPriceOnly && minQuantityPriceData) {
    return (
      <UnitPriceRowForMobile
        listPrice={minQuantityPriceData?.uomPrice ?? listPrice}
        uom={priceUnit}
        price={displayPrice}
      />
    );
  }

  return (
    <div className="flex flex-col space-y-2 py-2 text-sm text-brand-gray-500">
      {priceBreakDownArray && priceBreakDownArray.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className="border-b-0">
              <TableHead className="h-8 text-left font-bold text-black">
                Qty
              </TableHead>
              <TableHead className="h-8 text-center font-bold text-black">
                UOM
              </TableHead>
              <TableHead className="h-8 text-right font-bold text-black">
                Price
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {priceBreakDownArray.map((breakDown, index) => (
              <PriceRow
                key={`${breakDown.price}_${index}`}
                quantity={breakDown.quantity}
                uom={uom}
                price={`$${formatNumberToPrice(Math.min(breakDown.price, initialPrice))} / ${priceUnit}`}
              />
            ))}
          </TableBody>
        </Table>
      )}

      {showUnitPrice && minQuantityPriceData && (
        <UnitPriceRow
          listPrice={minQuantityPriceData?.uomPrice ?? listPrice}
          uom={priceUnit}
          price={displayPrice}
        />
      )}
    </div>
  );
};

export default ItemPrices;

const PriceRow = ({
  quantity,
  uom,
  price,
}: {
  readonly quantity: number;
  readonly uom: string;
  readonly price: string;
}) => (
  <TableRow className="border-b-0">
    <TableCell className="py-1 text-left">{quantity}</TableCell>
    <TableCell className="py-1 text-center">{uom}</TableCell>
    <TableCell className="text-nowrap py-1 text-right">{price}</TableCell>
  </TableRow>
);
