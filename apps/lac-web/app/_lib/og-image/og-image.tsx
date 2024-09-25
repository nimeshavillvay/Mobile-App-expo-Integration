/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import WurthLacLogo from "@/_components/wurth-lac-logo";
import { ImageResponse } from "next/og";
import "server-only";

const OGImage = async ({
  title,
  subtitle = "Wurth Louis and Company",
  image,
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) => {
  const [jostBold, dmSansRegular, dmSansMedium] = await Promise.all([
    fetch(new URL("./Jost-Bold.ttf", import.meta.url)).then((res) =>
      res.arrayBuffer(),
    ),
    fetch(new URL("./DMSans-Regular.ttf", import.meta.url)).then((res) =>
      res.arrayBuffer(),
    ),
    fetch(new URL("./DMSans-Medium.ttf", import.meta.url)).then((res) =>
      res.arrayBuffer(),
    ),
  ]);

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col bg-white"
        style={{ fontFamily: "DM Sans", fontWeight: 400 }}
      >
        <div tw="flex flex-1 flex-col justify-between p-10">
          <div
            tw="flex flex-row items-start justify-between"
            style={{ gap: "1rem" }}
          >
            <div tw="flex flex-1 flex-col">
              <h1
                tw="text-6xl leading-none text-[#2A2C2E]"
                style={{
                  fontFamily: "Jost",
                  fontWeight: 700,
                }}
              >
                {title}
              </h1>

              <h2
                tw="text-4xl leading-none text-[#74767B]"
                style={{ fontWeight: 500 }}
              >
                {subtitle}
              </h2>
            </div>

            {!!image && (
              <img
                src={image}
                width={300}
                height={300}
                tw="rounded-xl"
                style={{ objectFit: "contain" }}
              />
            )}
          </div>

          <div tw="flex flex-row items-end justify-between">
            <div tw="text-2xl text-[#9FA1A6]">wurthlac.com</div>

            <WurthLacLogo />
          </div>
        </div>

        <div tw="h-5 w-full bg-[#CC0000]" />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "DM Sans",
          data: dmSansRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "DM Sans",
          data: dmSansMedium,
          style: "normal",
          weight: 500,
        },
        {
          name: "Jost",
          data: jostBold,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
};

export default OGImage;
