"use client";

import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import { sendGTMEvent } from "@next/third-parties/google";
import { TooltipProvider } from "@repo/web-ui/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { usePathname } from "next/navigation";
// eslint-disable-next-line no-restricted-imports
import { useEffect, type ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { Provider as WrapBalancer } from "react-wrap-balancer";
import { getGTMPageType } from "./_lib/gtm-utils";

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
  }
};

type ProvidersProps = {
  readonly children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  const pathname = usePathname();
  const { pushPathname } = usePathnameHistoryState((state) => state.actions);

  useEffect(() => {
    pushPathname(pathname);
  }, [pathname, pushPathname]);

  useEffect(() => {
    sendGTMEvent({
      event: "view_page",
      viewPageData: {
        page_type: getGTMPageType(pathname),
      },
    });
  }, [pathname]);

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>
          <WrapBalancer>
            <TooltipProvider>{children}</TooltipProvider>
          </WrapBalancer>
        </ReactQueryStreamedHydration>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default Providers;
