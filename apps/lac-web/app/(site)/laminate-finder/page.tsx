import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/web-ui/components/ui/breadcrumb";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import ColorPicker from "./color-picker";
import LaminateSearch from "./laminate-search";
import LaminatesList from "./laminates-list";

export const metadata: Metadata = {
  title: "Laminate Finder",
  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(SESSION_TOKEN_COOKIE);

  if (!tokenCookie) {
    return null;
  }

  return (
    <>
      <div className="container mx-auto mt-3">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Laminate Finder</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <h1 className="mb-8 text-4xl font-bold text-wurth-gray-800">
          Laminate Finder
        </h1>

        <Suspense
          fallback={
            <div className="mb-8 h-12 animate-pulse rounded bg-gray-200" />
          }
        >
          <LaminateSearch token={tokenCookie.value} />
        </Suspense>
        <ColorPicker token={tokenCookie.value} />
      </div>
      <LaminatesList />
    </>
  );
};

export default Page;
