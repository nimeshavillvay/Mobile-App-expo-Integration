import { formatNumberToPrice } from "@/_lib/utils";
import { TableCell, TableRow } from "@/old/_components/ui/table";
import dayjs from "dayjs";
import Link from "next/link";
import { MdInsertDriveFile } from "react-icons/md";
import { getTableRowBgColor } from "../_utils/client-helpers";
import { UI_DATE_FORMAT } from "./constants";
import type { Order } from "./types";

type OrderHistoryRowProps = {
  readonly index: number;
  readonly order: Order;
};

const OrderHistoryRow = ({ index, order }: OrderHistoryRowProps) => {
  const orderTrackingHref =
    order.orderNo !== ""
      ? `orderhistory/ordertrackinglog/${order.orderNo}`
      : "#";
  const orderDetailHref =
    order.orderNo !== "" ? `orderhistory/${order.orderNo}` : "#";

  return (
    <>
      <TableRow className={getTableRowBgColor(index)}>
        <TableCell className="text-center" rowSpan={2}>
          <Link
            className="btnAction flex flex-col items-center justify-center gap-2"
            href={orderDetailHref}
            data-button-action="Order History Order Type"
          >
            <div>{order.orderType ?? "N/A"}</div>
            <MdInsertDriveFile className="text-2xl text-brand-gray-400" />
          </Link>
        </TableCell>

        <TableCell className="text-center">{order.orderNo}</TableCell>

        <TableCell className="text-center">
          {order.orderDate !== ""
            ? dayjs(order.orderDate).format(UI_DATE_FORMAT)
            : "N/A"}
        </TableCell>

        <TableCell className="text-center">
          ${formatNumberToPrice(Number(order.orderTotal))}
        </TableCell>

        <TableCell className="text-center" rowSpan={2}>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="px-4 py-2 font-title font-bold text-brand-secondary">
              {order.status ?? "N/A"}
            </div>

            <Link
              className="btnAction block rounded-sm bg-brand-gray-200 px-4 py-2 text-center font-wurth font-extrabold uppercase text-brand-gray-500 transition-colors duration-300 ease-in-out hover:bg-brand-gray-300"
              href={orderTrackingHref}
              data-button-action="Order Tracking Log"
            >
              Order Tracking Log
            </Link>
          </div>
        </TableCell>
      </TableRow>

      <TableRow className={getTableRowBgColor(index)}>
        <TableCell className="flex flex-col text-center">
          <h4 className="font-bold">Order By:</h4>
          <div>
            {order.attnName !== ""
              ? order.attnName
              : `${order.firstName} ${order.lastName}`}
          </div>
        </TableCell>

        <TableCell className="text-center">
          <h4 className="font-bold">PO#:</h4>
          <div>{order.po !== "" ? order.po : "N/A"}</div>
        </TableCell>

        <TableCell className="text-center">
          <h4 className="font-bold">Job#:</h4>
          <div>{order.jobName !== "" ? order.jobName : "N/A"}</div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderHistoryRow;
