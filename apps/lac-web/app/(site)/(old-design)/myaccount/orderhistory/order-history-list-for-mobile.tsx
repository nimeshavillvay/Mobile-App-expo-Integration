import { formatNumberToPrice } from "@/_lib/utils";
import dayjs from "dayjs";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { UI_DATE_FORMAT } from "./constants";
import type { Order } from "./types";

type OrderHistoryListForMobileProps = {
  readonly items: Order[];
  readonly token: string;
  readonly isLoading: boolean;
};

const OrderHistoryListForMobile = ({
  items,
}: OrderHistoryListForMobileProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 bg-brand-gray-200 py-4 md:hidden">
      {items &&
        items.length > 0 &&
        items.map((order) => (
          <OrderHistoryRowForMobile key={order.orderNo} order={order} />
        ))}
    </div>
  );
};

export default OrderHistoryListForMobile;

const OrderHistoryRowForMobile = ({ order }: { readonly order: Order }) => {
  const orderDetailHref =
    order.orderNo !== "" ? `/myaccount/orderhistory/${order.orderNo}` : "#";

  return (
    <Link
      className="btnAction flex flex-col gap-3 bg-white p-4"
      href={orderDetailHref}
      data-button-action="Order History Mobile List"
    >
      <div className="flex flex-row justify-between">
        <div className="font-bold">
          {order.attnName !== ""
            ? order.attnName
            : `${order.firstName} ${order.lastName}`}
        </div>
        <div className="text-brand-gray-500">
          {order.orderDate
            ? dayjs(order.orderDate).format(UI_DATE_FORMAT)
            : "N/A"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 rounded-md bg-brand-gray-100 p-4">
        <div className="font-bold">Order</div>
        <div>
          <span className="text-brand-gray-400">PO #: </span>
          {order.po}
        </div>
        <div>No. {order.orderNo}</div>
        <div>
          <span className="text-brand-gray-400">Job #: </span>
          {order.jobName}
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <OrderStatusBadgeMobile status={order.status} />
        <div className="flex flex-row items-center">
          <div className="font-bold">
            ${formatNumberToPrice(Number(order.orderTotal))}
          </div>
          <MdKeyboardArrowRight className="text-2xl leading-none text-brand-gray-400" />
        </div>
      </div>
    </Link>
  );
};

const OrderStatusBadgeMobile = ({ status }: { readonly status: string }) => {
  return (
    <div className="font-bold text-brand-secondary">
      {status !== "" ? status : "N/A"}
    </div>
  );
};
