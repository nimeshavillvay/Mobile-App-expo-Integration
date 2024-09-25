"use client";

import useSuspenseAccountList from "@/_hooks/user/use-suspense-account-list.hook";
import { cn } from "@/_lib/utils";
import { Email } from "@repo/web-ui/components/icons/email";
import { Phone } from "@repo/web-ui/components/icons/phone";
import { buttonVariants } from "@repo/web-ui/components/ui/button";
import Image from "next/image";

type SalesRepresentativeProps = {
  readonly token: string;
  readonly className?: string;
};

const SalesRepresentative = ({
  token,
  className,
}: SalesRepresentativeProps) => {
  const accountListQuery = useSuspenseAccountList(token);
  const salesRep = accountListQuery.data.sales_rep;

  if (Array.isArray(salesRep) || !("fullname" in salesRep)) {
    // If there is not sales rep, the field is an empty array
    return null;
  }

  return (
    <div
      className={cn(
        "space-y-6 rounded-lg border p-6 font-body text-wurth-gray-800 shadow-md",
        className,
      )}
    >
      <h4 className="font-title text-xl font-medium tracking-[-0.1px]">
        Your Sales Representative
      </h4>

      <div className="flex flex-col items-start gap-4 xl:flex-row">
        <Image
          src={salesRep.img}
          alt={salesRep.fullname}
          width={144}
          height={144}
          className="size-36 shrink-0 rounded-lg object-contain"
        />

        <div className="min-w-0 flex-1 space-y-2">
          <div className="space-y-1">
            <h5 className="text-lg font-semibold">{salesRep.fullname}</h5>

            <ul className="flex flex-col text-[0.875rem]">
              <li>
                <a
                  href={`tel:${salesRep.phone}`}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "btnAction group h-fit p-0",
                  )}
                  data-btn-action="Click Sales Rep Phone"
                >
                  <Phone className="group-hover:stroke-red-800" />

                  <span>{salesRep.phone}</span>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:johndoe@gmail.com`}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "btnAction group h-fit p-0",
                  )}
                  data-btn-action="Click Sales Rep Email"
                >
                  <Email className="group-hover:fill-red-800" />

                  <span>{salesRep.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {!!salesRep.message && (
            <div className="space-y-1 rounded-md bg-wurth-gray-50 p-4 text-sm">
              <h5 className="font-semibold">
                A message from {salesRep.fullname}
              </h5>
              <p>{salesRep.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesRepresentative;
