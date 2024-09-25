"use client";

import ShippingDetailsDialog from "@/_components/shipping-details-dialog";
import useLogoutMutation from "@/_hooks/user/use-logout-mutation.hook";
import useOSRLogoutMutation from "@/_hooks/user/use-osr-logout-mutation.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import useSuspenseUsersList from "@/_hooks/user/use-suspense-users-list.hook";
import type { Country, ShippingMethod } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { BookmarkOutline } from "@repo/web-ui/components/icons/bookmark-outline";
import { Building } from "@repo/web-ui/components/icons/building";
import { Exit } from "@repo/web-ui/components/icons/exit";
import { MapPin } from "@repo/web-ui/components/icons/map-pin";
import { Switch } from "@repo/web-ui/components/icons/switch";
import { UserGroup } from "@repo/web-ui/components/icons/user-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/web-ui/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import ButtonContent, { buttonClasses } from "./button-content";
import type { ViewportTypes } from "./types";
import UserMobileNavigation from "./user-mobile-navigation";

const UserProfileButton = ({
  token,
  type,
  shippingMethods,
  countries,
}: {
  readonly token: string;
  readonly type: ViewportTypes;
  readonly shippingMethods: ShippingMethod[];
  readonly countries: Country[];
}) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  const loginCheckData = checkLoginQuery.data;
  let isOSRUser = false;
  let customerDetails = "";

  if (loginCheckData && "sales_rep_id" in loginCheckData) {
    isOSRUser = true;
    customerDetails = loginCheckData.user.billto;
  }

  if (type === "mobile") {
    if (loginCheckData?.change_password) {
      return null;
    }

    return (
      <UserMobileNavigation
        token={token}
        shippingMethods={shippingMethods}
        countries={countries}
      />
    );
  } else {
    // Desktop
    return checkLoginQuery.data?.status_code === "NOT_LOGGED_IN" ? (
      <Link
        href="/sign-in"
        className={cn(
          buttonClasses({
            variant: "ghost",
            size: "default",
            type: "desktop",
          }),
          "btnAction",
        )}
        data-button-action="Sign in / Register"
      >
        <ButtonContent />
      </Link>
    ) : (
      <UserProfileDropdown
        token={token}
        isOSRUser={isOSRUser}
        isOSRLoggedInAsCustomer={
          loginCheckData?.status_code == "OK" &&
          loginCheckData?.isLoggedInAsCustomer
        }
        customerDetails={customerDetails}
        shippingMethods={shippingMethods}
        countries={countries}
      />
    );
  }
};

export default UserProfileButton;

const UserProfileDropdown = ({
  token,
  isOSRUser,
  isOSRLoggedInAsCustomer,
  customerDetails,
  shippingMethods,
  countries,
}: {
  readonly token: string;
  readonly isOSRUser: boolean;
  readonly isOSRLoggedInAsCustomer: boolean;
  readonly customerDetails: string;
  readonly shippingMethods: ShippingMethod[];
  readonly countries: Country[];
}) => {
  const router = useRouter();
  const usersListQuery = useSuspenseUsersList(token);
  const userProfile = usersListQuery.data.manageContact.yourProfile;

  const logoutMutation = useLogoutMutation();
  const osrLogoutMutation = useOSRLogoutMutation();
  const checkLoginQuery = useSuspenseCheckLogin(token);

  const [openShippingDialog, setOpenShippingDialog] = useState(false);
  const displayName = userProfile.firstName
    ? userProfile.firstName.concat(" ").concat(userProfile.lastName)
    : userProfile.lastName
      ? userProfile.lastName
      : "User";

  if (checkLoginQuery.data?.change_password) {
    return (
      <span className="sr-only min-w-0 shrink md:not-sr-only md:min-w-0 md:shrink md:truncate md:text-base md:font-semibold">
        Hi, {userProfile.firstName !== "" ? userProfile.firstName : "User"}
      </span>
    );
  }

  return (
    <>
      {/* The ShippingDetailsDialog is put outside the DropdownMenu otherwise it would */}
      {/* be unmounted when the DropdownMenu is closed */}
      <ShippingDetailsDialog
        token={token}
        shippingMethods={shippingMethods}
        open={openShippingDialog}
        setOpen={setOpenShippingDialog}
        countries={countries}
      >
        {/* This is to disable the fallback button in the ShippingDetailsDialog component */}
        {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
        <Fragment />
      </ShippingDetailsDialog>

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonClasses({
              variant: "ghost",
              size: "default",
              type: "desktop",
            }),
            "min-w-0 shrink",
          )}
        >
          <ButtonContent>
            Hi, {userProfile.firstName !== "" ? userProfile.firstName : "User"}
          </ButtonContent>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 p-0">
          <DropdownMenuItem className="mb-1 block bg-wurth-gray-50 p-3">
            <div className="font-medium">{displayName}</div>

            {isOSRLoggedInAsCustomer && (
              <div>Logged in as {customerDetails}</div>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex w-full flex-row items-center gap-2 text-black"
            asChild
          >
            <button
              onClick={() => setOpenShippingDialog(true)}
              className="btnAction"
            >
              <MapPin
                className="ml-0 size-4"
                data-button-action="Open Shipping Details Dialog"
              />

              <span data-button-action="Open Shipping Details Dialog">
                Shipping Details
              </span>
            </button>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {isOSRUser && !isOSRLoggedInAsCustomer && (
            <DropdownMenuItem
              asChild
              className="flex flex-row items-center gap-2 text-black"
            >
              <Link
                href="/osr/dashboard"
                data-button-action="View My Customers"
                className="btnAction"
              >
                <DropdownMenuShortcut className="ml-0 size-4" />

                <span>My Customers</span>
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            asChild
            className="flex flex-row items-center gap-2 text-black"
          >
            <Link
              href="/myaccount/orderhistory"
              data-button-action="View My Orders"
              className="btnAction"
            >
              <DropdownMenuShortcut className="ml-0 size-4" />

              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="flex flex-row items-center gap-2 text-black"
          >
            <Link
              href="/myaccount/purchaseditems"
              data-button-action="View My Purchased Items"
              className="btnAction"
            >
              <DropdownMenuShortcut className="ml-0 size-4" />

              <span>My Purchased Items</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="flex flex-row items-center gap-2 text-black"
          >
            <Link
              href="/myaccount/shopping-lists"
              className="btn-view-favorites btnAction"
              data-button-action="View My Shopping Lists"
            >
              <DropdownMenuShortcut className="ml-0">
                <BookmarkOutline className="size-4 stroke-black stroke-2" />
              </DropdownMenuShortcut>

              <span>My Shopping Lists</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="pl-8">Settings</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            asChild
            className="flex flex-row items-center gap-2 text-black"
          >
            <Link
              href="/myaccount/company-profile"
              data-button-action="View Company Profile"
              className="btnAction"
            >
              <DropdownMenuShortcut className="ml-0">
                <Building className="size-4 stroke-black stroke-2" />
              </DropdownMenuShortcut>

              <span>Company Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="flex flex-row items-center gap-2 text-black"
          >
            <Link
              href="/myaccount/manage-users"
              data-button-action="View Manage Users"
              className="btnAction"
            >
              <DropdownMenuShortcut className="ml-0">
                <UserGroup className="size-4 stroke-black stroke-2" />
              </DropdownMenuShortcut>

              <span>Manage Users</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {isOSRLoggedInAsCustomer && (
            <DropdownMenuItem
              className="flex gap-2"
              onClick={() =>
                logoutMutation.mutate(undefined, {
                  onSuccess: () => {
                    router.replace("/osr/dashboard");
                  },
                })
              }
            >
              <DropdownMenuShortcut className="ml-0">
                <Switch width={16} className="stroke-2" />
              </DropdownMenuShortcut>
              Switch back
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className="btn-sign-out flex flex-row items-center gap-2 text-wurth-red-650"
            onClick={() => {
              if (isOSRUser) {
                osrLogoutMutation.mutate();
              } else {
                logoutMutation.mutate();
              }
            }}
          >
            <DropdownMenuShortcut className="ml-0">
              <Exit className="size-4 stroke-wurth-red-650 stroke-2" />
            </DropdownMenuShortcut>

            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
