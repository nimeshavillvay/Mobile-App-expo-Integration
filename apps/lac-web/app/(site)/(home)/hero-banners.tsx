"use client";

import { cn } from "@/_lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@repo/web-ui/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type HeroBannersProps = {
  readonly banners: {
    id: string;
    alt: string;
    image: string;
    pdfLink: string;
    class: string;
    dataDescription: string;
  }[];
};

const HeroBanners = ({ banners }: HeroBannersProps) => {
  return (
    <section className="bg-[#271E1A] py-4">
      <Carousel
        className="container w-full"
        plugins={[Autoplay({ delay: 5000 })]}
      >
        <CarouselContent
          id="banner-system-T"
          className="banner-promo banner-system"
        >
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id}>
              <a
                href={banner.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "btnAction aspect-h-9 aspect-w-[28] block",
                  banner.class,
                )}
                data-desc={banner.dataDescription}
                data-btn-action="Banners"
              >
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  width={1920}
                  height={618}
                  priority={index === 0}
                  className="banner-promo banner-system slideshow-content slide-top-home block rounded-lg bg-[#362A23] object-cover shadow-lg"
                  id={banner.id}
                  data-description="Slide description"
                />
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselDots
          className="mt-2.5"
          buttonClassName="size-3 border-white/40 data-[selected]:bg-white/40"
        />
      </Carousel>
    </section>
  );
};

export default HeroBanners;
