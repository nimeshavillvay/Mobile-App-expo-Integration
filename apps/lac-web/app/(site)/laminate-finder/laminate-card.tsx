"use client";

import useLaminateFilter from "@/_hooks/product/use-laminate-item-info.hook";
import useSuspenseProductExcluded from "@/_hooks/product/use-suspense-product-excluded.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import type { Product } from "@/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@repo/web-ui/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";

import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import Image from "next/image";
import { Suspense, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  laminateAddToCartFormSchema,
  type LaminateAddToCartFormSchema,
} from "./helpers";
import LaminateEdgeBanding from "./laminate-edgebanding";
import LaminateGradeFinish from "./laminate-grade-finish";
import LaminateGroup from "./laminate-group";

const RegionalExcludedBanner = ({
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
    <div className="absolute left-0 right-0 top-0 px-2 pt-2">
      <Alert variant="destructive">
        <AlertDescription>Not available in your territory.</AlertDescription>
      </Alert>
    </div>
  );
};

const LaminateCard = ({
  product,
  token,
  groupId,
}: {
  readonly groupId: string;
  readonly product: Product;
  readonly token: string;
}) => {
  const loginCheckResponse = useSuspenseCheckLogin(token);
  const isLoggedIn = loginCheckResponse.data?.status_code === "OK";

  const form = useForm<LaminateAddToCartFormSchema>({
    resolver: zodResolver(laminateAddToCartFormSchema),
  });

  const { data: laminateData } = useLaminateFilter(
    Number(product.variants[0]?.id),
  );

  const grades = laminateData?.groupFilters?.values_ALL?.GRADE;
  const finishes = laminateData?.groupFilters?.values_ALL?.FINISH;

  const possibleProductIdsForFinishes =
    laminateData?.groupFilters?.values_FINISH;

  const [open, setOpen] = useState(false);

  const singleGrade =
    grades !== undefined && grades.length === 1 ? grades[0] : "";
  const singleFinish =
    finishes !== undefined && finishes.length === 1 ? finishes[0] : "";

  const productIds =
    singleGrade && singleFinish
      ? possibleProductIdsForFinishes?.[singleFinish]?.[singleGrade]
          ?.productids || []
      : [];

  const closeDialog = (isOpen: boolean) => {
    setOpen(isOpen);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogTrigger asChild>
        <div className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md">
          <div className="aspect-square relative w-full">
            <Image
              src={product.groupImage ?? product.variants[0]?.image}
              alt={product.groupName}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {isLoggedIn && (
            <RegionalExcludedBanner
              token={token}
              productId={Number(product.variants[0]?.id)}
            />
          )}

          {!isLoggedIn && product.variants[0]?.isExcludedProduct && (
            // todo: need to get this on group level if possible
            <div className="absolute left-0 right-0 top-0 px-2 pt-2">
              <Alert variant="destructive">
                <AlertDescription>
                  This item is not available in certain regions.
                </AlertDescription>
              </Alert>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 transform bg-black bg-opacity-70 p-3 text-white">
            <h3
              className="mb-1 line-clamp-2 text-sm font-semibold"
              title={product.groupName}
              dangerouslySetInnerHTML={{ __html: product.groupName }}
            />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[52rem] lg:max-w-screen-lg">
        <div>
          <div className="flex flex-col gap-4 lg:flex-row">
            <Suspense
              key={`group-${product.variants[0]?.id}`}
              fallback={
                <Skeleton className="flex h-[39rem] w-full gap-4 lg:w-60 lg:flex-col" />
              }
            >
              <LaminateGroup
                product={product}
                brandImage={laminateData?.brandImage ?? ""}
                brandName={laminateData?.brandName ?? ""}
              />
            </Suspense>
            <Suspense
              key={`grade-finish-${product.variants[0]?.id}`}
              fallback={
                <Skeleton className="h-20 w-[20rem] rounded-lg shadow-md" />
              }
            >
              <LaminateGradeFinish
                product={product}
                token={token}
                groupId={groupId}
                singleGrade={singleGrade ?? ""}
                singleFinish={singleFinish ?? ""}
                singleGradeFinishProductIds={productIds}
              />
            </Suspense>
          </div>
        </div>
        {laminateData?.edgebanding !== undefined &&
          laminateData?.edgebanding.length > 0 && (
            <FormProvider {...form}>
              <LaminateEdgeBanding
                product={product}
                token={token}
                groupId={groupId}
              />
            </FormProvider>
          )}
      </DialogContent>
    </Dialog>
  );
};

export default LaminateCard;
