import { getAccountList } from "@/_hooks/user/use-suspense-account-list.hook";
import { cn } from "@/_lib/utils";
import { buttonVariants } from "@repo/web-ui/components/ui/button";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { SECTIONS, SOCIAL_LINKS } from "./constants";
import { Fsc, SAMNotice, VenderFreightRouting, VikingCloud } from "./footer";
import FooterSaleRepDetails from "./footer-sales-rep-details";
import Subscribe from "./subscribe";

const FooterLinksLoggedIn = async ({ token }: { readonly token: string }) => {
  const accountListQuery = await getAccountList(token);
  const salesRep = accountListQuery.sales_rep;

  const saleRepDetailsAvailable =
    (Array.isArray(salesRep) && salesRep.length > 0) || "fullname" in salesRep;

  return (
    <>
      <section
        className={cn(
          saleRepDetailsAvailable ? "md:grid-cols-5" : "md:grid-cols-4",
          "container hidden md:grid md:gap-8",
        )}
      >
        {SECTIONS.map(
          (section) =>
            section.links.length > 0 && (
              <div
                key={section.heading}
                className="space-y-3 text-sm text-black"
              >
                <h3 className="font-bold text-wurth-gray-500">
                  {section.heading}
                </h3>

                <ul>
                  {section.links.map((link) => (
                    <li key={link.label} className="leading-8 hover:underline">
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ),
        )}
        {saleRepDetailsAvailable ? (
          <div className="col-span-2">
            <Suspense fallback={<Skeleton className="h-fit w-full" />}>
              <FooterSaleRepDetails />
            </Suspense>
          </div>
        ) : (
          <div className="space-y-6">
            <SAMNotice />

            <Subscribe />
          </div>
        )}
      </section>

      <section className="container md:hidden">
        <Subscribe />
      </section>

      <div className="container flex flex-col gap-6 md:flex-row-reverse md:items-center md:justify-between">
        <div className="flex flex-col">
          <div className="hidden md:block">
            {saleRepDetailsAvailable && <Subscribe />}
          </div>
          <ul className="float-end flex flex-row items-center justify-center gap-4 md:self-end">
            {SOCIAL_LINKS.map(({ name, Icon, url }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "btnAction group p-0",
                  )}
                  data-btn-action="Footer Social Link"
                >
                  <Icon className="size-4 fill-wurth-gray-800 group-hover:fill-red-800 md:size-6" />

                  <span className="sr-only">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center gap-x-10 gap-y-6">
          <div className="hidden md:block">
            {saleRepDetailsAvailable && <SAMNotice />}
          </div>

          <VikingCloud />

          <Fsc />

          <VenderFreightRouting />
        </div>
      </div>
    </>
  );
};

export default FooterLinksLoggedIn;
