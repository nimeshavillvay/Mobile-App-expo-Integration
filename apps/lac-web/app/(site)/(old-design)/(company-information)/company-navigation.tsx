"use client";

import { cn } from "@/_lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

type CompanyNavigationProps = {
  readonly links: Array<{ label: string; href: string }>;
};

const CompanyNavigation = ({ links }: CompanyNavigationProps) => {
  const pathname = usePathname();

  return (
    <nav className="mb-6 ml-auto mr-auto w-fit max-w-[1920px] pl-4 text-base font-bold uppercase sm:flex sm:w-auto sm:text-lg md:pl-8">
      {links.map((link) => (
        <Fragment key={link.href}>
          <Link
            href={link.href}
            className={cn(
              "btnAction px-4 py-2 font-wurth first:pl-0",
              pathname === link?.href
                ? "text-brand-primary underline"
                : "text-brand-gray-500 hover:text-brand-primary hover:underline",
            )}
            data-button-action={`View ${link.label}`}
          >
            {link.label}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
};

export default CompanyNavigation;
