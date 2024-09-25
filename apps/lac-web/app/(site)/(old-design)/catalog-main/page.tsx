import type { Metadata } from "next";
import { MainTitle } from "../_components/main-title";
import { SubTitle } from "../_components/sub-title";
import { catalogSectionData } from "./catalog-section-data";

export const metadata: Metadata = {
  title: "Catalog Main",
};

const CatalogSection = ({
  title,
  rev,
  pdf,
  children,
}: {
  readonly title: string;
  readonly rev: string;
  readonly pdf: string;
  readonly children: React.ReactNode;
}) => {
  return (
    <div className="flex gap-4">
      <div className="w-20 cursor-default self-center bg-red-600 px-8 py-5 text-center font-wurth text-3xl font-bold uppercase text-white sm:w-28 sm:text-6xl">
        {children}
      </div>
      <div className="flex flex-col justify-between">
        <h4 className="text-red-700">{title}</h4>
        <span>{rev}</span>
        <div className="grid w-fit grid-cols-2 gap-2">
          <a
            href={pdf}
            rel="noopener noreferrer"
            target="_blank"
            className="btnAction rounded border bg-blue-300 p-2 text-center font-wurth text-sm uppercase hover:bg-blue-400 sm:text-base"
            data-btn-action="Download Catalog PDF"
          >
            pdf
          </a>
        </div>
      </div>
    </div>
  );
};

const CatalogMainPage = () => {
  return (
    <section className="container mt-8">
      <MainTitle>Wurth Louis and Company Catalog</MainTitle>
      <p>
        <em>Order directly from the catalog!</em>
      </p>
      <p>
        Open any of the catalog sections below to see either an interactive
        version or a print version of the catalog.
      </p>
      <p>
        Click any <span className="bg-yellow-200">yellow highlighted</span> item
        number in the Online version to see the website page and add the item to
        your cart. (Item numbers that are not highlighted in yellow may not be
        available on the Web or may no longer be available.)
      </p>

      <SubTitle>Catalog Sections</SubTitle>

      <div className="mt-4 flex flex-col gap-4">
        {catalogSectionData.map((catalog) => (
          <CatalogSection
            key={catalog.letter}
            title={catalog.title}
            rev={catalog.rev}
            pdf={catalog.pdf}
          >
            {catalog.letter}
          </CatalogSection>
        ))}
      </div>
    </section>
  );
};

export default CatalogMainPage;
