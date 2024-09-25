"use client";

import { Zap } from "@repo/web-ui/components/icons/zap";

type SaleBadgesProps = {
  readonly onSale: boolean;
  readonly isNewItem: boolean;
  readonly showFlashDealText: boolean;
};

const SaleBadges = ({
  onSale,
  isNewItem,
  showFlashDealText,
}: SaleBadgesProps) => {
  return (
    <div className="flex flex-row justify-end gap-2">
      {isNewItem && (
        <div
          className="flex flex-row items-center gap-1 rounded px-2 py-1.5 text-sm font-semibold leading-4"
          style={{
            color: "#A16207",
            backgroundColor: "#FEF2F2",
          }}
        >
          <span>New</span>
        </div>
      )}

      {onSale && (
        <div className="flex flex-row items-center gap-1 rounded bg-sky-50 px-2 py-1.5 text-sm font-semibold leading-4 text-sky-700">
          <Zap className="size-4 stroke-sky-700" />
          {showFlashDealText && (
            <span className="hidden @[12rem]/labels:block">Flash Deal</span>
          )}
        </div>
      )}
    </div>
  );
};

export default SaleBadges;
