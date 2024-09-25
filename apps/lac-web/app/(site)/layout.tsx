import { Toaster } from "@repo/web-ui/components/ui/toast";
import { type ReactNode } from "react";
import AddToCartDialog from "./_add-to-cart-dialog";
import Footer from "./_footer";
import Header from "./_header";
import SessionChecker from "./session-checker";

const SiteLayout = ({ children }: { readonly children: ReactNode }) => {
  return (
    <>
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />

      <Toaster />
      <AddToCartDialog />
      <SessionChecker />
    </>
  );
};

export default SiteLayout;
