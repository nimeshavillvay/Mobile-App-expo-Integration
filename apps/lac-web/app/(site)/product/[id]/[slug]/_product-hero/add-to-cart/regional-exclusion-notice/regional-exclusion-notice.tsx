"use client";

import Warning from "@/_components/warning";
import useSuspenseProductExcluded from "@/_hooks/product/use-suspense-product-excluded.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { Alert } from "@repo/web-ui/components/icons/alert";
import Link from "next/link";

const RegionalExclusionNoticeWrapper = ({
  token,
  productId,
  isExcludedInLoggedOutState,
}: {
  readonly token: string;
  readonly productId: number;
  readonly isExcludedInLoggedOutState: boolean;
}) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  if (checkLoginQuery.data?.status_code === "NOT_LOGGED_IN") {
    if (isExcludedInLoggedOutState) {
      return (
        <div className="flex flex-row gap-2 rounded-lg bg-red-50 p-4">
          <Alert
            className="mt-1 shrink-0 stroke-wurth-red-650"
            width={16}
            height={16}
          />

          <div className="flex-1 space-y-1">
            <h4 className="text-base font-semibold text-wurth-red-650">
              Not Available
            </h4>

            <div className="btnAction text-sm leading-6 text-wurth-gray-800">
              This item is not available in certain regions. For better
              experience please{" "}
              <Link
                href="/sign-in"
                data-btn-action="Regional Excluded Sign in or Register"
              >
                Sign in or register
              </Link>
              .
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  return <RegionalExclusionNotice token={token} productId={productId} />;
};

export default RegionalExclusionNoticeWrapper;

const RegionalExclusionNotice = ({
  token,
  productId,
}: {
  readonly token: string;
  readonly productId: number;
}) => {
  const productExcludedQuery = useSuspenseProductExcluded(token, productId);

  if (!productExcludedQuery.data.isExcluded) {
    return null;
  }

  return (
    <Warning
      title="Not Available"
      description="This item is not available in your territory."
    />
  );
};
