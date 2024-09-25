import { formatNumberToPrice } from "@/_lib/utils";
import dayjs from "dayjs";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

type OrderDetailsForMobileProps = {
  readonly orderDetail: {
    orderNo: string;
    orderType: string;
    orderStatus: string;
    email: string;
    orderDate: string;
    orderBy: string;
    firstName: string;
    lastName: string;
    soldTo: string;
    shipTo: string;
    po: string;
    jobName: string;
    handlingFee: number;
    subTotal: number;
    orderTotal: number;
    taxAmount: number;
    promoCode: string;
    driverNotes: string;
    billToAddress: {
      attention: string;
      street: string;
      city: string;
      region: string;
      zipCode: string;
      phoneNumber: string;
    };
    shipToAddress: {
      attention: string;
      street: string;
      city: string;
      region: string;
      zipCode: string;
      phoneNumber: string;
    };
    paymentMethod: string;
    completeDelivery: boolean;
  };
  readonly paymentMethods: {
    code: string;
    name: string;
    isCreditCard: boolean;
  }[];
};

const OrderDetailsForMobile = ({
  orderDetail,
  paymentMethods,
}: OrderDetailsForMobileProps) => {
  const orderTrackingHref = orderDetail.orderNo
    ? `/myaccount/orderhistory/ordertrackinglog/${orderDetail.orderNo}`
    : "#";

  const getPaymentMethodName = (paymentCode: string) => {
    const paymentMethod = paymentMethods.find(
      (method) => method.code === paymentCode,
    );

    return paymentMethod?.name ?? "N/A";
  };

  return (
    <div className="block md:hidden">
      <div className="mb-4 flex flex-row">
        <div className="flex-1">
          <div>Status</div>
          <div className="text-base font-bold text-brand-secondary">
            {orderDetail?.orderStatus ?? "N/A"}
          </div>
        </div>

        <div className="flex-1">
          <Link
            href={orderTrackingHref}
            className="btnAction inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-brand-primary px-3.5 py-2 text-center font-wurth text-base font-extrabold uppercase leading-5 text-brand-primary"
            data-button-action="Order History Order Tracking"
          >
            Order Tracking
            <MdKeyboardArrowRight className="text-2xl leading-none" />
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {/* Details Card for Mobile */}
        <div className="flex flex-col rounded border text-brand-gray-500">
          <div className="flex flex-row border-b p-[15px]">
            <div className="flex-1">
              <div className="text-sm">Order Date</div>
              <div className="text-black">
                {orderDetail?.orderDate !== ""
                  ? dayjs(orderDetail.orderDate).format("MM/DD/YYYY")
                  : "N/A"}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm">Account No</div>
              <div className="text-black">{orderDetail?.soldTo ?? "N/A"}</div>
            </div>
          </div>

          <div className="flex flex-row border-b p-[15px]">
            <div className="flex-1">
              <div className="text-sm">Order By</div>
              <div className="max-w-40 truncate text-black">
                {orderDetail?.orderBy !== orderDetail?.email
                  ? orderDetail?.orderBy
                  : `${orderDetail.firstName} ${orderDetail.lastName}`}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm">Email</div>
              <div className="max-w-40 truncate text-black">
                {orderDetail?.email ?? "N/A"}
              </div>
            </div>
          </div>

          <div className="flex flex-row border-b p-[15px]">
            <div className="flex-1 space-y-1">
              <div className="text-sm">P.O. No.</div>
              <div className="max-w-40 truncate font-bold text-black">
                {orderDetail?.po ?? "N/A"}
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <div className="text-sm">Job Name</div>
              <div className="max-w-40 truncate font-bold text-black">
                {orderDetail?.jobName ?? "N/A"}
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2 border-b p-[15px]">
            <div className="flex-1">
              <div className="mb-1 text-sm">Billing Address</div>

              <div className="text-wrap text-black">
                {orderDetail?.billToAddress?.attention ?? ""}
              </div>
              <div className="text-wrap text-black">
                {orderDetail?.billToAddress?.street ?? ""}
              </div>
              <div className="text-wrap text-black">
                {orderDetail?.billToAddress?.city ?? ""}
              </div>
              <div className="text-wrap text-black">
                {orderDetail?.billToAddress?.region ?? ""}&nbsp;
                {orderDetail?.billToAddress?.zipCode ?? ""}
              </div>
              <div>Phone : {orderDetail?.billToAddress?.phoneNumber ?? ""}</div>
            </div>

            <div className="flex-1">
              <div className="mb-1 text-sm">Shipping Address</div>

              <div className="text-wrap text-black">
                {orderDetail?.shipToAddress?.attention ?? ""}
              </div>
              <div className="text-wrap text-black">
                {orderDetail?.shipToAddress?.street ?? ""}
              </div>
              <div className="text-wrap text-black">
                {orderDetail?.shipToAddress?.city ?? ""}
              </div>
              <div className="text-wrap text-black">
                {orderDetail?.shipToAddress?.region ?? ""}&nbsp;
                {orderDetail?.shipToAddress?.zipCode ?? ""}
              </div>
              <div>Phone : {orderDetail?.shipToAddress?.phoneNumber ?? ""}</div>
            </div>
          </div>

          <div className="flex flex-row border-b p-[15px]">
            <div className="flex-1">
              <div className="text-sm">Payment Terms</div>
              <div className="text-wrap text-black">
                {getPaymentMethodName(orderDetail?.paymentMethod)}
              </div>
            </div>

            <div className="flex-1">
              <div className="text-sm">Promo Code</div>
              <div className="text-wrap text-black">
                {orderDetail?.promoCode !== "" ? orderDetail.promoCode : "N/A"}
              </div>
            </div>
          </div>

          <div className="flex flex-col p-[15px]">
            <div className="text-sm">Driver&rsquo;s Note</div>
            <div className="text-wrap text-black">
              {orderDetail?.driverNotes !== ""
                ? orderDetail.driverNotes
                : "N/A"}
            </div>
          </div>
        </div>

        {/* Order Summary Card for Mobile */}
        <div className="flex flex-col rounded border p-4 text-brand-gray-500 md:hidden">
          <div className="mb-3 border-b pb-3 text-lg font-bold text-black">
            Order Summary
          </div>

          <div className="flex flex-row items-center justify-between py-2">
            <div>Shipping & Handing</div>
            <div>${formatNumberToPrice(orderDetail.handlingFee)}</div>
          </div>

          <div className="flex flex-row items-center justify-between py-2">
            <div>Sub Total</div>
            <div>${formatNumberToPrice(orderDetail.subTotal)}</div>
          </div>

          <div className="mb-3 flex flex-row items-center justify-between border-b py-2">
            <div>Sales Tax</div>
            <div>${formatNumberToPrice(orderDetail.taxAmount)}</div>
          </div>

          <div className="flex flex-row items-center justify-between text-lg font-bold text-black">
            <div>Total</div>
            <div>${formatNumberToPrice(orderDetail.orderTotal)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsForMobile;
