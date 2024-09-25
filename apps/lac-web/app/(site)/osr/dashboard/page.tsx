import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Separator } from "@repo/web-ui/components/ui/separator";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from "./dashboard";

export const metadata: Metadata = {
  title: "OSR Dashboard",
};

const OSRDashboardPage = async () => {
  const sessionTokenCookie = cookies().get(SESSION_TOKEN_COOKIE);

  if (!sessionTokenCookie?.value) {
    return redirect("/");
  }

  return (
    <div className="container">
      <div className="mb-4 mt-8 hidden items-center gap-2.5 md:flex md:flex-row">
        <h1 className="text-[28px] font-medium leading-8 text-brand-primary">
          My Customers
        </h1>

        <Separator
          orientation="horizontal"
          className="h-px flex-1 bg-brand-primary"
        />
      </div>
      <Dashboard token={sessionTokenCookie?.value} />
    </div>
  );
};

export default OSRDashboardPage;
