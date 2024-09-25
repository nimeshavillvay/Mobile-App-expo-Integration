import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import { formatNumberToPrice } from "@/_lib/utils";

type Product = {
  productId: number;
  qty: number;
};

const LaminateCardTotalPrice = ({
  token,
  priceCheckRequest,
}: {
  readonly token: string;
  readonly priceCheckRequest: Product[];
}) => {
  const priceCheckQuery = useSuspensePriceCheck(token, priceCheckRequest);
  const extendedPriceSum = priceCheckQuery.data.productPrices.reduce(
    (collector, num) => {
      return (collector += num.extendedPrice);
    },
    0,
  );

  return (
    <strong className="text-lg">
      ${formatNumberToPrice(extendedPriceSum)}
    </strong>
  );
};

export default LaminateCardTotalPrice;
