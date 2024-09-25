"use client";

import useLogoutMutation from "@/_hooks/user/use-logout-mutation.hook";
import useOSRLogoutMutation from "@/_hooks/user/use-osr-logout-mutation.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { cn } from "@/_lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/old/_components/ui/accordion";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { cva } from "cva";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import PurchasesFilters from "./purchases-filters";

const menuItem = cva({
  base: "block border-b border-brand-gray-200 py-2.5 font-bold text-black first:border-t",
  variants: {
    status: {
      active: "text-brand-primary",
      inactive: "hover:text-brand-primary",
    },
  },
});

const LINKS = [
  {
    href: "/myaccount/manage-users",
    name: "Manage Users",
  },
  {
    href: "/myaccount/orderhistory",
    name: "My Orders",
  },
];

const SideMenu = ({ token }: { readonly token: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const checkLoginQuery = useSuspenseCheckLogin(token);
  const isOsr =
    checkLoginQuery.data?.status_code === "OK" &&
    !!checkLoginQuery.data?.sales_rep_id;

  const osrLogoutMutation = useOSRLogoutMutation();
  const logoutMutation = useLogoutMutation();

  return (
    <div>
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            menuItem({
              status: link.href === pathname ? "active" : "inactive",
            }),
            "btnAction",
          )}
          data-button-action={`Side Menu View ${link.name}`}
        >
          {link.name}
        </Link>
      ))}
      <Accordion
        type="single"
        value={pathname}
        onValueChange={(value) => router.push(value)}
      >
        <AccordionItem
          value="/myaccount/purchaseditems"
          className="first:border-t-0"
        >
          <AccordionTrigger className="font-bold text-black hover:no-underline data-[state=open]:text-brand-primary">
            My Purchased Items
          </AccordionTrigger>

          <AccordionContent className="pb-0">
            <Suspense fallback={<Skeleton className="mb-4 h-32" />}>
              <PurchasesFilters token={token} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Link
        href="/myaccount/shopping-lists"
        className={cn(
          menuItem({ status: "inactive" }),
          "btnAction btn-view-favorites w-full text-left",
        )}
        data-button-action="Side Menu View My Shopping Lists"
      >
        My Shopping Lists
      </Link>

      <Link
        href="/tax-form"
        className={cn(
          menuItem({ status: "inactive" }),
          "btnAction w-full text-left",
        )}
        data-button-action="Side Menu View Sales Tax"
      >
        Sales Tax
      </Link>
      <button
        onClick={() => {
          if (isOsr) {
            osrLogoutMutation.mutate();
          } else {
            logoutMutation.mutate();
          }
        }}
        className={cn(
          menuItem({ status: "inactive" }),
          "btnAction btn-sign-out w-full text-left",
        )}
        data-button-action="Logout"
      >
        Logout
      </button>
    </div>
  );
};

export default SideMenu;
