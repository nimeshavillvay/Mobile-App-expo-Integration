import type { Metadata } from "next";
import Image from "next/image";
import { MainTitle } from "../_components/main-title";
import samWLACImage from "./SAM-WLAC.png";

export const metadata: Metadata = {
  title: "Government",
};

const GovernmentPage = () => {
  return (
    <section className="container mt-8 text-gray-600 [&>p]:mb-4">
      <MainTitle>
        Wurth Louis and Company is a SAM Approved U.S. Government Vendor
      </MainTitle>
      <Image
        src={samWLACImage}
        alt="SAM Approved U.S. Government Vendor"
        placeholder="blur"
        className="my-4"
      />

      <p>
        Wurth Louis and Company is very proud to be a SAM (System for Award
        Management) approved U.S. Government Vendor. SAM is the official
        government system that combines all Central Contractor Registry (CCR),
        Federal Agency Registration (FedReg), Excluded Parties List System
        (EPLS), and Online Representations and Certification Application
        (ORCA)federal procurement capabilities into one system.
      </p>

      <p>
        Approved vendors are assigned a CAGE (
        <a
          href="https://en.wikipedia.org/wiki/Commercial_and_Government_Entity_code"
          rel="noreferrer noopener"
          target="_blank"
          className="btnAction text-blue-600 hover:text-blue-900 hover:underline"
          data-btn-action="Click Commercial and Government Entity"
        >
          Commercial and Government Entity
        </a>
        ) code for identification in business transactions. The CAGE Code is a
        an identifier for contractors doing business with the Federal
        Government, NATO member nations, and other foreign governments.
      </p>

      <p>Wurth Louis and Company&apos;s CAGE Code: 0P072</p>

      <h2 className="mb-4 mt-6 text-xl font-bold">Why SAM Exists?</h2>

      <p>
        The SAM system was put in place to make government purchases more
        streamlined and integrated. As a SAM Approved U.S. Government Vendor,
        Wurth Louis and Company is committed to fulfilling your product orders
        quickly and efficiently. The SAM system reduces overhead costs and
        eliminates a great deal of data redundancy, which allows purchases to be
        made quicker.
      </p>

      <p>
        <a
          href="https://www.sam.gov/"
          rel="noopener noreferrer"
          target="_blank"
          className="btnAction text-blue-600 hover:text-blue-900 hover:underline"
          data-btn-action="Click SAM system Link"
        >
          Click for more information about SAM.gov.
        </a>
      </p>

      <p>
        If you have any questions about the SAM system or would like to discuss
        a government purchase in more detail, please feel free to contact us by
        phone at:{" "}
        <a
          href="tel:8004224389"
          className="btnAction text-blue-600 hover:text-blue-900 hover:underline"
          data-btn-action="Click SAM system Phone"
        >
          800-422-4389
        </a>
        .
      </p>

      <p>
        Our Customer Service representatives are available weekdays from 8am to
        5pm PT time and are capable of providing you with answers and the
        service you need to complete your SAM-approved government purchases.
      </p>
    </section>
  );
};

export default GovernmentPage;
