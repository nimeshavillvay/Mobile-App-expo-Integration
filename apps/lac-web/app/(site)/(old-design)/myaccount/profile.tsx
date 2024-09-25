"use client";

import useSuspenseBillingAddress from "@/_hooks/address/use-suspense-billing-address.hook";
import useSuspenseUsersList from "@/_hooks/user/use-suspense-users-list.hook";
import Separator from "@/old/_components/separator";
import useAccountSelectorDialog from "@/old/_hooks/account/use-account-selector-dialog.hook";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineModeEdit, MdOutlineSwapHoriz } from "react-icons/md";
import defaultAvatar from "./default-avatar.png";

const Profile = ({ token }: { readonly token: string }) => {
  const usersListQuery = useSuspenseUsersList(token);
  const userProfile = usersListQuery.data?.manageContact?.yourProfile;

  const billingAddressQuery = useSuspenseBillingAddress(token);
  const billingAddress = billingAddressQuery.data;

  // TODO: Need to remove if account selector is not needed
  const setAccountSelectorOpen = useAccountSelectorDialog(
    (state) => state.setOpen,
  );

  return (
    <div className="mb-3 space-y-2">
      <div className="flex flex-row gap-2">
        <div className="relative">
          <Image
            src={defaultAvatar}
            alt="A picture of the default avatar"
            width={117}
            height={117}
          />

          <button
            className="btnAction absolute bottom-0 right-0 bg-brand-secondary p-1 text-white"
            aria-label="Edit profile picture"
          >
            <MdOutlineModeEdit data-button-action="Edit Company Profile Picture" />
          </button>
        </div>

        <div className="min-w-32 space-y-2">
          <div>Company</div>

          <div className="flex flex-row items-center gap-1">
            <span>{billingAddress?.soldTo ?? "N/A"}</span>

            <button
              className="btnAction"
              aria-label="Switch address"
              onClick={() => setAccountSelectorOpen(true)}
            >
              <MdOutlineSwapHoriz
                className="text-lg leading-none"
                data-button-action="Switch address"
              />
            </button>
          </div>

          <Separator
            orientation="horizontal"
            className="h-px w-full bg-black/10"
          />

          <Link
            href="/myaccount/company-profile"
            className="btnAction flex flex-row items-center gap-0.5 font-wurth text-sm font-extrabold uppercase hover:text-brand-primary"
            data-btn-action="View Company Profile"
          >
            <span>Company profile</span>

            <FaArrowRight className="text-xs leading-none" />
          </Link>
        </div>
      </div>

      <div>
        {userProfile.firstName !== "" && `${userProfile.firstName} `}
        {userProfile.lastName !== "" ? userProfile.lastName : "User"}
      </div>

      <div className="capitalize">
        {userProfile.roleDescription !== "" &&
          `${userProfile.roleDescription}/`}
        {userProfile.permission !== "" && userProfile.permission.toLowerCase()}
      </div>
    </div>
  );
};

export default Profile;
