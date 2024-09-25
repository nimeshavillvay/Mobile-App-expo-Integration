import type { Metadata } from "next";
import { MainTitle } from "../_components/main-title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../_components/ui/accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs)",
};

const FAQPage = () => {
  return (
    <div className="container flex flex-col">
      <MainTitle className="mt-8">Frequently Asked Questions (FAQs)</MainTitle>
      <Accordion
        type="single"
        collapsible
        className="mt-4 w-full max-w-4xl self-center"
      >
        <AccordionItem value="register">
          <AccordionTrigger className="text-left text-black">
            How do I register or open an account?
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              If you already have been issued an account number with Wurth Louis
              and Company but do not have website access, click the Register
              link in the header or footer of the website and create your online
              account. You must use the Primary User email address provided on
              your original account application to register. If you don&apos;t
              have that information, contact&nbsp;
              <strong>websupport@wurthlac.com</strong> for assistance.
            </p>
            <p>
              If you do not have a Wurth Louis and Company account number, click
              the New Account Application link below or Apply link at the top of
              the screen to get started. Follow the directions there.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="optout">
          <AccordionTrigger className="text-left text-black">
            How do I opt out of receiving special offers via email or fax?
          </AccordionTrigger>
          <AccordionContent>
            If you&apos;d like to opt out of our promotional emails, the best
            way to do so is by using the &quot;Unsubscribe&quot; link at the
            bottom of any promotional email that you receive from us. Please
            allow up to 10 business days for the request to be fulfilled. If
            that doesn&apos;t work, email us at&nbsp;
            <strong>marketing@wurthlac.com</strong> with your request and
            specify the email address you would like to opt out. To opt out of
            our promotional faxes, call&nbsp;
            <a
              href="tel:8008414362"
              className="btnAction text-blue-500 hover:text-blue-900 hover:underline"
              data-btn-action="Click FAQ phone"
            >
              800-841-4362
            </a>
            &nbsp; ext. 42850 or send us a fax to <strong>714-990-0764</strong>{" "}
            with your request and specify the fax number you would like to opt
            out.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="salesrep">
          <AccordionTrigger className="text-left text-black">
            How do I contact my sales representative?
          </AccordionTrigger>
          <AccordionContent>
            To find a sales representative in your area, you can use the
            Who&apos;s My Rep feature at the top of the homepage, or contact
            your local branch manager. Branch contact information may be found
            under Branch Finder.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cancel">
          <AccordionTrigger className="text-left text-black">
            How do I change or cancel an existing order?
          </AccordionTrigger>
          <AccordionContent>
            Any changes or cancellations must be made through the Customer
            Service department at your local branch.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notarrived">
          <AccordionTrigger className="text-left text-black">
            Who do I contact if my product has not arrived?
          </AccordionTrigger>
          <AccordionContent>
            To track an order, please contact the Customer Service department at
            your local branch.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="weborder">
          <AccordionTrigger className="text-left text-black">
            Are all shipment methods available via Web Ordering?
          </AccordionTrigger>
          <AccordionContent>
            Yes, all shipment methods are available through our web ordering
            system with the exception of air shipment (next day or 2
            <sup>nd</sup> day). Some restrictions may apply to individual orders
            based on time of order, your delivery location and product selected.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="companytruck">
          <AccordionTrigger className="text-left text-black">
            Who may receive shipments via Wurth Louis and Company trucks?
          </AccordionTrigger>
          <AccordionContent>
            This service is only available in those areas immediately
            surrounding our distribution centers. The freight policy varies by
            branch, so please contact your local branch for their specific
            terms.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="outside-us">
          <AccordionTrigger className="text-left text-black">
            Can shipments be made outside of the US?
          </AccordionTrigger>
          <AccordionContent>
            Yes, but they are Collect only. Web-based orders cannot be shipped
            out of the US.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notinstock">
          <AccordionTrigger className="text-left text-black">
            What happens if everything I ordered is not in stock?
          </AccordionTrigger>
          <AccordionContent>
            We reserve the right to make partial shipments of any items ordered
            unless the order is marked &quot;ship complete&quot;. Items not
            shipped will be back-ordered at our discretion unless otherwise
            notified. At time of checkout, you will see if an item is
            backordered at your local branch and may, at that time, select to
            have the product shipped from the next closest branch.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ship-direct">
          <AccordionTrigger className="text-left text-black">
            Do all items ship directly from Wurth Louis and Company?
          </AccordionTrigger>
          <AccordionContent>
            No, some items are shipped direct. The freight terms on shipments
            made directly from the manufacturer, regardless of the size of the
            order, are governed by the individual manufacturer requirements.
            Buyer acknowledges and agrees that the actual item shipped from the
            factory may vary from the item shown in Seller&apos;s catalog or on
            the Seller&apos;s website. Seller may not increase the price by
            reason of such change without Buyer&apos;s consent.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fee-exception">
          <AccordionTrigger className="text-left text-black">
            Are there other shipping fees/exceptions?
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-outside list-disc pl-5">
              <li className="mb-1">
                Machinery: Special freight charges may apply.
              </li>
              <li className="mb-1">
                Hazardous Item Fee: These items are sent via common carrier and
                all charges are the responsibility of the purchaser of the
                hazardous item.
              </li>
              <li className="mb-1">
                Laminate Fee: Laminate shipped via third party carrier will
                incur additional box charges.
              </li>
              <li className="mb-1">
                Air shipments (Next Day or Second Day): These services are
                available upon request but at the full expense of the customer
                regardless of the merchandise value of the order. If interested
                in air shipping, contact the Louis and Company Customer Service
                Department to quote approximate charges, however air shipments
                are not available on the web. If the dimensional weight of a
                package exceeds the actual weight, the dimensional weight may be
                used to determine the freight charge.
              </li>
              <li className="mb-1">
                Backorders: There are no freight charges on backorders of stock
                items, regardless of the value of the original order. COD,
                hazardous material fees, and other fees may apply.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="will-call-center">
          <AccordionTrigger className="text-left text-black">
            What are the hours of your Will Calls centers?
          </AccordionTrigger>
          <AccordionContent>
            Each of our distribution centers has its own specific time
            guidelines for the processing of Pickup/Will Call orders, so please
            contact your local branch for their exact schedule.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="return-policy">
          <AccordionTrigger className="text-left text-black">
            What is your return policy/process?
          </AccordionTrigger>
          <AccordionContent>
            <h3 className="my-2 font-bold">Product Returns</h3>
            <p>
              Würth Louis &amp; Company will gladly work with customers to
              accept the return of material for credit under the following
              conditions.
            </p>
            <h3 className="mb-2 mt-4 font-bold">Stock Product</h3>
            <ul className="list-outside list-disc pl-5">
              <li className="mb-1">
                Must have been purchased from Würth Louis &amp; Company.
              </li>
              <li className="mb-1">
                Returned to Würth Louis &amp; Company in good resalable
                condition and in the original packaging.
              </li>
              <li className="mb-1">
                Be a current Würth Louis &amp; Company stock item (discontinued
                or clearance items cannot be returned).
              </li>
              <li className="mb-1">
                Must not have exceeded the product expiration date (adhesive and
                finish).
              </li>
              <li className="mb-1">
                Return of perishable items will be subject to review based upon
                the product&apos;s origin and shelf life.
              </li>
              <li className="mb-1">
                All credits for returned goods are subject to approval by Würth
                Louis &amp; Company.
              </li>
            </ul>

            <h3 className="mb-2 mt-4 font-bold">
              Special order / Non-stock Products
            </h3>
            <ul className="list-outside list-disc pl-5">
              <li className="mb-1">Are not returnable.</li>
              <li className="mb-1">
                Exceptions may be allowed, but only if approved by Purchasing.
              </li>
            </ul>
            <h3 className="mb-2 mt-4 font-bold">Coating Products</h3>
            <ul className="list-outside list-disc pl-5">
              <li className="mb-1">
                Color accuracy should be verified prior to application. Usage of
                material constitutes acceptance of color.
              </li>
              <li className="mb-1">
                In instances where color accuracy is at issue, Wurth Louis &amp;
                Co. will replace material only.
              </li>
            </ul>
            <h3 className="mb-2 mt-4 font-bold">Shortages and Claims</h3>
            <ul className="list-outside list-disc pl-5">
              <li className="mb-1">
                Material accuracy should be verified prior to application. Usage
                of material constitutes acceptance of product.
              </li>
              <li className="mb-1">
                Any concealed damage, defective material or shortages must be
                reported within 48 hours of receipt .
              </li>
              <li className="mb-1">
                Freight damages or shortages must be reported to the carrier
                upon delivery.
                <ul className="list-outside list-disc pl-5">
                  <li className="mb-1 mt-1">
                    Damages and shortages should be noted on the Bill of Lading
                    or Delivery ticket.
                  </li>
                </ul>
              </li>
              <li className="mb-1">
                All packaging must be saved as it may be required for inspection
                by the carrier.
              </li>
            </ul>
            <h3 className="mb-2 mt-4 font-bold">Return fees</h3>
            <ul className="list-outside list-disc pl-5">
              <li className="mb-1">
                Customer requested returns will be subject to a restocking fee
                <ul className="list-outside list-disc pl-5">
                  <li className="mb-1">
                    10% restocking fee for items purchased within 1-30 days.
                  </li>
                  <li className="mb-1">
                    20% restocking fee for items purchased within 31-60 days.
                  </li>
                  <li className="mb-1">
                    30% restocking fee for items purchased within 61-90 days.
                  </li>
                  <li className="mb-1">
                    Würth Louis &amp; Company will not accept a return for
                    material purchased greater than 90 days.
                  </li>
                </ul>
              </li>
              <li className="mb-1">Return fees will not be charged if: </li>
              <ul className="list-outside list-disc pl-5">
                <li className="mb-1">
                  Product delivered is damaged or defective.
                </li>
                <li className="mb-1">
                  An error is made by a Würth Louis &amp; Company employee(s).
                </li>
              </ul>
            </ul>
            <h3 className="mb-2 mt-4 font-bold">Return Procedure</h3>
            <ul className="list-outside list-disc pl-5">
              <li className="mb-1">
                All product must have a Returns Goods Authorization (RGA) prior
                to arriving at Würth Louis &amp; Company.
              </li>
              <li className="mb-1">
                All product must have the RGA number included in or on the box.
              </li>
              <li className="mb-1">
                UPS ARS labels and shipping instructions can be sent either by
                fax or email.
              </li>
            </ul>
            <h3 className="mb-2 mt-4 font-bold">
              Würth Louis &amp; Company Power Tool Return Policy
            </h3>
            <ul className="list-outside list-disc pl-5">
              <li className="mb-1">
                Power tools may be returned for credit within 30 days of
                purchase subject to the following limitations.
              </li>
              <ul className="list-outside list-disc pl-5">
                <li className="mb-1">
                  Must be in un-opened, new condition and in the original
                  packaging.
                </li>
                <li className="mb-1">
                  Subject to the Manufacturers approval of return, may include a
                  restocking fee.
                </li>
                <li className="mb-1">
                  In no event can power tools be returned after 30 days.
                </li>
                <li className="mb-1">
                  All warranty claims are handled through the manufacturer.
                </li>
              </ul>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQPage;
