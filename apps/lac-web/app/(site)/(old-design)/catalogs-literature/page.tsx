import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { MainTitle } from "../_components/main-title";
import pdfCatalogThumb from "./PDF_Catalog_Thumb.jpg";
import catalogCover from "./WLAC_Catalog_Cover.png";

import { FileDownload } from "@repo/web-ui/components/icons/file-download";
import type { ReactNode } from "react";
import { SubTitle } from "../_components/sub-title";
import { nonInteractiveCatalogs } from "./catalog-data";

export const metadata: Metadata = {
  title: "Catalogs & Literature",
};

const apiUrl = process.env.NEXT_PUBLIC_WURTH_LAC_API;

const Catalog = ({
  url,
  imageSrc,
  alt,
}: {
  readonly url: string;
  readonly imageSrc: StaticImageData;
  readonly alt: string;
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="btnAction noopener noreferrer"
      className="border border-gray-300 shadow-md shadow-gray-300 hover:shadow-xl hover:shadow-gray-500"
      data-btn-action="Download Catalog"
    >
      <Image src={imageSrc} alt={alt} placeholder="blur" />
    </a>
  );
};
Catalog.displayName = "Catalog";

const NonInteractiveCatalog = ({
  url,
  title,
  children,
}: {
  readonly url: string;
  readonly title: string;
  readonly children: ReactNode;
}) => {
  return (
    <li className="w-fit list-outside list-disc text-blue-700 hover:text-blue-900 hover:underline">
      <a
        href={url}
        title={title}
        target="_blank"
        className="btnAction"
        data-btn-action="Download NonInteractive Catalog"
      >
        {children}
      </a>
    </li>
  );
};
NonInteractiveCatalog.displayName = "NonInteractiveCatalog";

const CatalogsLiteraturePage = () => {
  return (
    <div className="container mt-8 flex flex-col">
      <MainTitle>Catalogs & Literature</MainTitle>

      <SubTitle>Main Product Catalog</SubTitle>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:grid-rows-1">
        <div className="flex flex-col">
          <p className="mb-4">
            Click the catalog cover below to go to the individual sections of
            the catalog.
          </p>
          <a
            href="/catalog-main"
            className="btnAction w-fit self-center sm:self-auto"
            data-btn-action="Download Catalog Cover"
          >
            <Image src={catalogCover} alt="Catalog Cover" placeholder="blur" />
          </a>
        </div>
        <div>
          <p className="mb-4">Or you can download the full pdf version here.</p>
          <a
            href={`${apiUrl}/assets/pdf/WurthLAC_2022-2023_Full_Catalog.pdf`}
            title="WurthLAC 2022-2023 Full Catalog"
            target="_blank"
            rel="noopener noreferrer"
            className="btnAction flex w-fit flex-col sm:flex-row"
            data-btn-action="Download 2022/2023 Full Catalog"
          >
            <div className="flex w-full justify-center border border-b-0 border-gray-400 sm:w-auto sm:border-0">
              <Image
                src={pdfCatalogThumb}
                alt="Catalog Thumb"
                className="border border-gray-400 sm:self-auto"
              />
            </div>
            <div className="flex flex-col justify-center border border-t-0 border-gray-400 p-6 sm:border-l-0 sm:border-t">
              <h4>
                <span className="block font-wurth text-xl font-normal text-gray-500">
                  Download the pdf version of
                </span>
                <span className="block font-wurth text-3xl font-extrabold text-gray-800">
                  2022/2023 Full Catalog
                </span>
              </h4>
              <div className="mt-4 flex bg-gray-200 p-4 pl-6">
                <FileDownload className="stroke-red-700 stroke-2" />
                <span className="self-center pl-4 font-wurth font-normal text-red-700">
                  Download Catalog
                </span>
              </div>
            </div>
          </a>
          <p className="mt-2">
            Note: File size is large(160mb). Catalog may take an extended time
            to download.
          </p>
        </div>
      </div>

      <SubTitle>Non-Interactive Catalogs (PDF)</SubTitle>

      <ul className="pt4 pl-6 pt-4">
        {nonInteractiveCatalogs.map((catalog) => (
          <NonInteractiveCatalog
            key={catalog.id}
            url={catalog.url}
            title={catalog.title}
          >
            {catalog.text}
          </NonInteractiveCatalog>
        ))}
      </ul>
    </div>
  );
};

export default CatalogsLiteraturePage;
