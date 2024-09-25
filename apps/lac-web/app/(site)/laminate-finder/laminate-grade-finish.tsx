import useLaminateFilter from "@/_hooks/product/use-laminate-item-info.hook";
import type { Product } from "@/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { LaminateAddToCartFormSchema } from "./helpers";
import { laminateAddToCartFormSchema } from "./helpers";
import LaminateItems from "./laminate-items";

const LaminateGradeFinish = ({
  groupId,
  product,
  token,
  singleGrade,
  singleFinish,
  singleGradeFinishProductIds,
}: {
  readonly groupId: string;
  readonly product: Product;
  readonly token: string;
  readonly singleGrade: string;
  readonly singleFinish: string;
  readonly singleGradeFinishProductIds: string[];
}) => {
  const { data: laminateData } = useLaminateFilter(
    Number(product.variants[0]?.id),
  );

  const grades = laminateData?.groupFilters?.values_ALL?.GRADE;
  const finishes = laminateData?.groupFilters?.values_ALL?.FINISH;

  const [selectedGrade, setSelectedGrade] = useState(singleGrade);
  const [selectedFinish, setSelectedFinish] = useState(singleFinish);
  const [productIds, setProductIds] = useState(singleGradeFinishProductIds);

  const form = useForm<LaminateAddToCartFormSchema>({
    resolver: zodResolver(laminateAddToCartFormSchema),
  });

  const onGradeValueChange = (grade: string) => {
    setSelectedGrade(grade);
    if (selectedFinish) {
      const possibleProductIdsForFinishes =
        laminateData?.groupFilters?.values_FINISH;
      setProductIds(
        possibleProductIdsForFinishes?.[selectedFinish]?.[grade]?.productids ??
          [],
      );
    }
  };

  const onFinishValueChange = (finish: string) => {
    setSelectedFinish(finish);
    if (selectedGrade) {
      const possibleProductIdsForGrades =
        laminateData?.groupFilters?.values_GRADE;
      setProductIds(
        possibleProductIdsForGrades?.[selectedGrade]?.[finish]?.productids ??
          [],
      );
    }
  };

  return (
    <div className="grow">
      <h4 className="text-lg font-semibold">Laminate details</h4>
      <p className="mb-2 text-wurth-gray-800">
        Please select a <strong>Grade</strong> and <strong>Finish</strong> to
        show items.
      </p>
      <div className="mb-4 flex gap-1">
        <Select
          onValueChange={onGradeValueChange}
          value={selectedGrade}
          disabled={!!singleGrade}
        >
          <SelectTrigger>
            <SelectValue placeholder="Grade" />
          </SelectTrigger>
          <SelectContent>
            {grades?.map((grade) => (
              <SelectItem key={grade} value={grade}>
                {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={onFinishValueChange}
          value={selectedFinish}
          disabled={!!singleFinish}
        >
          <SelectTrigger>
            <SelectValue placeholder="Finish" />
          </SelectTrigger>
          <SelectContent>
            {finishes?.map((finish) => (
              <SelectItem key={finish} value={finish}>
                {finish}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <FormProvider {...form}>
        <LaminateItems
          productIds={productIds}
          token={token}
          groupId={groupId}
        />
      </FormProvider>
    </div>
  );
};

export default LaminateGradeFinish;
