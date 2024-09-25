"use client";

import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/web-ui/components/ui/dialog";
import { useRouter } from "next/navigation";
// eslint-disable-next-line no-restricted-imports
import { useEffect, useState } from "react";

type DiscontinuedItemNoticeProps = {
  readonly categoryId: string;
  readonly slug: string;
};

const DiscontinuedItemNotice = ({
  categoryId,
  slug,
}: DiscontinuedItemNoticeProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      router.push(`/`);
    }
  };

  const onCancelHandler = () => {
    setOpen(false);
    router.push(`/`);
  };

  const onAcceptHandler = () => {
    setOpen(false);
    router.push(`/category/${categoryId}/${slug}`);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Discontinued</DialogTitle>
          <DialogDescription>
            We&apos;re sorry, that product has been discontinued. Would you like
            to go to its category to find a substitute?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => onCancelHandler()}
            data-button-action="Product Discontinued Close And Redirect to Home"
          >
            No
          </Button>
          <Button
            variant="default"
            onClick={() => onAcceptHandler()}
            data-button-action="Product Discontinued Close And Redirect to Category"
          >
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscontinuedItemNotice;
