"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useUpdateCartConfigMutation from "@/_hooks/cart/use-update-cart-config-mutation.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCartFormIdContext } from "./cart-form-id-context";

const detailsSchema = z.object({
  po: z.string(),
  projectName: z.string().optional(),
});

type CartDetailsProps = {
  readonly token: string;
};

const CartDetails = ({ token }: CartDetailsProps) => {
  const id = useId();
  const poId = `po-${id}`;
  const projectNameId = `project-name-${id}`;

  const { toast } = useToast();
  const { data } = useSuspenseCart(token);

  enum PoJob {
    PoRequired = "P",
    JobNameRequired = "J",
    BothRequired = "B",
  }

  const { register, getValues } = useForm<z.infer<typeof detailsSchema>>({
    resolver: zodResolver(detailsSchema),
    values: {
      po: data.configuration.po ?? "",
      projectName: data.configuration.jobName ?? "",
    },
  });

  const isPoRequired =
    data.configuration.po_job === PoJob.PoRequired ||
    data.configuration.po_job === PoJob.BothRequired;
  const isJobNameRequired =
    data.configuration.po_job === PoJob.JobNameRequired ||
    data.configuration.po_job === PoJob.BothRequired;

  const cartFormId = useCartFormIdContext();

  const updateCartConfigMutation = useUpdateCartConfigMutation();

  const handleSave = () => {
    const data = getValues();

    updateCartConfigMutation.mutate(
      {
        po: data.po,
        jobName: data.projectName ?? "",
      },
      {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to update cart details",
          });
        },
      },
    );
  };

  return (
    <div className="space-y-3 rounded-lg border border-wurth-gray-150 px-5 py-4 shadow-md">
      <div className="space-y-2">
        <Label htmlFor={poId}>
          PO Number {isPoRequired && <span>(Required)</span>}
        </Label>

        <Input
          {...register("po", { onBlur: handleSave })}
          id={poId}
          type="text"
          required={isPoRequired}
          form={cartFormId}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={projectNameId}>
          Project Name {isJobNameRequired && <span>(Required)</span>}
        </Label>

        <Input
          {...register("projectName", { onBlur: handleSave })}
          id={projectNameId}
          type="text"
          required={isJobNameRequired}
          form={cartFormId}
        />
      </div>
    </div>
  );
};

export default CartDetails;
