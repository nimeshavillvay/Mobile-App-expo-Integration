import {
  IN_STOCK,
  LIMITED_STOCK,
  NOT_AVAILABLE,
  NOT_IN_STOCK,
} from "@/_lib/constants";
import type { Plant } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { RadioGroupItem } from "@repo/web-ui/components/ui/radio-group";
import { MAIN_OPTIONS } from "../constants";
import type { Availability } from "../types";
import NotAvailableInfoBanner from "./cart-item-not-available-banner";
import PlantName from "./plant-name";

type CartItemWillCallTransferProps = {
  readonly plants: Plant[];
  readonly willCallAnywhere: Availability["willCallAnywhere"];
  readonly value: string;
  readonly id: string;
  readonly xPlant: string;
};
const CartItemWillCallTransfer = ({
  willCallAnywhere,
  plants,
  value,
  id,
  xPlant,
}: CartItemWillCallTransferProps) => {
  if (!willCallAnywhere[1] || willCallAnywhere.length <= 1) {
    return null;
  }

  const willCallItem = willCallAnywhere[1];

  return (
    <>
      {willCallItem.status === IN_STOCK && (
        <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
          <div className="w-4">
            <RadioGroupItem value={value} id={id} />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex flex-row items-center text-sm">
              <span className="font-medium">
                <ItemCountBadge count={willCallItem.willCallQuantity} />
                &nbsp; transfer from&nbsp;
                <PlantName plants={plants} plantCode={xPlant} /> to&nbsp;
                <PlantName
                  plants={plants}
                  plantCode={willCallItem.willCallPlant}
                />
              </span>
            </div>
            <span className="text-xs text-wurth-gray-500">
              Your order will be ready for pick up next day.
            </span>
          </div>
        </div>
      )}

      {willCallItem.status === LIMITED_STOCK && (
        <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
          <div className="w-4">
            <RadioGroupItem value={value} id={id} />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center text-sm">
              <span className="font-medium">
                <ItemCountBadge count={willCallItem.willCallQuantity} />
                &nbsp;transfer from&nbsp;
                <PlantName plants={plants} plantCode={xPlant} /> to&nbsp;
                <PlantName
                  plants={plants}
                  plantCode={willCallItem.willCallPlant}
                />
              </span>
            </div>
            {willCallItem.backOrder && (
              <BackOrderItemCountLabel
                count={willCallItem.backOrderQuantity_1 ?? 0}
              />
            )}
            <span className="text-xs text-wurth-gray-500">
              The available quantity will be ready for pick up the next day.
            </span>
          </div>
        </div>
      )}

      {willCallItem.status === NOT_IN_STOCK && (
        <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
          <div className="w-4">
            <RadioGroupItem value={value} id={id} />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="rounded bg-red-800/10 px-2 py-1 text-sm text-red-800">
              This item is out of stock at&nbsp;
              <PlantName plants={plants} plantCode={xPlant} /> and cannot be
              transferred to{" "}
              <PlantName
                plants={plants}
                plantCode={willCallItem.willCallPlant}
              />
            </div>
            {willCallItem.willCallQuantity && (
              <BackOrderItemCountLabel count={willCallItem.willCallQuantity} />
            )}
          </div>
        </div>
      )}

      {willCallItem.status === NOT_AVAILABLE && (
        <NotAvailableInfoBanner
          willCallType={MAIN_OPTIONS.WILL_CALL_TRANSFER}
          plants={plants}
          willCallPlant={xPlant}
          willCallTransferPlant={willCallItem.willCallPlant}
        />
      )}
    </>
  );
};

export default CartItemWillCallTransfer;

const ItemCountBadge = ({
  count = 0,
  className,
}: {
  readonly count: number;
  readonly className?: string;
}) => {
  return (
    <span
      className={cn(
        "rounded bg-green-700/10 px-1 font-medium text-green-700",
        className,
      )}
    >
      {count}&nbsp;{count > 1 ? "items" : "item"}
    </span>
  );
};

const BackOrderItemCountLabel = ({ count }: { readonly count: number }) => {
  return (
    <div className="text-sm font-medium">
      <span className="rounded bg-yellow-700/10 px-1 text-yellow-700">
        Backorder
      </span>
      &nbsp;{count}&nbsp;{count > 1 ? "items" : "item"}
    </div>
  );
};
