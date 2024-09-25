"use client";

import { usePathname } from "next/navigation";
import { REASONS } from "./constants";

const WhyShopWithUs = () => {
  const currentPage = usePathname();
  const isShowWhyShopWithUs =
    currentPage === "/" ||
    !!["/category", "/product"].find((publicPage) =>
      currentPage.startsWith(publicPage),
    );

  if (!isShowWhyShopWithUs) {
    return null;
  }

  return (
    <section className="container space-y-6 pb-3 md:space-y-12 md:pb-9">
      <h2 className="text-center font-title text-3xl font-medium capitalize tracking-[-0.3px] text-black md:text-5xl md:tracking-[-0.576px]">
        The Würth Louis and Company Difference
      </h2>

      <p className="mt-2 text-center text-base text-wurth-gray-800 md:mt-6 md:text-lg">
        Würth Louis and Company is committed to service, quality, and
        convenience to ensure you have a seamless experience every time. With
        flexible ordering options, a comprehensive selection of products, and
        next-day delivery, we cater to all your woodworking and shop supply
        needs. We appreciate your trust in our expertise and dedication to
        providing you with the best tools and materials, helping you achieve
        outstanding results in your projects.
      </p>

      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
        {REASONS.map(({ title, Icon, description }) => (
          <li
            key={title}
            className="space-y-3 rounded-lg bg-sky-50 p-5 md:space-y-5 md:p-6"
          >
            <div className="flex max-w-full flex-col gap-3 md:flex-row md:items-center md:gap-6">
              <div
                className="w-fit rounded p-3 md:rounded-md"
                style={{
                  // TODO Try to convert to a Tailwind CSS class
                  background:
                    "linear-gradient(306deg, #00ADEF 3.23%, #C3CF23 125.64%)",
                }}
              >
                <Icon className="stroke-white md:size-12" />
              </div>

              <h3 className="text-clip break-words font-title text-2xl uppercase leading-7 tracking-[-0.12px] text-wurth-gray-800 md:text-[1.75rem] md:leading-8 md:tracking-[-0.14px]">
                {title}
              </h3>
            </div>

            <p className="text-sm font-medium text-black md:text-base">
              {description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhyShopWithUs;
