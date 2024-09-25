"use client";

import Separator from "@/old/_components/separator";
import BackButton from "../back-button";

type DetailedOrderErrorProps = {
  readonly params: {
    orderId: string;
  };
};

const DetailedOrderError = ({
  params: { orderId },
}: DetailedOrderErrorProps) => {
  return (
    <div className="container pb-6 md:px-0">
      <BackButton title="Back to My Orders" className="mb-2" />

      <h2 className="relative font-wurth text-xl font-medium text-brand-primary">
        Order #{orderId}
      </h2>

      <Separator
        orientation="horizontal"
        className="mb-2.5 h-px flex-1 bg-brand-primary"
      />

      <div className="mt-10 rounded-sm border border-brand-primary p-6 text-center font-wurth text-lg capitalize text-brand-primary">
        Oops... Something went wrong!
      </div>
    </div>
  );
};

export default DetailedOrderError;
