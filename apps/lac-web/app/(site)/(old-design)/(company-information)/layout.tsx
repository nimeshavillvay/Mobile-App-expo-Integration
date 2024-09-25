import { type ReactNode } from "react";
import CompanyNavigation from "./company-navigation";

const NAV_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Careers", href: "/careers" },
  { label: "Compliance", href: "/compliance" },
];

type CompanyInformationLayoutProps = {
  readonly children: ReactNode;
};

const CompanyInformationLayout = ({
  children,
}: CompanyInformationLayoutProps) => {
  return (
    <section className="py-8">
      {/* Navigation bar for company information pages */}
      <CompanyNavigation links={NAV_LINKS} />

      {children}
    </section>
  );
};

export default CompanyInformationLayout;
