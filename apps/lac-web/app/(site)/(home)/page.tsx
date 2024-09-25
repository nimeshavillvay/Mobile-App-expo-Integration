import { getBanners } from "@/_lib/apis/server";
import { ArrowRight } from "@repo/web-ui/components/icons/arrow-right";
import { Download } from "@repo/web-ui/components/icons/download";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { type CSSProperties, type ComponentProps } from "react";
import Balancer from "react-wrap-balancer";
import FeaturedBrand from "./_featured-brand";
import FlashSale from "./_flash-sale";
import FeaturedCategories from "./featured-categories";
import HeroBanners from "./hero-banners";
import kessebohmer from "./kessebohmer.jpg";
import makita from "./makita.jpg";
import paintline from "./paintline.jpg";
import subBanner1 from "./sub-banner-1.jpg";
import subBanner2 from "./sub-banner-2.jpg";
import subBanner3 from "./sub-banner-3.jpg";

type Colors = {
  text: string;
  background: string;
  accent: string;
};

const apiUrl = process.env.NEXT_PUBLIC_WURTH_LAC_API;

const images = [subBanner1, subBanner2, subBanner3];

const ADS: {
  id: number;
  colors: Colors;
  image: StaticImageData;
  shopNowLink: string;
  promoLink: string;
  promoName: string;
}[] = [
  {
    id: 1,
    colors: {
      text: "#000",
      background: "#0FFFFFF",
      accent: "#CC0000",
    },
    image: kessebohmer,
    shopNowLink: "/search?query=lemans+II",
    promoLink: `${apiUrl}/assets/banners/LP2037-Kessebohmer-LeMans_II-No_Links.pdf`,
    promoName: "LeMans II",
  },
  {
    id: 2,
    colors: {
      text: "#FFF",
      background: "#008290",
      accent: "#000",
    },
    image: makita,
    shopNowLink: "/search?query=makita",
    promoLink: `${apiUrl}/assets/banners/LP2036-WLAC-Makita_catalog_SV-No_Links.pdf`,
    promoName: "Makita",
  },
  {
    id: 3,
    colors: {
      text: "#000",
      background: "#E0DED6",
      accent: "#CC0000",
    },
    image: paintline,
    shopNowLink: "/product/351979/PRO-DRYING-RACK-WALL-MNT-15-SHELF-PDRWM",
    promoLink: `${apiUrl}/assets/banners/LP2080-WLAC-Paintline-PDRWM-No_Links.pdf`,
    promoName: "Paintline",
  },
];

const HomePage = async () => {
  const banners = await getBanners("0");

  const heroBanner: ComponentProps<typeof HeroBanners>["banners"] =
    banners.T.flatMap((topBanner) => topBanner.banners).map((banner) => ({
      id: banner.id,
      alt: banner.alt_tag,
      image: banner.file_path,
      pdfLink: banner.pdf_file_path,
      class: banner.class,
      dataDescription: banner["data-descr"],
    }));

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const image = images[randomIndex];

    return image as StaticImageData;
  };

  return (
    <>
      <HeroBanners banners={heroBanner} />

      <section className="container my-3 flex w-full flex-col items-center gap-4 md:my-6 lg:flex-row lg:items-center lg:justify-center lg:gap-5">
        {ADS.map((ad) => (
          <article
            key={ad.id}
            style={
              {
                backgroundColor: ad.colors.background,
                "--text-color": ad.colors.text,
              } as CSSProperties
            }
            className="relative flex aspect-[10/9] w-full flex-col justify-between overflow-hidden rounded-md bg-cover bg-center"
          >
            <Image src={ad.image} alt={ad.promoName} fill placeholder="blur" />

            <div className="absolute bottom-0 left-0 right-0 flex h-8 justify-between px-2 pb-2 sm:h-9 md:h-16 md:px-4 md:pb-4 lg:h-[1.84rem] lg:pb-[0.4rem] lg:pl-2 lg:pr-1 xl:px-3 xl:pb-3 2xl:h-12">
              <Link
                href={ad.shopNowLink}
                className="btnAction z-[1] flex flex-row items-center rounded-md bg-[var(--accent-color)] bg-red-700 px-4 py-2 pl-4 pt-2 text-sm font-bold text-white md:gap-[0.2rem] xl:gap-2"
                data-button-action="Promo Block Shop Now"
                data-promo-desc={ad.promoName}
                data-promo-position={ad.id}
              >
                <span>Shop Now</span>
                <ArrowRight className="stroke-white" width={16} height={16} />
              </Link>
              <Link
                href={ad.promoLink}
                target="_blank"
                className="btnAction z-[1] flex flex-row items-center gap-2 rounded-md bg-[var(--accent-color)] px-4 py-2 pl-4 pt-2 text-sm font-bold text-white md:gap-[0.2rem] xl:gap-2 3xl:py-4 3xl:pl-9"
                data-button-action="Promo Block PDF"
                data-promo={ad.promoName}
                data-promo-position={ad.id}
              >
                <span>Download Promo</span>
                <Download className="stroke-white" width={16} height={16} />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="container relative">
        <div className="relative flex h-full min-h-[40rem] w-full items-center rounded-lg p-10 px-6 py-9">
          <Image
            src={getRandomImage()}
            alt="Random image background"
            fill
            placeholder="blur"
            className="object-cover object-right"
          />
          <div className="relative w-2/3 flex-none space-y-3 text-white lg:pl-12 xl:w-2/5">
            <h2 className="pb-6 font-title text-4xl font-medium leading-[3rem] tracking-[-0.01688rem]">
              <Balancer>
                Woodworking and Metalworking for Every Passion and Profession
              </Balancer>
            </h2>
            <p className="py-1.5 text-lg">
              We provide top-tier woodworking and metalworking supplies, serving
              both professionals and hobbyists.
            </p>
            <p className="py-1.5 text-lg">
              With leading brands like Blum, Rev-a-Shelf, SCM and SawStop, 24/7
              online ordering, and fast delivery, we make it easy for everyone
              from businesses to DIY enthusiasts to find the right tools and
              materials.
            </p>
            <p className="py-1.5 text-lg">
              Our knowledgeable expert customer support ensures success for
              projects of any scale.
            </p>
          </div>
        </div>
      </section>

      <FlashSale />

      <FeaturedBrand />

      <FeaturedCategories />
    </>
  );
};

export default HomePage;
