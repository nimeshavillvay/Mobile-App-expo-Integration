import OGImage from "./_lib/og-image";

export const size = {
  width: 1200,
  height: 630,
};

export const runtime = "edge";
export const contentType = "image/png";

const Image = async () => {
  return OGImage({
    title: "WurthLAC",
  });
};

export default Image;
