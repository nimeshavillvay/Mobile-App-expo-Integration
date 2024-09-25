import VisuallyHidden from "@/old/_components/visually-hidden";
import type { Metadata } from "next";
import { MainTitle } from "../_components/main-title";

export const metadata: Metadata = {
  title: "Terms of Sale",
};

const TermsOfSalePage = () => {
  return (
    <section className="container py-8">
      {/* Section heading with line */}
      <MainTitle>Terms of Sale</MainTitle>

      {/* Terms of sale content */}
      <div className="box-border space-y-4 text-brand-gray-500">
        <p>
          <em>
            If you are vision-impaired or have some other impairment covered by
            the Americans with Disabilities Act or a similar law, and you wish
            to discuss potential accommodations related to using this website,
            please contact Wurth Louis and Company Customer Service at&nbsp;
            <a
              title="Click to dial Customer Service - Opens in Phone Dialer"
              href="tel:8004224389"
              className="btnAction text-[#007bff] hover:underline"
              data-btn-action="Click to Dial Customer Service"
            >
              (800) 422-4389
            </a>
            &nbsp;, and/or email&nbsp;
            <strong>CService@wurthlac.com</strong>.
          </em>
        </p>

        <p>
          These Terms of Sale (&ldquo;Terms of Sale&rdquo;), bind Louis and
          Company and its affiliates (&ldquo;Seller&rdquo;) and its customer
          (&ldquo;Buyer&rdquo;) regarding the purchase by Buyer of products (the
          &ldquo;Goods&rdquo;) from or through Seller and, except as set forth
          in a written agreement signed by both parties, supersede all prior
          agreements, proposals and discussions among the parties with respect
          to the purchase and sale of such Goods (including as set forth in any
          Seller catalogs or on-line materials). Any additional, inconsistent or
          different terms or conditions contained in Buyer&rsquo;s purchase
          order or other documents submitted to Seller by or on behalf of Buyer
          at any time, whether before or after the date hereof, are hereby
          expressly rejected and shall be deemed a material alteration (and not
          a rejection) of these Terms of Sale. These Terms of Sale shall be
          deemed accepted by Buyer without any such additional, inconsistent or
          different terms and conditions, except to the extent expressly
          accepted by Seller in a writing signed by Seller.
        </p>

        <p>
          1.&nbsp;<strong>SHIPMENT; TITLE; RISK OF LOSS.</strong>&nbsp;All
          shipping dates are approximate only and not guaranteed. Unless
          otherwise stated, title and risk of loss shall pass from Seller to
          Buyer once the Goods are loaded on the first carrier at Seller&rsquo;s
          facility. All claims for loss or damage in transit must be filed
          against the carrier by Buyer. Buyer shall pay freight, unless prepaid,
          and shall unload shipments promptly. Any increase in freight rates for
          shipments whether prepaid or not and all demurrage shall be borne by
          Buyer. Buyer may contact the local sales office for the current
          shipping fees and freight rates.
        </p>

        <p>
          2.&nbsp;<strong>PRICES.</strong>&nbsp;Unless otherwise expressly
          specified in writing by Seller, all prices are exclusive of taxes,
          customs, duties, transportation and insurance, and any and all current
          or future tax or governmental charge applicable to the sale, delivery,
          shipment or storage of the Goods that Seller is required to pay or
          collect shall be for Buyer&rsquo;s account and shall be added to the
          price and shall not be subject to any reduction.
        </p>

        <p>
          3.&nbsp;<strong>EXCUSE OF PERFORMANCE.</strong>&nbsp; The parties will
          be excused from their respective obligations hereunder (except for
          Buyer&rsquo;s payment obligations) if performance is prevented or
          delayed due to acts of God, war, terrorism, riot, fire, labor trouble
          (including strikes, lockouts and labor shortages), failure of computer
          systems to operate properly, destruction or loss of electronic records
          or data, plant shutdowns, unavailability of materials or components,
          unavailability of or delays in transportation, insufficient production
          capacity, unavailability or shortage of fuel products, explosion,
          accident, compliance with governmental requests, laws, regulations,
          orders or actions, or other unforeseen circumstances or causes beyond
          such party&rsquo;s reasonable control. If such event affects Seller,
          Seller may, without liability, allocate and distribute the Goods among
          such customers in such proportions as Seller, in its sole discretion,
          determines.
        </p>

        <p>
          4.&nbsp;<strong>LIMITED WARRANTY.</strong>&nbsp;THE GOODS ARE SOLD
          &ldquo;AS IS, WITH ALL FAULTS&rdquo;, WITHOUT RECOURSE, AND SELLER
          DOES NOT MAKE, AND HEREBY EXPRESSLY DISCLAIMS, ANY AND ALL
          REPRESENTATIONS AND WARRANTIES OF ANY KIND WHATSOEVER, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF OR AS TO
          MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. BUYER&rsquo;S
          SOLE REMEDIES SHALL BE AS SET FORTH IN THE PARAGRAPH TITLED
          &ldquo;LIMITATION OF REMEDY AND LIABILITY&rdquo; BELOW.
        </p>

        <p>
          5.&nbsp;<strong>LIMITATION OF REMEDY AND LIABILITY.</strong>&nbsp;
          BUYER WAIVES ALL CLAIMS AGAINST SELLER RELATING TO GOODS PURCHASED
          FROM OR THROUGH SELLER, AND AGREES TO ASSERT ALL CLAIMS FOR BREACH OF
          WARRANTY, CONTRACT, OR TORT AGAINST THE MANUFACTURER OF THE GOODS. THE
          PARTIES AGREE THAT BUYER&rsquo;S SOLE AND EXCLUSIVE REMEDY SHALL BE
          FOR THE REPAIR OR REPLACEMENT OF DEFECTIVE GOODS BY THE MANUFACTURER
          IN ACCORDANCE WITH THE MANUFACTURER&rsquo;S CUSTOMARY WARRANTY THEN IN
          EFFECT. IN NO EVENT, REGARDLESS OF THE FORM OF THE CLAIM OR CAUSE OF
          ACTION (WHETHER BASED IN CONTRACT, INFRINGEMENT, NEGLIGENCE, STRICT
          LIABILITY, OTHER TORT OR OTHERWISE), SHALL SELLER&rsquo;S CUMULATIVE
          LIABILITY TO BUYER EXCEED THE PURCHASE PRICE FOR THE SPECIFIC GOODS
          GIVING RISE TO THE CLAIM OR CAUSE OF ACTION. SELLER SHALL NOT BE
          LIABLE FOR DAMAGES CAUSED BY DELAY IN PERFORMANCE. BUYER AGREES THAT
          IN NO EVENT SHALL SELLER&rsquo;S LIABILITY TO BUYER EXTEND TO INCLUDE
          SPECIAL, INDIRECT, INCIDENTAL, RELIANCE, EXEMPLARY, CONSEQUENTIAL,
          PUNITIVE OR SIMILAR DAMAGES. THE TERM &ldquo;CONSEQUENTIAL
          DAMAGES&rdquo; SHALL INCLUDE, BUT SHALL NOT BE LIMITED TO, COST FOR
          LABOR, LOSS OF ANTICIPATED PROFITS, LOSS OF USE, LOSS OF REVENUE, AND
          COST OF CAPITAL. ALL ILLUSTRATIONS, DESCRIPTIONS, SPECIFICATIONS AND
          ENGINEERING INFORMATION HAVE BEEN OBTAINED FROM THE PRODUCT
          MANUFACTURERS FOR BUYER&rsquo;S CONVENIENCE ONLY. SELLER DOES NOT
          ASSUME RESPONSIBILITY FOR ACCURACY OF THE INFORMATION PROVIDED BY THE
          MANUFACTURER.
        </p>

        <p>
          6.&nbsp;<strong>REJECTION OF NON-CONFORMING GOODS;</strong>
          &nbsp;RETURNS. Rejection of non-conforming Goods must be made by Buyer
          in writing within 10 days of receipt and all defects ascertainable at
          time of giving notice shall be stated with particularity or deemed
          waived. In the event of any rejection, the respective Goods shall be
          held intact, and Buyer shall specify to Seller the reason for the
          rejection, accompanied by tally of non-conforming Goods. If full
          credit is allowed for non-conforming Goods, the Goods must be retained
          intact at the delivery point, and Seller shall have 60 days from the
          date of such allowance to dispose of such Goods. A claim that Goods
          are non-conforming shall not entitle Buyer to deduct any sum from any
          invoice unless such claim has been allowed in writing. No returns of
          Goods shipped, whether claimed to be non-conforming or otherwise, are
          permitted without Seller&rsquo;s prior written authorization or unless
          Buyer has first obtained from Seller a return authorization number. In
          no event may products be returned after sixty (60) days from the date
          of the Order Confirmation/Invoice. Any returns must be in original
          unbroken containers and must identify the invoice number. All returns
          are subject to inspection by Seller and a handling charge as from time
          to time published on Seller&rsquo;s website at (
          <a
            href="/terms-of-sale"
            rel="noopener noreferrer"
            className="btnAction text-[#007bff] hover:underline"
            data-btn-action="View Terms of Sale"
          >
            www.wurthlac.com/terms-of-sale
            <VisuallyHidden>(opens in a new window)</VisuallyHidden>
          </a>
          ).
        </p>

        <p>
          7.&nbsp;<strong>PAYMENT TERMS; CREDIT REQUIREMENTS.</strong>&nbsp;
          Except as otherwise specified in writing by Seller, terms of payment
          are net 30 days in U.S. currency. Buyer shall subject to a finance
          charge of 1.5% per month on any past due amounts. In addition, Buyer
          shall be liable for all collection expenses incurred by Seller,
          including attorneys&rsquo; fees. Seller shall have the right to
          set-off any amounts owing from Buyer against any amounts payable to
          Buyer. In the event that Seller determines, at any time in its sole
          discretion, that the credit of Buyer or of any person or entity
          providing credit support for Buyer&rsquo; obligations to Seller is or
          becomes impaired, or there is any reason to doubt the enforceability
          or sufficiency of any agreement, instrument or document supporting
          Buyer&rsquo;s obligations to Seller, Seller may, in addition to other
          rights provided by applicable law, declare immediately due and payable
          any and all amounts owed by Buyer to Seller, and to suspend and/or
          cancel further shipments, revoke any credit extended to Buyer, require
          cash payment, and/or require additional security satisfactory to
          Seller.
        </p>

        <p>
          8.&nbsp;<strong>INDEMNIFICATION.</strong>&nbsp;If Buyer uses Goods
          purchased from or through Seller in an application or end-product,
          Buyer has the obligation to determine the suitability of the Goods
          purchased for Buyer&rsquo;s application by testing or other means, and
          to determine that the application or end-product meets all applicable
          industry standards for safety and durability. If Buyer uses Goods
          purchased from or through Seller in an application or end-product, and
          their use results in damage or harm to the person or property of Buyer
          or others, Buyer agrees to indemnify and hold Seller harmless for all
          liability whether arising out of contract, tort, or other grounds.
          Buyer further agrees to indemnify and hold Seller harmless from all
          costs and expenses (including attorneys&rsquo; fees) incurred by
          Seller in enforcing any of the provisions of these Terms of Sale or in
          defending itself. If Buyer initiates a legal action against Seller,
          and Buyer does not prevail, Buyer will indemnify Seller for all costs
          and expenses (including attorneys&rsquo; fees) incurred by Seller to
          defend itself.
        </p>

        <p>
          9.&nbsp;
          <strong>GOVERNING LAW; CONSENT TO JURISDICTION AND VENUE.</strong>
          &nbsp;These Terms of Sale and the business relationship between Buyer
          and Seller shall be governed by the laws of the State of California,
          without giving effect to its conflict of laws provisions. The courts
          of Orange County, California shall have exclusive jurisdiction with
          respect to all disputes between Seller and Buyer in any way relating
          to the Goods, these Terms of Sale or the business relationship between
          Buyer and Seller; provided, however, that Seller, in its discretion,
          may elect instead to pursue any legal action against Buyer in any
          other court having jurisdiction over the subject matter.{" "}
          <em className="not-italic">
            BUYER HEREBY CONSENTS TO JURISDICTION, PERSONAL AND OTHERWISE, OF
            SUCH COURTS, AND HEREBY WAIVES ANY OBJECTIONS OF ANY NATURE TO VENUE
            IN SUCH COURTS
          </em>
          .
        </p>

        <p>
          10.&nbsp;<strong>COMMUNICATION:</strong>&nbsp;Applicant acknowledges
          and expressly consents to Seller&rsquo;s use of an automatic telephone
          dialing system (&ldquo;ATDS&rdquo;) to initiate calls, faxes or text
          messages to applicant for any business purpose, including without
          limitation, confirming or updating information in this application,
          collections of accounts receivable, marketing of Seller&rsquo;s
          products, status of product delivery and delivery address
          confirmation. Applicant&rsquo;s agreement to this provision is not a
          condition of purchasing any of Seller&rsquo;s goods or services.
        </p>

        <p>
          11.&nbsp;<strong>MISCELLANEOUS.</strong>&nbsp;Seller reserves the
          right to unilaterally modify or amend any portion of these Terms of
          Sale at any time without prior notice. The current version of these
          Terms of Sale and any modifications or amendment supersede all prior
          versions of these Terms of Sale. The most current version of these
          Terms of Sale may be found on Seller&rsquo;s website at (
          <a
            href="/terms-of-sale"
            rel="noopener noreferrer"
            className="btnAction text-[#007bff] hover:underline"
            data-btn-action="View Terms of Sale"
          >
            www.wurthlac.com/terms-of-sale
            <VisuallyHidden>(opens in a new window)</VisuallyHidden>
          </a>
          ).
        </p>

        <p>Revised November 2019</p>
      </div>
    </section>
  );
};

export default TermsOfSalePage;
