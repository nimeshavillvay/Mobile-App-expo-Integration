"use server";

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export const revalidateSiteLayout = async (redirectPathname?: string) => {
  revalidatePath("/", "layout");

  if (redirectPathname) {
    redirect(redirectPathname, RedirectType.replace);
  }
};
