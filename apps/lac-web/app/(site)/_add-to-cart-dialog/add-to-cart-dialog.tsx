import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { Suspense } from "react";
import ConfirmationDialog from "./confirmation-dialog";
import VerificationDialog from "./verification-dialog";

const AddToCartDialog = () => {
  const cookiesStore = cookies();
  const sessionCookie = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionCookie?.value) {
    return null;
  }

  return (
    <>
      <VerificationDialog token={sessionCookie.value} />

      <ConfirmationDialog token={sessionCookie.value} />
    </>
  );
};

const AddToCartDialogRoot = () => {
  return (
    <Suspense>
      <AddToCartDialog />
    </Suspense>
  );
};

export default AddToCartDialogRoot;
