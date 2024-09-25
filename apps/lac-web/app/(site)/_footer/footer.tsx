import { cn } from "@/_lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/web-ui/components/ui/accordion";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Balancer from "react-wrap-balancer";
import { SECTIONS } from "./constants";
import FooterLinks from "./footer-links";
import FooterMobileLoggedInSalesRep from "./footer-mobile-logged-in-sales-rep";
import ScrollToTopBtn from "./scroll-to-top-btn";
import vikingCloudLogo from "./viking-cloud.png";
import WhyShopWithUs from "./why-shop-with-us";

const Footer = () => {
  return (
    <footer className="mt-14 md:mt-20 print:hidden">
      <WhyShopWithUs />

      <div className="space-y-6 pb-7 pt-10 md:space-y-10">
        <div className="container flex flex-row items-center justify-between md:border-b md:border-b-wurth-gray-250 md:py-3">
          <div className="hidden text-base text-wurth-gray-800 md:block">
            Need help? Call{" "}
            <a
              href="tel:+18004224389"
              className="btnAction hover:underline focus:underline"
            >
              (800) 422-4389
            </a>
          </div>

          <ScrollToTopBtn />
        </div>
        <Accordion
          type="single"
          collapsible
          className="container md:hidden"
          defaultValue={SECTIONS[0].heading}
        >
          {SECTIONS.map((section, index) =>
            section.links.length === 0 ? (
              <Suspense
                fallback={<Skeleton className="h-fit w-full" />}
                key="mobile-sales-rep"
              >
                <FooterMobileLoggedInSalesRep
                  heading={section.heading}
                  index={index}
                />
              </Suspense>
            ) : (
              <AccordionItem
                key={section.heading}
                value={section.heading}
                className={cn(
                  "border-t border-y-wurth-gray-250",
                  index === SECTIONS.length - 1 && "border-b",
                )}
              >
                <AccordionTrigger className="flex-row-reverse justify-between gap-4 p-3 text-base font-semibold text-black">
                  {section.heading}
                </AccordionTrigger>

                <AccordionContent className="px-3">
                  <ul>
                    {section.links.map((link) => (
                      <li
                        key={link.label}
                        className="text-sm font-normal leading-8 text-black hover:underline"
                      >
                        <Link
                          href={link.href}
                          data-button-action="Footer Link"
                          className="btnAction"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ),
          )}
        </Accordion>
        <section className="container md:hidden">
          <SAMNotice />
        </section>

        <Suspense fallback={<Skeleton className="h-fit w-full" />}>
          <FooterLinks />
        </Suspense>

        <div className="container">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between md:border-t md:border-wurth-gray-250 md:pt-7">
            <p className="text-center text-xs text-wurth-gray-500 md:text-left">
              <Balancer>
                Copyright © {new Date().getFullYear()}, Würth Louis and
                Company. All Rights Reserved. All logos are Trademarks of their
                respective owners.
              </Balancer>
            </p>

            <div className="flex flex-col items-center gap-3 text-xs text-wurth-gray-800 md:flex-row md:gap-6">
              <nav className="flex flex-row items-center justify-center gap-6">
                <Link
                  href="/privacy-policy"
                  className="btnAction text-nowrap hover:underline"
                  data-button-action="Footer Link Privacy Policy"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/terms-of-sale"
                  className="btnAction text-nowrap hover:underline"
                  data-button-action="Footer Link Terms of Sale"
                >
                  Terms of Sale
                </Link>
              </nav>

              <div className="text-nowrap text-center">
                Do Not Sell My Personal Information
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export const Fsc = () => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://fsc.org"
      className="btnAction"
      data-btn-action="Footer FSC"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="109"
        height="49"
        fill="none"
        viewBox="0 0 109 49"
      >
        <g
          fillRule="evenodd"
          clipPath="url(#clip0_1705_44862)"
          clipRule="evenodd"
        >
          <path
            fill="#62BB46"
            d="M65.952 43.366c0 2.778-2.192 5.134-5.052 5.134-2.86 0-5.038-2.37-5.038-5.147 0-2.778 2.192-5.147 5.051-5.147 2.86.013 5.039 2.369 5.039 5.16zM60.9 45.368c1.035 0 1.88-.817 1.88-2.015 0-1.199-.845-2.016-1.867-2.016-1.02 0-1.892.831-1.892 2.016 0 1.184.858 2.015 1.879 2.015zm-8.13 1.988c0 .3.082.668.327.913h-3.812c.245-.259.327-.613.327-.913v-8.02c.013-.3-.082-.667-.314-.912h6.496v2.94c-.368-.203-.872-.23-1.294-.23h-1.716v1.034h1.022c.313 0 .626-.068.925-.19v2.628c-.285-.123-.599-.19-.925-.19h-1.022v2.94h-.013zm14.68-8.823c-.381 0-.681-.123-.899-.314h-.027v9.151c0 .3-.082.667-.313.913h3.799c-.232-.246-.313-.6-.313-.913v-1.96c1.075.217 1.974 1.17 1.974 1.96 0 .313-.082.667-.327.926h3.8c-.232-.245-.314-.613-.314-.912 0-1.62-.858-2.969-1.974-3.527.544-.586.885-1.389.885-2.165.013-2.26-1.73-3.473-3.895-3.473-.657 0-1.162.106-1.585.195-.304.064-.566.119-.811.119zm3.431 3.418c0 .735-.68.912-1.184.912v-1.825c.53 0 1.184.177 1.184.913zm10.69 6.345h-6.155c.231-.259.313-.613.313-.912v-8.02c.014-.3-.068-.668-.313-.913h6.168v2.982c-.435-.204-1.007-.272-1.511-.272h-1.321v1.035h.708c.368 0 .735-.041 1.103-.191v2.628c-.368-.15-.735-.19-1.103-.19h-.708v1.143h1.32c.505 0 1.077-.068 1.512-.258v2.968h-.013zm.912-9.082l3.322 9.096h3.8c-.164-.11-.3-.218-.3-.45 0-.163.082-.45.136-.599l2.778-7.421.054-.142c.181-.476.347-.911.681-1.233h-4.057v.068c.108.081.15.286.15.435 0 .209-.073.424-.145.636-.031.093-.062.186-.087.277l-1.403 4.575h-.027l-1.307-4.589-.053-.176c-.073-.242-.151-.502-.151-.709 0-.177.027-.368.095-.531h-4.03c.23.231.435.477.544.763zm16.735 9.109h-6.155c.232-.259.314-.613.314-.926v-8.02c.013-.3-.069-.668-.314-.913h6.169v2.982c-.422-.19-1.008-.258-1.512-.258H96.4v1.034h.721c.354 0 .722-.04 1.09-.204v2.628c-.368-.15-.736-.19-1.103-.19H96.4v1.143h1.32c.49.014 1.076-.054 1.512-.258v2.982h-.014zm1.907-9.75c-.368 0-.681-.122-.899-.313h-.014v9.15c0 .3-.095.654-.326.913h3.799c-.232-.245-.313-.613-.313-.912V45.45c1.075.218 1.974 1.157 1.974 1.96 0 .3-.082.668-.313.913h3.799c-.232-.245-.313-.6-.313-.912 0-1.607-.858-2.955-1.975-3.527.531-.572.885-1.375.885-2.152 0-2.274-1.743-3.472-3.894-3.472-.654 0-1.158.105-1.582.193-.309.065-.576.12-.828.12zm3.458 3.418c0 .736-.68.913-1.198.913v-1.825c.531 0 1.198.177 1.198.912z"
          />
          <path
            fill="#00594C"
            d="M106.49 13.681h.435v-1.756l.572 1.375h.423l.544-1.39v1.771h.422V10.89h-.435l-.736 1.838-.79-1.838h-.435v2.791zm-1.689-2.41v2.41h.477v-2.41h.899v-.381h-2.288v.38h.912zM60.927 24.193c2.86 0 5.052-2.369 5.052-5.147S63.8 13.913 60.941 13.9c-2.86 0-5.052 2.37-5.052 5.147 0 2.778 2.179 5.134 5.038 5.147zm1.88-5.147c0 1.185-.845 2.015-1.88 2.015-1.021 0-1.879-.817-1.879-2.015 0-1.198.844-2.015 1.88-2.015 1.034 0 1.878.83 1.878 2.015zm-9.696 4.916c-.231-.245-.313-.613-.313-.912v-2.942h1.035c.327 0 .626.069.926.191v-2.628c-.3.123-.613.19-.926.19h-1.021v-1.034h1.715c.422 0 .926.027 1.294.218v-2.928h-6.495c.231.245.313.6.313.912v8.02c0 .3-.082.654-.327.913h3.8zm13.467-10.05c.218.192.518.314.9.314.244 0 .506-.055.81-.119.423-.088.928-.194 1.586-.194 2.165 0 3.894 1.212 3.894 3.472 0 .776-.34 1.58-.885 2.152 1.117.572 1.975 1.92 1.975 3.527 0 .3.081.667.313.925h-3.8c.246-.258.327-.612.327-.925 0-.804-.898-1.743-1.974-1.961v1.96c-.014.3.082.668.313.913h-3.799c.231-.245.313-.613.313-.912v-9.151h.027zm3.146 4.644c.504 0 1.185-.177 1.185-.912 0-.735-.668-.912-1.185-.912v1.824zm5.719 5.433h6.168v-2.968c-.435.19-1.02.259-1.511.259h-1.334v-1.144h.721c.368 0 .736.04 1.103.19v-2.628c-.368.15-.735.191-1.103.191h-.708v-1.035h1.32c.505 0 1.077.068 1.512.272v-2.982h-6.168c.245.245.327.6.313.913v8.02c0 .3-.082.654-.313.912zm7.19-3.88c.572.68 1.43 1.538 2.383 1.538.34 0 .762-.231.762-.64 0-.501-.5-.819-1.104-1.2-.167-.107-.342-.217-.516-.339-.817-.53-1.62-1.28-1.62-2.669 0-2.001 1.416-2.873 3.295-2.873.328 0 .697.114.98.202.175.054.317.098.395.098.218 0 .422-.027.572-.177v3.213c-.218-.408-.858-1.089-1.375-1.089-.518 0-.736.163-.736.518 0 .415.452.68 1.02 1.012.196.114.405.237.614.376.818.545 1.62 1.335 1.62 2.915-.013 2.178-1.647 3.227-3.69 3.227-.354 0-.701-.085-1.026-.164-.287-.07-.556-.136-.798-.136-.3 0-.531.055-.803.177v-3.99h.027zm12.881-5.951h-6.93v2.9c.285-.136.694-.19 1.048-.19h.83v6.222c0 .3-.081.668-.313.913h3.8c-.246-.245-.327-.613-.314-.913v-6.223h.844c.355 0 .763.055 1.035.191v-2.9zm.818 5.964c.585.681 1.443 1.539 2.396 1.539.34 0 .763-.232.763-.64 0-.501-.501-.819-1.104-1.2-.168-.107-.343-.218-.517-.339-.83-.53-1.634-1.28-1.62-2.669 0-2.001 1.402-2.873 3.281-2.873.338 0 .713.115.997.203.174.053.315.097.392.097.218 0 .409-.027.572-.177v3.213c-.218-.408-.871-1.089-1.375-1.089s-.735.163-.735.517c0 .416.452.68 1.019 1.013.196.114.405.237.615.376.817.545 1.607 1.335 1.607 2.914 0 2.18-1.635 3.228-3.677 3.228-.355 0-.702-.085-1.027-.164-.286-.07-.555-.136-.798-.136-.3 0-.544.055-.803.177v-3.99h.014zm-43.22 15.986c-.246-.245-.328-.599-.328-.912v-2.941h1.035c.327 0 .627.068.926.19v-2.614c-.3.122-.613.19-.926.19h-1.021v-1.034h1.716c.422 0 .926.027 1.293.218v-2.942h-6.495c.231.245.313.613.313.913v8.02c0 .3-.082.667-.327.912h3.813zm12.854-4.902c0 2.778-2.193 5.148-5.052 5.134-2.86 0-5.039-2.37-5.039-5.147 0-2.778 2.193-5.134 5.052-5.134 2.86 0 5.039 2.37 5.039 5.147zm-5.052 2.016c1.034 0 1.879-.83 1.879-2.016 0-1.184-.845-2.029-1.88-2.029-1.034 0-1.879.831-1.879 2.016 0 1.184.858 2.029 1.88 2.029zm6.55-6.836c-.382 0-.681-.136-.9-.327h-.026v9.164c0 .3-.082.654-.314.913h3.8a1.31 1.31 0 01-.314-.913v-1.96c1.076.218 1.975 1.157 1.975 1.96 0 .3-.096.668-.327.913h3.8c-.232-.245-.314-.613-.314-.913 0-1.62-.858-2.954-1.975-3.526.545-.586.885-1.376.885-2.152 0-2.274-1.729-3.472-3.894-3.472-.665-.008-1.174.101-1.6.193-.298.065-.555.12-.797.12zm3.431 3.418c0 .735-.68.912-1.185.912v-1.825c.518 0 1.185.178 1.185.913zm15.17-3.5l3.295 8.988c.136.381.34.64.558.858H85.9c.068-.15.095-.34.095-.531 0-.259-.08-.507-.164-.763l-.04-.123h-2.737c-.15.246-.232.613-.232.9 0 .149.041.367.15.449v.068h-4.058c.324-.312.49-.74.664-1.19v-.001l.072-.185 2.778-7.42c.054-.15.136-.45.136-.614 0-.218-.136-.326-.3-.435h3.8zm-.981 6.17l-.64-3.037h-.055l-.626 3.036h1.32zm9.518.98h-.871V27.23c0-.313.081-.667.326-.925h-3.812c.245.258.326.612.313.912v8.02c0 .313-.082.667-.313.926h5.65v-2.927c-.367.19-.87.218-1.293.218zm5.338 0h.858c.436 0 .926-.028 1.307-.219v2.928H96.44c.246-.259.327-.613.327-.912v-8.02c0-.3-.081-.668-.313-.913h3.799c-.231.245-.313.613-.313.912v6.223zM7.788 25.748C10.892 14.048 14.49.488 23.766.5c3.146 0 7.231 1.838 8.538 6.577 3.636 1.24 6.455 5.678 4.712 10.267 0 0 2.955 1.92 2.968 5.76.014 4.235-3.527 7.122-7.244 7.122-.994 0-2.914-.327-4.303-1.171v4.602c0 .777-.654 1.43-1.43 1.417h-6.631c-.64 0-1.376-.627-1.376-1.267V28.77s-3.159.395-3.145.395c.013.013-.136.013-.245.013-.899.014-1.525-.64-1.525-1.416 0-.667.558-1.32 1.157-1.402l4.984-.6c-.014-.027.3-.027.313-.027.735.014 1.335.64 1.335 1.43v5.093h3.717v-5.107c0-.708.545-1.416 1.443-1.416.912.007 1.67.357 2.478.73.93.43 1.926.89 3.296.89 2.56 0 4.303-2.11 4.303-4.166 0-2.056-1.225-3.69-4.003-5.025 3.363-3.309.762-8.701-3.391-8.715.014-4.071-3.186-6.1-5.978-6.1-3.309-.014-8.402 1.865-14.107 27.125-.005 0-.012.024-.024.066-.057.191-.223.756-.793 1.091-.654.395-1.321.123-1.77-.313-1.383-1.37-4.952-4.89-6.128-6.05l-.381-.377c-.572-.558-.504-1.498 0-2.002.504-.476 1.32-.708 2.042 0 .014 0 3.568 3.527 4.725 4.685l.485-1.822zM23.1 43.638c-2.206-1.034-3.554-1.756-3.554-2.94h.014c0-1.417 1.743-2.261 4.657-2.261a11.89 11.89 0 012.26.231l.042.009c.454.09.776.154.816.59l.136 1.376c.014.15-.013.258-.095.34-.15.15-.395.19-.763.19h-.15l-.04-.163c-.204-.803-.668-1.729-2.342-1.729-1.294 0-2.193.463-2.193 1.171 0 .706.866 1.114 2.3 1.79l.015.008.953.463c2.097 1.035 3.078 1.974 3.078 2.94 0 1.335-1.525 2.683-4.875 2.683-1.198 0-2.615-.245-2.887-.3-.64-.122-.776-.176-.871-.571 0 0-.395-1.593-.382-1.593-.054-.205-.095-.409.028-.572.15-.164.395-.177.708-.177h.136l.04.136c.573 1.552 1.608 2.247 3.364 2.247 1.144 0 2.356-.395 2.356-1.512 0-.68-1.008-1.538-2.75-2.355zm6.114-.135c0 2.396 2.11 4.847 6.128 4.847 2.029 0 3.173-.463 4.03-.912l.232-.123-.368-.408v.027c-.068-.122-.136-.15-.272-.15l-.204.069-.01.004c-.31.14-1.247.567-2.918.554-2.083 0-4.33-1.348-4.317-4.303 0-2.832 2.438-3.827 4.508-3.827 1.498.014 2.301.532 2.437 1.635l.027.177h.177c.177 0 .654 0 .654-.355v-1.647c0-.395-.463-.463-.667-.49h-.19c-.477-.082-.94-.15-2.166-.15-4.099 0-7.08 2.124-7.08 5.052zm-18.832-4.93l3.636-.027-.014-.014h2.315c.517 0 .79 0 .871.232.273.748.504 1.239.64 1.525.11.245.136.313.136.395 0 .3-.354.3-.462.3-.186 0-.316-.102-.523-.265l-.063-.05c-.259-.217-.68-.557-1.498-1.061-.259-.177-.68-.273-1.117-.273-.463 0-2.015.055-2.641.082-.177 0-.313 0-.313.79v2.873h.98c1.103 0 1.798-.204 1.88-.558.203-.926.271-1.13.585-1.13.19 0 .544 0 .544.3v1.96c0 .354.014.708.055 1.076l.027.463c0 .095-.04.313-.436.313-.19 0-.408-.04-.463-.313-.258-1.267-.435-1.321-2.097-1.321H11.32v1.157c0 .586.028 1.416.069 2.043 0 .19.013.381 1.307.381.558 0 .885.027.885.422 0 .34-.245.382-.531.382h-.068c-.15-.014-.572-.028-2.737-.041-1.596 0-2.19.017-2.443.024l-.145.003h-.081c-.34 0-.34-.272-.34-.381 0-.34.217-.422.571-.422 1.294 0 1.307-.177 1.307-.368.034-.552.049-1.212.06-1.725l.009-.331v-3.187l-.041-1.484v-.34c-.014-.559-.068-.681-1.525-.681-.395 0-.395-.327-.395-.422 0-.218.15-.382.367-.368h.368l2.424.04z"
          />
        </g>
        <defs>
          <clipPath id="clip0_1705_44862">
            <path
              fill="#fff"
              d="M0 0H108.773V48H0z"
              transform="translate(.114 .5)"
            />
          </clipPath>
        </defs>
      </svg>

      <span className="sr-only">Forest Stewardship Council</span>
    </a>
  );
};

export const VikingCloud = () => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://sealserver.trustwave.com/cert.php?customerId=w6oj3Bo5yhnnpWYTgYaQ7ih5yrcC2k&size=105x54&style=invert"
      className="btnAction"
      data-btn-action="Footer Viking Cloud"
    >
      <Image src={vikingCloudLogo} alt="The logo of Viking Cloud" />
    </a>
  );
};

export const VenderFreightRouting = () => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://my.ratelinx.com/ui/auth/Login/v1?refsso=aSCSOvkRbtde8%2fNFsp7lM3qw02PlUR1Var73aJvrSwY%3d&ReturnURL=%2fui%2fShipping%2fShip%2fv1%3fbyShipVia%3dBWAYLTL%26estimate%3dTrue"
      className="btnAction"
      data-btn-action="Footer Vender Freight"
    >
      <span className="flex flex-row items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 28 28"
        >
          <path
            fill="#009BD7"
            d="M2.1 11.035v-5.27a1.4 1.4 0 01.774-1.251l4.2-2.1a1.4 1.4 0 011.252 0l4.2 2.1a1.4 1.4 0 01.774 1.251v5.27a1.4 1.4 0 01-.774 1.253l-4.2 2.1a1.4 1.4 0 01-1.252 0l-4.2-2.1a1.4 1.4 0 01-.774-1.253zm1.456-5.006a.7.7 0 00.372.917L7 8.242V11.9a.7.7 0 101.4 0V8.242l3.072-1.296a.7.7 0 00-.545-1.29L7.7 7.018 4.472 5.656a.7.7 0 00-.916.373zM2.857 19.95v-6.104l1.4.7v5.404c0 .581.47 1.05 1.05 1.05h.363a3.5 3.5 0 016.86 0h1.54a3.499 3.499 0 014.13-2.73V6.65a1.05 1.05 0 00-1.05-1.05h-2.456a2.8 2.8 0 00-.473-1.4h2.929a2.45 2.45 0 012.45 2.45V8.4h1.233a2.1 2.1 0 011.88 1.162l2.264 4.53c.146.292.223.612.223.939v5.27a2.1 2.1 0 01-2.1 2.1h-2.17a3.5 3.5 0 01-6.86 0h-1.54a3.5 3.5 0 01-6.86 0h-.363a2.45 2.45 0 01-2.45-2.45zM20.93 21h2.17a.7.7 0 00.7-.7v-4.9h-4.2v3.5a3.493 3.493 0 011.33 2.1zm2.439-7l-1.907-3.812a.7.7 0 00-.626-.388H19.6V14h3.769zM7 21.7a2.1 2.1 0 104.2 0 2.1 2.1 0 00-4.2 0zm10.5 2.1a2.1 2.1 0 100-4.2 2.1 2.1 0 000 4.2z"
          />
        </svg>

        <div className="text-[13px] font-black uppercase leading-[14px] text-[#003549]">
          Vender Freight
          <br />
          Routing
        </div>
      </span>
    </a>
  );
};

export const SAMNotice = () => {
  return (
    <Link
      href="/government"
      className="btnAction flex flex-col items-center gap-3 rounded-xl bg-wurth-gray-50 px-7 py-5 md:items-start"
      data-button-action="Footer Link SAMNotice"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="158"
        height="32"
        fill="none"
        viewBox="0 0 158 32"
      >
        <g clipPath="url(#clip0_168_11699)">
          <path
            fill="#CC202A"
            fillRule="evenodd"
            d="M12.314 19.915a30.358 30.358 0 012.317-.527V.64c-2.089.377-4.064 1.054-5.962 1.958v19.05h.038c.645-.64 1.86-1.243 3.607-1.733z"
            clipRule="evenodd"
          />
          <path
            fill="#112E4F"
            fillRule="evenodd"
            d="M34.72 23.981c-.076-1.957-5.886-3.576-13.102-3.576-7.215 0-13.025 1.581-13.101 3.576v4.066c4.14.602 8.316.866 12.494.866 4.557.038 9.152-.188 13.671-.715l.038-4.217z"
            clipRule="evenodd"
          />
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M10.643 24.32h.038l.95-.038h.418s.037 0 .037-.037a8.62 8.62 0 00.38-1.054.532.532 0 00.076-.226v-.038l.114.34.228.45.19.49c0 .038.038.038.076.038.455 0 .873.037 1.329.037h.076l-.076.076-.987.753c-.076.075-.076.075-.038.15.075.302.19.64.265.942l.076.3v.038l-.265-.15-.532-.377-.342-.226c-.038-.037-.076-.037-.076 0l-1.14.753-.037.038c.038-.075.038-.15.076-.226l.19-.678c.038-.15.076-.3.114-.414v-.075l-.76-.565-.38-.3zM19.188 24.057h.076l1.253-.038.57-.038c.038 0 .038 0 .038-.037.19-.452.341-.941.531-1.393l.114-.301.038-.076c.076.15.114.302.152.452.076.226.152.452.228.64.076.188.152.452.266.678 0 .037.038.075.076.075l1.785.075h.076l-.114.076-1.33 1.016c-.113.075-.113.075-.075.188.113.414.227.829.38 1.243.037.15.075.263.113.414v.037l-.341-.225-.722-.49-.456-.301c-.038-.038-.076-.038-.114 0l-1.519 1.016-.038.038c.038-.113.076-.226.076-.301l.266-.941.152-.565c0-.038 0-.075-.038-.075l-1.063-.829-.38-.338zM28.872 24.32h.038l.95-.038h.417s.038 0 .038-.037c.114-.339.266-.678.38-1.054a.532.532 0 00.076-.226l.038-.038.113.34c.038.112.114.3.19.489.076.188.114.338.19.489 0 .037.038.037.076.037.456 0 .874.038 1.33.038h.075l-.076.075-.987.753c-.076.076-.076.076-.038.151.076.301.19.64.266.941l.076.301v.038l-.266-.15-.532-.377-.341-.226c-.039-.038-.076-.038-.076 0l-1.14.753-.038.038c0-.076.038-.15.076-.226.076-.226.114-.452.19-.678.038-.15.076-.301.114-.414v-.075l-.76-.603-.38-.3z"
            clipRule="evenodd"
          />
          <path
            fill="#CC202A"
            fillRule="evenodd"
            d="M21.77 18.861c.912 0 1.785.038 2.659.075V.076A55.729 55.729 0 0021.884 0c-1.215 0-2.354.038-3.456.15v18.824a47.895 47.895 0 013.342-.113zM31.226 20.066c1.595.451 2.773.979 3.456 1.619h.076V2.898c-1.899-.942-3.911-1.657-5.962-2.033v18.71c.873.113 1.67.302 2.43.49z"
            clipRule="evenodd"
          />
          <path
            fill="#112E4F"
            fillRule="evenodd"
            d="M.2 27.972l.038 2.22c.608.114 1.291.227 2.013.377 6.19.98 12.456 1.469 18.76 1.43 11.43 0 18.19-.79 22.178-1.543v-2.484c0-.113-.038-.189-.076-.302-.19-.527-.798-.79-1.33-.602l-.341.15c-1.595.64-6.456 2.636-20.317 2.636a67.661 67.661 0 01-14.317-1.43 34.953 34.953 0 01-5.165-1.431c-.532-.226-1.101.038-1.33.565-.075.113-.113.188-.113.3v.114z"
            clipRule="evenodd"
          />
          <path
            fill="#112E4F"
            d="M94.19 17.054c-.151.49-.303 1.017-.493 1.506l-2.62 6.099c-.19.49-.418.94-.646 1.43-.076.226-.266.34-.494.34-.494 0-.987.037-1.481 0a.845.845 0 01-.494-.302c-.95-2.07-1.898-4.141-2.81-6.212-.342-.753-.532-1.58-.797-2.371-.038-.114-.076-.264-.152-.377h-.114v.452c.342 3.69.342 7.416.342 11.106 0 .715 0 .715-.76.715h-2.696c-.38 0-.532-.113-.532-.527V8.283c0-.377.114-.565.532-.528h2.582a.503.503 0 01.57.377c1.519 3.576 3.038 7.19 4.557 10.767.228.49.342 1.054.532 1.656.038-.188.076-.263.113-.376.684-1.657 1.292-3.35 1.975-5.007l2.962-7.003a.57.57 0 01.57-.414 29.54 29.54 0 002.582 0c.418 0 .532.15.532.527v20.593c0 .527-.038.565-.57.565h-2.886c-.38 0-.531-.113-.531-.49.113-3.425.19-6.851.303-10.277 0-.49.076-1.017.114-1.506l-.19-.113zM77.519 28.687c-1.253-4.141-2.544-8.245-3.836-12.386-.835-2.748-1.709-5.459-2.506-8.207a.509.509 0 00-.57-.414c-.721 0-1.405.038-2.126 0-.304-.038-.608.15-.646.452v.037c-1.215 4.029-2.468 8.057-3.721 12.123l-2.62 8.583c-.153.452-.039.527.417.527h3.266a.472.472 0 00.531-.376c.304-1.054.608-2.146.912-3.2a.509.509 0 01.57-.452h4.671c.303-.037.57.15.607.452.304 1.054.608 2.146.912 3.2.038.264.303.414.57.376.53-.037 1.1 0 1.632 0h1.52c.53-.037.607-.113.417-.715zm-6.57-7.04c-.076.038-.152.038-.228.038H68.14c-.456 0-.228-.49-.228-.49l1.595-6.7s1.101 4.63 1.52 6.286c.037.113.075.264.113.377 0 .037.038.113.038.15.038.076.038.15 0 .189-.038.037-.076.075-.152.113l-.076.037zM55.987 17.958c-.646-.415-1.292-.753-1.937-1.092-.987-.49-2.05-.904-3.038-1.43-.76-.377-1.367-.942-1.443-1.883a2.326 2.326 0 011.177-2.221 2.875 2.875 0 013.911.828c.152.226.304.49.418.753.114.301.304.339.57.188.95-.49 1.899-.979 2.848-1.43a.376.376 0 00.228-.49c0-.038-.038-.075-.038-.075a6.963 6.963 0 00-1.557-2.184 1.484 1.484 0 00-.38-.3l-.342-.227a5.215 5.215 0 00-1.215-.602c-.038 0-.076-.038-.114-.038l-.152-.037h-.038l-.152-.038h-.076l-.151-.038h-.076l-.152-.037h-.076l-.114-.038H53.67l-.228-.038c-.57-.037-1.177-.075-1.747-.037-.227 0-.455.037-.683.037h-.342l-.456.113H49.76l-.38.113c-.19.075-.342.15-.532.226l-.076.038c-3.114 1.506-3.873 5.27-2.62 8.094.607 1.355 1.709 2.259 3 2.974 1.291.715 2.696 1.355 4.063 2.07.342.226.646.452.95.753.797.64 1.101 1.732.721 2.673a1.121 1.121 0 01-.152.302 2.297 2.297 0 01-1.1 1.054l-.19.075a4.733 4.733 0 01-2.887.113c-.266-.075-.532-.188-.721-.339a1.15 1.15 0 01-.304-.301 1.673 1.673 0 01-.304-.414c-.19-.264-.342-.527-.532-.828-.19-.302-.228-.377-.531-.226-.988.49-1.975.979-2.963 1.506-.19.037-.265.226-.227.414 0 .037.038.075.038.075.797 1.619 1.936 2.937 3.76 3.501 1.518.452 3.113.414 4.67.264.836-.113 1.633-.34 2.355-.716 1.937-.94 2.924-2.56 3.114-4.668.304-2.786-.608-4.932-2.924-6.437z"
          />
          <path
            fill="#CC202A"
            fillRule="evenodd"
            d="M99.697 26.918h.114l1.823-.076.797-.037c.038 0 .076-.038.076-.038l.76-2.033c.038-.15.114-.301.151-.452 0-.037.038-.075.038-.075.076.226.152.414.228.64.114.301.228.64.342.941l.342.941c0 .076.076.113.114.076l2.582.075h.152l-.152.113-1.899 1.506c-.152.113-.152.113-.076.301.19.602.342 1.205.532 1.807.038.188.114.414.19.602v.076l-.494-.34-1.063-.714-.684-.452a.116.116 0 00-.152 0l-2.202 1.468-.076.038.114-.452.38-1.355c.076-.264.152-.527.227-.829.038-.037 0-.075-.037-.113-.494-.376-1.026-.79-1.52-1.167l-.607-.451z"
            clipRule="evenodd"
          />
          <path
            fill="#112E4F"
            d="M115.799 12.612c.303.037.569.037.873.113a5.58 5.58 0 014.064 3.011c.379.753.683 1.544.835 2.335v.075h-1.595c-.038-.188-.114-.414-.152-.64a6.376 6.376 0 00-.873-1.845 3.79 3.79 0 00-2.355-1.506 5.114 5.114 0 00-3 .226c-.759.264-1.405.79-1.861 1.43a7.327 7.327 0 00-1.177 3.05 15.172 15.172 0 00-.114 4.141 8.772 8.772 0 00.722 2.937c.379.903 1.025 1.694 1.898 2.183.456.264.988.452 1.519.527.874.151 1.747.076 2.583-.188.721-.263 1.367-.715 1.823-1.317a6.225 6.225 0 001.139-2.786c.114-.678.152-1.356.228-2.07v-.227h-4.861v-1.355h6.494c0 .113 0 .226.038.339a13.936 13.936 0 01-.38 3.764 8.845 8.845 0 01-1.481 3.276 5.344 5.344 0 01-3.646 2.033 6.264 6.264 0 01-.835.075h-.38c-.304-.038-.57-.038-.873-.075a5.818 5.818 0 01-3.912-2.26 8.764 8.764 0 01-1.405-3.01 14.403 14.403 0 01-.38-2.824c0-.189 0-.34-.038-.49v-.263-.189c.038-.64.076-1.28.152-1.92a8.84 8.84 0 011.367-3.84 5.757 5.757 0 014.102-2.635c.227-.037.417-.075.645-.075h.836zM130.723 30.193c-.304-.038-.569-.038-.873-.075a5.724 5.724 0 01-3.76-2.07 8.599 8.599 0 01-1.481-2.937 11.621 11.621 0 01-.418-2.56 15.569 15.569 0 01.076-2.974c.114-1.28.494-2.523 1.064-3.652a5.607 5.607 0 013.531-3.012c.456-.113.95-.188 1.443-.264l.152-.037h.95c.266.037.569.075.835.113 1.671.263 3.114 1.28 3.988 2.71.569.98.987 2.033 1.177 3.125.19 1.054.304 2.108.266 3.2 0 1.016-.152 2.033-.38 3.012a7.915 7.915 0 01-1.595 3.313c-.835 1.016-2.013 1.732-3.304 1.957-.38.076-.759.076-1.139.151h-.532zm5.317-8.847c0-.828-.076-1.694-.19-2.522a6.81 6.81 0 00-1.139-2.937 3.951 3.951 0 00-2.469-1.694 5.949 5.949 0 00-3.038.113 3.828 3.828 0 00-2.013 1.506 7.463 7.463 0 00-1.215 3.426 17.554 17.554 0 00-.114 2.823c.038.79.114 1.544.266 2.297.152.903.532 1.732 1.025 2.484a4.216 4.216 0 002.659 1.77c.911.188 1.861.15 2.734-.113a3.832 3.832 0 001.785-1.092 5.88 5.88 0 001.367-2.635c.19-1.092.342-2.259.342-3.426zM152.104 12.988c-.152.377-.266.753-.38 1.092l-5.355 15.586c0 .075-.114.15-.19.15h-1.329c-.114 0-.19-.037-.19-.15l-3.797-10.993c-.646-1.845-1.291-3.727-1.937-5.572 0-.037-.038-.075-.038-.113H140.445a.21.21 0 01.19.113c1.595 4.706 3.19 9.45 4.785 14.156 0 .075.038.112.076.15 0-.038.038-.075.038-.15 1.595-4.706 3.19-9.412 4.747-14.118.038-.15.114-.188.266-.188.531.037 1.025.037 1.557.037z"
          />
          <path
            fill="#0F2E4E"
            d="M154.762 15.661h.304c.342 0 .607-.113.607-.376 0-.264-.189-.377-.569-.377-.114 0-.228 0-.342.038v.715zm0 1.506h-.608v-2.635c.342-.075.646-.075.988-.075.304-.038.607.037.911.188.152.15.266.339.266.565-.038.3-.266.527-.57.602v.038c.266.113.456.338.456.64.038.226.076.451.19.64h-.646c-.114-.189-.152-.415-.19-.64-.038-.302-.189-.414-.531-.414h-.304l.038 1.091zm-1.595-1.355c-.038 1.092.835 2.033 1.937 2.108h.076c1.101-.038 1.974-.941 1.936-2.033v-.037c.038-1.092-.797-2.033-1.898-2.071-1.102-.038-2.051.79-2.089 1.882 0 .038 0 .076.038.151zm4.671 0c0 1.468-1.177 2.635-2.658 2.635-1.481 0-2.659-1.167-2.659-2.635 0-1.468 1.178-2.635 2.659-2.635 1.443-.038 2.62 1.13 2.658 2.56v.075z"
          />
        </g>
        <defs>
          <clipPath id="clip0_168_11699">
            <path fill="#fff" d="M0 0H157.6V32H0z" transform="translate(.2)" />
          </clipPath>
        </defs>
      </svg>

      <div className="text-center text-sm font-semibold text-wurth-gray-800 md:text-left">
        <div>Approved US Government Vendor</div>
        <div>
          <span className="font-normal">Cage Code: </span>0P072
        </div>
      </div>
    </Link>
  );
};