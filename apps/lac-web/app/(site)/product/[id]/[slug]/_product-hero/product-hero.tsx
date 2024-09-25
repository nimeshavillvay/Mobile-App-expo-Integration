import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@repo/web-ui/components/ui/carousel";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Balancer from "react-wrap-balancer";
import "server-only";
import { getProduct } from "../../../apis";
import ProductPrices from "./_product-prices";
import ProductVariants from "./_product-variants";
import SaleBadges from "./_sale-badges";
import AddToCart from "./add-to-cart";
import AddToCartFormProvider from "./add-to-cart-form-provider";
import ProductDesktopCarousel from "./product-desktop-carousel";
import {
  DropShipItemNotice,
  HazardousMaterialNotice,
  ProductDetails,
  ProductNumbers,
  ProductSpecifications,
  SpecialShippingNotice,
} from "./product-hero-sections";

type ProductHeroProps = {
  readonly id: string;
  readonly slug: string;
};

const ProductHero = async ({ id, slug }: ProductHeroProps) => {
  const product = await getProduct(id, slug);

  const media = product.selectedProduct.detailedImages?.length
    ? product.selectedProduct.detailedImages.map((image) => ({
        src: image.img,
        alt: image.alt,
        url: image.url,
        type: image.type,
      }))
    : [
        {
          src: product.selectedProduct.image,
          alt: product.selectedProduct.productName,
          url: "",
          type: "IMAGE",
        },
      ];

  return (
    <AddToCartFormProvider
      minQuantity={product.selectedProduct.minimumOrderQuantity}
    >
      <div className="container my-2 flex flex-row items-center gap-2 md:my-1">
        <Link
          href={`/search?query=${product.brand}`}
          className="btnAction btn-brand text-sm font-normal text-black hover:underline"
          data-btn-action={`Shop Brand ${product.brand}`}
        >
          Shop <span className="font-semibold">{product.brand}</span>
        </Link>

        <SaleBadges
          productId={parseInt(id)}
          listPrice={product.selectedProduct.listPrice}
          onSale={product.selectedProduct.isSaleItem}
          isNewItem={product.selectedProduct.isNewItem}
          minimumOrderQuantity={product.selectedProduct.minimumOrderQuantity}
        />
      </div>

      <h1 className="container my-2 font-title text-2xl font-medium tracking-[-0.009rem] text-wurth-gray-800 md:mb-7 md:mt-1 md:tracking-[-0.144px]">
        <Balancer>
          <span
            dangerouslySetInnerHTML={{
              __html: product.selectedProduct.productName,
            }}
          />
        </Balancer>
      </h1>

      {/* Desktop view */}
      <div className="hidden md:container md:grid md:grid-cols-[minmax(0,3fr)_minmax(26rem,2fr)] md:gap-x-8 md:gap-y-[3.75rem]">
        <ProductDesktopCarousel
          title={product.selectedProduct.productName}
          media={media}
        />

        <div className="space-y-6">
          <div className="space-y-2">
            <ProductNumbers
              sku={product.selectedProduct.productSku}
              manufacturerNo={product.selectedProduct.mfrPartNo}
            />
          </div>

          <ProductPrices
            productId={parseInt(id)}
            listPrice={product.selectedProduct.listPrice}
            uom={product.selectedProduct.unitOfMeasure}
            freightCharge={product.selectedProduct.specialShipping}
          />

          <ProductVariants id={id} />

          <Suspense fallback={<Skeleton className="h-[9.5rem]" />}>
            <AddToCart
              productId={parseInt(id)}
              minQty={product.selectedProduct.minimumOrderQuantity}
              incQty={product.selectedProduct.quantityByIncrements}
              uom={product.selectedProduct.unitOfMeasure}
              isExcludedProduct={product.selectedProduct.isExcludedProduct}
            />
          </Suspense>

          {product.selectedProduct.isHazardous && <HazardousMaterialNotice />}

          {product.selectedProduct.isDirectlyShippedFromVendor && (
            <DropShipItemNotice />
          )}

          {!!product.selectedProduct.specialShipping && (
            <SpecialShippingNotice />
          )}
        </div>

        <ProductDetails id={id} slug={slug} />

        {!!product.selectedProduct.attributes && (
          <ProductSpecifications
            attributes={product.selectedProduct.attributes.map((attribute) => ({
              name: attribute.name,
              value: attribute.value,
            }))}
          />
        )}
      </div>

      {/* Mobile view */}
      <>
        <ProductNumbers
          sku={product.selectedProduct.productSku}
          manufacturerNo={product.selectedProduct.mfrPartNo}
          className="container my-2 md:hidden"
        />

        <Carousel className="mb-10 mt-5 md:hidden">
          <CarouselContent>
            {media.map((mediaItem, index) => (
              <CarouselItem key={mediaItem.src}>
                {mediaItem.type === "IMAGE" && (
                  <Image
                    src={mediaItem.src}
                    alt={mediaItem.alt}
                    width={770}
                    height={770}
                    className="aspect-1 object-contain"
                    priority={index === 0}
                  />
                )}

                {mediaItem.type === "VIDEO" && (
                  <div className="relative w-full overflow-hidden pt-[100%]">
                    <iframe
                      title={`YouTube player for ${mediaItem.alt}`}
                      src={`https://${mediaItem.url}?autoplay=0`}
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselDots className="mt-1" />
        </Carousel>

        <ProductPrices
          productId={parseInt(id)}
          listPrice={product.selectedProduct.listPrice}
          uom={product.selectedProduct.unitOfMeasure}
          className="container my-6 md:hidden"
          freightCharge={product.selectedProduct.specialShipping}
        />

        <ProductVariants id={id} className="container my-6 md:hidden" />

        <Suspense
          fallback={
            <Skeleton className="container my-6 h-[10.25rem] md:hidden" />
          }
        >
          <AddToCart
            productId={parseInt(id)}
            minQty={product.selectedProduct.minimumOrderQuantity}
            incQty={product.selectedProduct.quantityByIncrements}
            uom={product.selectedProduct.unitOfMeasure}
            className="container my-6 md:hidden"
            isExcludedProduct={product.selectedProduct.isExcludedProduct}
          />
        </Suspense>

        {product.selectedProduct.isHazardous && (
          <HazardousMaterialNotice className="container my-6 md:hidden" />
        )}

        {product.selectedProduct.isDirectlyShippedFromVendor && (
          <DropShipItemNotice className="container my-6 md:hidden" />
        )}

        {!!product.selectedProduct.specialShipping && (
          <SpecialShippingNotice className="container my-6 md:hidden" />
        )}

        <ProductDetails
          id={id}
          slug={slug}
          className="container my-10 md:hidden"
        />

        {!!product.selectedProduct.attributes && (
          <ProductSpecifications
            attributes={product.selectedProduct.attributes.map((attribute) => ({
              name: attribute.name,
              value: attribute.value,
            }))}
            className="container my-10 md:hidden"
          />
        )}
      </>
    </AddToCartFormProvider>
  );
};

export default ProductHero;
