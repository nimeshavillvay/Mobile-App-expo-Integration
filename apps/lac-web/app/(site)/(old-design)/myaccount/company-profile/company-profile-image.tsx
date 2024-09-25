"use client";

import { Button } from "@/old/_components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import defaultAvatar from "../default-avatar.png";
import ImageUploadDialog from "./image-upload-dialog";
import useSuspenseCompanyProfileDetails from "./use-suspense-company-profile-details.hook";

const CompanyProfileImage = ({ token }: { readonly token: string }) => {
  const [openImageUploadDialog, setOpenImageUploadDialog] = useState(false);

  const companyDetailsQuery = useSuspenseCompanyProfileDetails(token);
  const companyDetails = companyDetailsQuery?.data;

  const imageSrc = companyDetails?.image ? companyDetails.image : defaultAvatar;

  return (
    <>
      <div className="mb-5 flex flex-row gap-10">
        <div className="relative">
          <Image
            src={imageSrc}
            alt="company profile image"
            width={117}
            height={117}
          />

          <Button
            className="absolute bottom-0 right-0 bg-brand-secondary p-1 text-white"
            aria-label="Edit profile picture"
            onClick={() => setOpenImageUploadDialog(true)}
          >
            <span className="sr-only">Upload Image</span>
            <MdOutlineModeEdit />
          </Button>
        </div>

        <h3 className="font-title text-xl font-bold text-gray-500">
          {companyDetails?.companyName}
        </h3>
      </div>

      <ImageUploadDialog
        openDialog={openImageUploadDialog}
        setOpenImageUploadDialog={setOpenImageUploadDialog}
      />
    </>
  );
};

export default CompanyProfileImage;
