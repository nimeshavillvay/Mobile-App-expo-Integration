import Instructions from "@/_components/instructions";
import {
  getOrderDetails,
  getPaymentMethods,
  getPlants,
} from "@/_lib/apis/server";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cva } from "@/_lib/cva.config";
import { cn, formatNumberToPrice } from "@/_lib/utils";
import { Alert, AlertTitle } from "@repo/web-ui/components/ui/alert";
import { Separator } from "@repo/web-ui/components/ui/separator";
import dayjs from "dayjs";
import { AlertCircle } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Fragment } from "react";

const containerClasses = cva({ base: "flex flex-col gap-3" });
const subHeadingStyles = cva({ base: "text-sm text-wurth-gray-500" });
const tableStyles = cva({ base: "border-separate border-spacing-y-1" });
const tableLabelStyles = cva({ base: "text-sm text-wurth-gray-800" });
const tableValueStyles = cva({
  base: "pl-2 text-sm font-medium text-wurth-gray-800",
});

type DesktopViewProps = {
  readonly orderNo: string;
};

const DesktopView = async ({ orderNo }: DesktopViewProps) => {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionToken?.value) {
    return redirect("/sign-in");
  }

  const [orderDetails, paymentMethods, plants] = await Promise.all([
    getOrderDetails(sessionToken.value, orderNo),
    getPaymentMethods(),
    getPlants(sessionToken?.value),
  ]);

  return (
    <div className="container hidden flex-col gap-5 md:flex">
      <div className="flex flex-col gap-10 rounded-lg border border-wurth-gray-150 p-10 shadow-sm print:hidden">
        <div className="flex flex-col gap-6">
          <h2>Order receipt</h2>

          <div className="grid grid-cols-3 gap-8">
            <div className={containerClasses()}>
              <h3 className={subHeadingStyles()}>Order details</h3>

              <table className={tableStyles()}>
                <tbody>
                  <tr>
                    <td className={tableLabelStyles()}>Order no.</td>
                    <td className={tableValueStyles()}>
                      {orderDetails.orderNo}
                    </td>
                  </tr>

                  <tr>
                    <td className={tableLabelStyles()}>Order date</td>
                    <td className={tableValueStyles()}>
                      {dayjs(orderDetails.orderDate).format("MM/DD/YYYY")}
                    </td>
                  </tr>

                  <tr>
                    <td className={tableLabelStyles()}>Job name</td>
                    <td className={tableValueStyles()}>
                      {orderDetails.jobName}
                    </td>
                  </tr>

                  <tr>
                    <td className={tableLabelStyles()}>PO no.</td>
                    <td className={tableValueStyles()}>{orderDetails.po}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={containerClasses()}>
              <h3 className={subHeadingStyles()}>Billing details</h3>

              <table className={tableStyles()}>
                <tbody>
                  <tr>
                    <td className={tableLabelStyles()}>Payment method</td>
                    <td className={tableValueStyles()}>
                      {
                        paymentMethods.find(
                          (method) =>
                            method.code === orderDetails.paymentMethod,
                        )?.name
                      }
                      {!!orderDetails.lastCardDigits && (
                        <span>
                          {" "}
                          / &#x2022;&#x2022;&#x2022;&#x2022;
                          &#x2022;&#x2022;&#x2022;&#x2022;
                          &#x2022;&#x2022;&#x2022;&#x2022;{" "}
                          {orderDetails.lastCardDigits}
                        </span>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className={tableLabelStyles()}>Bill to</td>
                    <td className={tableValueStyles()}>
                      {`${orderDetails.firstName} ${orderDetails.lastName}`}
                      <br />
                      {orderDetails.billToAddress.attention}
                    </td>
                  </tr>

                  <tr>
                    <td className={tableLabelStyles()}>Email address</td>
                    <td className={tableValueStyles()}>{orderDetails.email}</td>
                  </tr>

                  <tr>
                    <td className={tableLabelStyles()}>Billing address</td>
                    <td className={tableValueStyles()}>
                      #{orderDetails.soldTo},{" "}
                      {orderDetails.billToAddress.street},{" "}
                      {orderDetails.billToAddress.city},{" "}
                      {orderDetails.billToAddress.region},{" "}
                      {orderDetails.billToAddress.county},{" "}
                      {orderDetails.billToAddress.zipCode}
                      {orderDetails.billToAddress.zip4
                        ? ` - ${orderDetails.billToAddress.zip4}, `
                        : ", "}
                      {orderDetails.billToAddress.country}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={containerClasses()}>
              <h3 className={subHeadingStyles()}>Shipping details</h3>

              <table className={tableStyles()}>
                <tbody>
                  <tr>
                    <td className={tableLabelStyles()}>Delivery date</td>
                    <td className={tableValueStyles()}>
                      {orderDetails.pickupDate
                        ? dayjs(orderDetails.pickupDate).format("MM/DD/YYYY")
                        : dayjs(orderDetails.orderDate).format("MM/DD/YYYY")}
                    </td>
                  </tr>

                  <tr>
                    <td className={tableLabelStyles()}>Ship to address</td>
                    <td className={tableValueStyles()}>
                      #{orderDetails.shipTo},{" "}
                      {orderDetails.shipToAddress.street},{" "}
                      {orderDetails.shipToAddress.city},{" "}
                      {orderDetails.shipToAddress.region},{" "}
                      {orderDetails.shipToAddress.county},{" "}
                      {orderDetails.shipToAddress.zipCode}
                      {orderDetails.shipToAddress.zip4
                        ? ` - ${orderDetails.shipToAddress.zip4}, `
                        : ", "}
                      {orderDetails.shipToAddress.country}
                    </td>
                  </tr>

                  <tr>
                    <td className={tableLabelStyles()}>Contact person</td>
                    <td className={tableValueStyles()}>
                      {orderDetails.orderBy !== orderDetails.email
                        ? orderDetails.orderBy
                        : `${orderDetails.firstName} ${orderDetails.lastName}`}
                    </td>
                  </tr>

                  {!!orderDetails.shipToAddress.phoneNumber && (
                    <tr>
                      <td className={tableLabelStyles()}>Phone no.</td>
                      <td className={tableValueStyles()}>
                        {orderDetails.shipToAddress.phoneNumber}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {orderDetails.completeDelivery && (
              <Alert variant="destructive" className="col-span-3 max-w-fit">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  This order will not ship until backorder item(s) are in stock.
                </AlertTitle>
              </Alert>
            )}

            <table className="col-span-2">
              <thead>
                <tr className="border-y border-y-wurth-gray-150 text-sm text-wurth-gray-500">
                  <th colSpan={2} className="px-2 py-3 text-left font-normal">
                    Item description
                  </th>
                  <th className="px-2 py-3 font-normal">Qty</th>
                  <th className="px-2 py-3 font-normal">Amount</th>
                </tr>
              </thead>

              <tbody>
                {orderDetails.items.map((item) =>
                  item.lineItems.map((lineItem) => (
                    <Fragment key={lineItem.itemNo}>
                      <tr className="border-b-wurth-gray-150 last:border-0 even:border-b">
                        <td rowSpan={2}>
                          <Image
                            src={lineItem.itemImage}
                            alt={`An image of ${lineItem.itemDescription}`}
                            width={96}
                            height={96}
                            className="my-5 min-h-24 min-w-24 rounded border border-wurth-gray-250 object-contain shadow-sm"
                          />
                        </td>

                        <td>
                          <h4
                            className="mx-2 text-sm font-medium text-wurth-gray-800"
                            dangerouslySetInnerHTML={{
                              __html: lineItem.itemDescription,
                            }}
                          />
                        </td>

                        <td className="text-nowrap text-sm text-wurth-gray-800">
                          {lineItem.itemTotalQuantity} each
                        </td>

                        <td className="ml-2 text-right text-sm text-wurth-gray-800">
                          ${formatNumberToPrice(lineItem.totalPrice)}
                        </td>
                      </tr>

                      <tr className="border-b border-b-wurth-gray-150 pb-5 last:border-0">
                        <td
                          colSpan={3}
                          className="ml-2 flex flex-row items-center gap-2 rounded bg-wurth-gray-50 px-2 py-0.5 text-sm"
                        >
                          {lineItem.shipQuantity > 0 && lineItem.isWillCall && (
                            <div>
                              {lineItem.shipQuantity} items pickup at{" "}
                              {
                                plants.find(
                                  (plant) => plant.code === lineItem.plant,
                                )?.name
                              }
                            </div>
                          )}
                          {lineItem.shipQuantity > 0 &&
                            !lineItem.isWillCall && (
                              <div>
                                {lineItem.shipQuantity} items ship from{" "}
                                {
                                  plants.find(
                                    (plant) => plant.code === lineItem.plant,
                                  )?.name
                                }
                              </div>
                            )}
                          {lineItem.shipQuantity > 0 && lineItem.boQty > 0 && (
                            <span>&bull;</span>
                          )}
                          {lineItem.boQty > 0 && !!lineItem.boDate && (
                            <div>
                              Backorder {lineItem.boQty} items, ship by{" "}
                              {dayjs(lineItem.boDate).format(
                                "ddd, MMM. D, YYYY",
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    </Fragment>
                  )),
                )}
              </tbody>
            </table>

            <section className="flex flex-col gap-4">
              <div className={containerClasses()}>
                <h3 className={subHeadingStyles()}>Order Summary</h3>

                <table className={tableStyles()}>
                  <tbody>
                    <tr>
                      <td className={tableLabelStyles()}>
                        Subtotal (
                        {orderDetails.items.reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue.totalQuantity,
                          0,
                        )}{" "}
                        items)
                      </td>
                      <td
                        className={cn(
                          tableValueStyles(),
                          "text-right font-normal",
                        )}
                      >
                        ${formatNumberToPrice(orderDetails.subTotal)}
                      </td>
                    </tr>

                    {orderDetails.discount > 0 && (
                      <tr>
                        <td className={tableLabelStyles()}>Saving</td>
                        <td className={cn(tableValueStyles(), "text-right")}>
                          -${orderDetails.discount}
                        </td>
                      </tr>
                    )}
                    {orderDetails.handlingFee > 0 && (
                      <tr>
                        <td className={tableLabelStyles()}>Shipping</td>
                        <td
                          className={cn(
                            tableValueStyles(),
                            "text-right font-normal",
                          )}
                        >
                          {orderDetails.handlingFee > 0
                            ? `$${orderDetails.handlingFee}`
                            : "Free"}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td className={tableLabelStyles()}>Sales tax</td>
                      <td className={cn(tableValueStyles(), "text-right")}>
                        ${formatNumberToPrice(orderDetails.taxAmount)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <Separator
                  orientation="horizontal"
                  className="h-px w-full bg-wurth-gray-150"
                />

                <div className="flex flex-row items-center justify-between pb-4 text-base text-wurth-gray-800">
                  <div>Estimated total</div>

                  <div>${formatNumberToPrice(orderDetails.orderTotal)}</div>
                </div>
              </div>

              {!!orderDetails.driverNotes && (
                <div className="rounded-lg bg-wurth-gray-50 px-6 py-5 text-sm text-wurth-gray-800">
                  <h3>Notes for Delivery Driver</h3>

                  <p className="leading-6">{orderDetails.driverNotes}</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {orderDetails.deliveryInstruction && <Instructions type="desktop" />}
    </div>
  );
};

export default DesktopView;
