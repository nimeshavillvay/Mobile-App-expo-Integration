import type { Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const OsrLayout = ({ children }: { readonly children: ReactNode }) => {
  return children;
};

export default OsrLayout;
