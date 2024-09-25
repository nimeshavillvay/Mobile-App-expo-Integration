"use client";

import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/web-ui/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { type Dispatch, type SetStateAction } from "react";
import useLoginAsCustomerMutation from "./use-login-as-customer-mutation.hook";

export const INIT_PER_PAGE = "10";

type FiltersForMobileProps = {
  readonly open: boolean;
  readonly setOpen: Dispatch<SetStateAction<boolean>>;
  readonly userId: string;
  readonly customerEmail: string;
};

const SignAsCustomerDialog = ({
  open,
  setOpen,
  userId,
  customerEmail,
}: FiltersForMobileProps) => {
  const loginAsCustomerMutation = useLoginAsCustomerMutation();
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent style={{ maxWidth: 425 }}>
        <DialogHeader>
          <DialogTitle>Sign as Customer</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Please confirm if you want to log in as a customer {customerEmail}
        </DialogDescription>

        <DialogFooter className="flex">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loginAsCustomerMutation.isPending}
            data-button-action="OSR Close Sign in As Customer Dialog"
          >
            NO
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              loginAsCustomerMutation.mutate(
                { userId: userId },
                {
                  onSuccess: () => {
                    router.push("/");
                  },
                },
              )
            }
            data-button-action="OSR Sign in As Customer Confirm"
          >
            {loginAsCustomerMutation.isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "YES"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignAsCustomerDialog;
