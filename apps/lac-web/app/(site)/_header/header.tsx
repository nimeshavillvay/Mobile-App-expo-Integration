import WurthLacLogo from "@/_components/wurth-lac-logo";
import { getCategoriesList } from "@/_lib/apis/server";
import { cn } from "@/_lib/utils";
import { Email } from "@repo/web-ui/components/icons/email";
import { Phone } from "@repo/web-ui/components/icons/phone";
import { Text } from "@repo/web-ui/components/icons/text";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import ShippingDetailsDialog from "./_shipping-details-dialog";
import UserProfile, { UserProfileSkeleton } from "./_user-profile";
import WillCallPlant from "./_will-call-plant";
import Cart from "./cart";
import DesktopNavigationMenu from "./desktop-navigation-menu";
import MobileNavigationMenu from "./mobile-navigation-menu";
import OSRDetails from "./osr-details";
import SearchBar from "./search-bar";

const Header = async () => {
  const categories = await getCategoriesList();

  return (
    <header className="flex flex-col gap-4 border-b border-b-wurth-gray-250 pb-5 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05),0px_1px_2px_-1px_rgba(0,0,0,0.05)] md:border-0 md:pb-0 print:hidden">
      <div className="bg-wurth-gray-50">
        <div className="container flex flex-row items-center justify-between pb-3 pt-5 text-sm font-medium md:py-3">
          <div className="flex flex-wrap items-center gap-5">
            <WillCallPlant />
            <ShippingDetailsDialog />

            <Suspense fallback={<Skeleton className="h-5 w-full sm:w-60" />}>
              <OSRDetails />
            </Suspense>
          </div>

          <div className="hidden flex-row items-center gap-6 md:flex">
            <Button
              variant="link"
              className="group h-fit px-0 py-0 font-medium"
              asChild
            >
              <a
                href="tel:+18004224389"
                className="btnAction"
                data-btn-action="Need Help Phone"
              >
                <Text
                  width={16}
                  height={16}
                  className="group-hover:stroke-red-800"
                  data-button-action="Call Link"
                />
                <Phone
                  width={16}
                  height={16}
                  className="group-hover:stroke-red-800"
                  data-button-action="Text Link"
                />

                <span>(800) 422-4389</span>
              </a>
            </Button>
            <Button
              variant="link"
              className="group h-fit px-0 py-0 font-medium"
              asChild
            >
              <a
                href="mailto:southernsales@wurthlac.com"
                className="btnAction"
                data-btn-action="Need Help Email"
              >
                <Email
                  width={16}
                  height={16}
                  className="group-hover:fill-red-800"
                  data-button-action="Need help"
                />

                <span>Need help?</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="container flex w-full min-w-0 flex-row items-center gap-7 pt-1">
        <MobileNavigationMenu categories={categories} />

        <Link
          href="/"
          className="btnAction flex-shrink-0"
          data-button-action="View Home"
        >
          <WurthLacLogo className="h-[24px] w-[114px] md:h-[28px] md:w-[133px]" />

          <span className="sr-only">Home</span>
        </Link>

        <div className="mx-auto hidden max-w-[800px] flex-auto md:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex min-w-0 flex-row items-center gap-4 md:ml-0 md:gap-6">
          {/* Mobile */}
          <Suspense fallback={<UserProfileSkeleton type="mobile" />}>
            <UserProfile type="mobile" />
          </Suspense>

          <Link
            href="/cart"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "btn-view-cart btnAction size-6 md:hidden",
            )}
            data-button-action="View Cart"
          >
            <Suspense fallback={<Skeleton className="h-6 w-6" />}>
              <Cart type="mobile" />
            </Suspense>

            <span className="sr-only">Cart</span>
          </Link>

          {/* Desktop */}
          <Suspense fallback={<UserProfileSkeleton type="desktop" />}>
            <UserProfile type="desktop" />
          </Suspense>

          <Link
            href="/cart"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "btn-view-cart btnAction hidden shrink-0 md:flex md:h-min md:flex-row md:items-center md:gap-2 md:p-0",
            )}
            data-button-action="View Cart"
          >
            <Suspense fallback={<Skeleton className="h-7 w-7" />}>
              <Cart type="desktop" />
            </Suspense>

            <span className="text-base font-semibold">Cart</span>
          </Link>
        </div>
      </div>

      <div className="container w-full md:hidden">
        <SearchBar />
      </div>

      <DesktopNavigationMenu categories={categories} />
    </header>
  );
};

export default Header;
