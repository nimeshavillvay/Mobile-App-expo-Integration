import ProductCardSkeleton from "@/_components/product-card-skeleton";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import {
  ScrollableContainer,
  ScrollableNextButton,
  ScrollablePreviousButton,
  ScrollableRoot,
} from "@repo/web-ui/components/scrollable";
import { cookies } from "next/headers";
import Image from "next/image";
import { Suspense, type CSSProperties } from "react";
import { getFeaturedBrand } from "./apis";
import FeaturedBrandList from "./featured-brand-list";

const FeaturedBrandListRoot = async () => {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get(SESSION_TOKEN_COOKIE);

  const { groups } = await getFeaturedBrand();

  return <FeaturedBrandList token={sessionToken?.value} groups={groups} />;
};

const FeaturedBrand = async () => {
  const { details } = await getFeaturedBrand();

  return (
    <section
      style={
        {
          "--brand-color": details.color,
          // TODO Try to convert to a Tailwind CSS class
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), var(--brand-color)",
        } as CSSProperties
      }
      className="my-14 space-y-6 py-9 md:my-20 md:space-y-9 md:py-16"
    >
      <div className="container">
        <div className="overflow-hidden rounded-lg bg-[var(--brand-color)] shadow-lg xl:flex xl:flex-row-reverse">
          <Image
            src={details.background}
            alt={`The background image of ${details.name}`}
            className="block aspect-2 object-cover xl:flex-1"
            width={1216}
            height={608}
          />

          <div className="p-6 text-white xl:flex-1 xl:p-12">
            <Image
              src={details.logo}
              alt={`The logo of ${details.name}`}
              width={118}
              height={32}
              className="object-contain"
            />

            <h2 className="mb-2 mt-4 font-title text-3xl font-medium tracking-[-0.01406rem] md:mt-14 md:text-5xl md:tracking-[-0.036rem]">
              {details.name}
            </h2>

            {!!details.descr && (
              <p className="text-base md:text-lg">{details.descr}</p>
            )}
          </div>
        </div>
      </div>

      <ScrollableRoot className="container">
        <ScrollablePreviousButton />

        <ScrollableContainer className="snap-x scroll-pl-4 items-stretch gap-4 md:scroll-pl-8 md:gap-6">
          <Suspense
            fallback={Array.from({ length: 7 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          >
            <FeaturedBrandListRoot />
          </Suspense>
        </ScrollableContainer>

        <ScrollableNextButton />
      </ScrollableRoot>
    </section>
  );
};

export default FeaturedBrand;
