import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import Breadcrumbs from "@/old/_components/breadcrumbs";
import Separator from "@/old/_components/separator";
import Title from "@/old/_components/title";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import SideMenu from "./_side-menu";
import Profile from "./profile";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

type MyAccountLayoutProps = {
  readonly children: ReactNode;
};

const MyAccountLayout = ({ children }: MyAccountLayoutProps) => {
  const sessionTokenCookie = cookies().get(SESSION_TOKEN_COOKIE);

  if (!sessionTokenCookie?.value) {
    return redirect("/");
  }

  return (
    <>
      <Breadcrumbs links={[{ href: "/myaccount", label: "My Account" }]} />

      <div className="md:container">
        <div className="mb-4 mt-8 hidden items-center gap-2.5 md:flex md:flex-row">
          <Title className="text-brand-primary">My Account</Title>

          <Separator
            orientation="horizontal"
            className="h-px flex-1 bg-brand-primary"
          />
        </div>

        <div className="flex flex-col md:flex-row">
          <aside className="mb-6 hidden md:mb-0 md:block md:w-[290px]">
            <Suspense fallback={<Skeleton className="mb-3 h-[158px] w-full" />}>
              <Profile token={sessionTokenCookie?.value} />
            </Suspense>

            <SideMenu token={sessionTokenCookie?.value} />
          </aside>

          <div className="relative w-full px-0 md:pl-12">{children}</div>
        </div>
      </div>
    </>
  );
};

export default MyAccountLayout;
