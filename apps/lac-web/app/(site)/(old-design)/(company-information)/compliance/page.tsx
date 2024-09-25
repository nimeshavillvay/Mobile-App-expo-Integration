import { MainTitle } from "@/old/_components/main-title";
import { SubTitle } from "@/old/_components/sub-title";
import VisuallyHidden from "@/old/_components/visually-hidden";
import type { Metadata } from "next";
import Image from "next/image";
import { IoArrowForwardSharp } from "react-icons/io5";
import compliance from "./compliance.jpg";

export const metadata: Metadata = {
  title: "Compliance",
};

const CompliancePage = () => {
  return (
    <div className="container">
      {/* Section banner */}
      <Image
        src={compliance}
        alt="The banner for compliance page"
        placeholder="blur"
        className="mb-8 h-auto w-full border border-brand-gray-100 object-cover"
        priority={true}
      />

      <MainTitle>Compliance</MainTitle>

      <div className="box-border space-y-4 text-brand-gray-500">
        <p>
          Mutual trust, reliability, honesty and straightforwardness, both
          inwards and outwards, are the fundamental principles deeply ingrained
          in the Würth Group&apos;s corporate culture. Our commitment to these
          values was first laid down in the Corporate Philosophy which was
          written by Reinhold Würth in the 1970s.
        </p>

        <p>
          These principles do not just include adhering to all applicable rules
          and laws, but also the proper mindset of the employees which
          constitutes an integral part of the sustained corporate success of the
          Würth Group.
        </p>

        <p>
          And it is our goal to promote this mindset. At the same time, this
          mindset entails our employees&apos; strict adherence to all applicable
          national and international rules and laws. To make these principles
          more transparent for our employees as well as our customers, suppliers
          and other business partners, we have developed practical rules of
          conduct on the basis of our corporate values, which are summarized in
          the Code of Compliance of the Würth Group.
        </p>

        <div className="space-y-1.5">
          <div>
            <a
              title="Download code of compliance - opens PDF in new window"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.wuerth.com/downloads/pdf/Compliance/EN-Compliance_Buch_2021.pdf"
              className="btnAction flex font-bold uppercase tracking-normal text-black no-underline"
              data-btn-action="Download Code of Compliance"
            >
              Download Code of Compliance
              <IoArrowForwardSharp className="self-center text-lg leading-none" />
            </a>
          </div>

          <div>
            <a
              title="Reporting Hotline SpeakUp - Opens in new window"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.bkms-system.net/wuerth"
              className="btnAction flex font-bold uppercase tracking-normal text-black no-underline"
              data-btn-action="Click Reporting Hotline Speak Up"
            >
              Reporting Hotline Speak Up
              <IoArrowForwardSharp className="self-center text-lg leading-none" />
            </a>
          </div>
        </div>

        <SubTitle>Reporting Hotline Speak Up</SubTitle>

        <p>
          Our Code of Compliance represents our commitment to treat each other
          with integrity, along with our customers, suppliers and other business
          partners. Studies have demonstrated that reports received from third
          parties frequently helped to solve cases of economic crime. For this
          very reason, we have set up a system that allows both Würth Group
          employees and third parties to report criminal acts and other major
          compliance violations. This web-based tool is called the BKMS System
          (Business Keeper Monitoring System).
        </p>

        <p>
          If you would like to report an incident using this system, you can do
          so either anonymously or by name. Nevertheless, because we would like
          to cultivate an environment of open communication, we encourage you to
          give your name when submitting reports. We will handle your personal
          information with strict confidentiality and take into account the
          legitimate interests of all parties involved.
        </p>

        <p>
          Please create a mailbox in the BKMS system via which we can contact
          you. This is important in case we have any follow-up questions or in
          case you would like to add further information to your report later
          on. Communication via the mailbox can also be kept anonymous, if
          desired.
        </p>

        <p>
          The system is solely intended to call attention to suspected cases of
          economic crime or major compliance violations within the Würth Group.
          Any misuse of this system for other purposes can constitute a criminal
          offense.
        </p>

        <p>
          You can submit a report here:&nbsp;
          <a
            title="Submit a report through Wuerth - Opens in new window"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.bkms-system.net/wuerth"
            className="btnAction text-[#007bff] hover:underline"
            data-btn-action="Click Submit Report"
          >
            https://www.bkms-system.net/wuerth
            <VisuallyHidden>(opens in a new window)</VisuallyHidden>
          </a>
        </p>

        <p>Thank you very much for your support!</p>
      </div>
    </div>
  );
};

export default CompliancePage;
