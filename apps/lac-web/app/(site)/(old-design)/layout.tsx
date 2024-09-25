import { cn } from "@/_lib/utils";
import localFont from "next/font/local";
import { type ReactNode } from "react";

const wurth = localFont({
  src: [
    {
      path: "./wuerth-bold.woff2",
      weight: "700",
    },
    {
      path: "./wuerth-extrabold-cond.woff2",
      weight: "800",
    },
  ],
  variable: "--wurth-font",
  display: "swap",
});

const arialFont = localFont({
  src: [
    {
      path: "./arial-webfont.woff",
      weight: "400",
    },
    {
      path: "./arial-webfont.woff2",
      weight: "400",
    },
  ],
  variable: "--arial-font",
  display: "swap",
});

const OldDesignRootLayout = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "font-arial text-[15px] leading-5",
        wurth.variable,
        arialFont.variable,
      )}
    >
      {children}
    </div>
  );
};

export default OldDesignRootLayout;
