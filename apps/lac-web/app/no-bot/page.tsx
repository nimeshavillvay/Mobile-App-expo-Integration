import { type Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const NoBotsPage = () => {
  return <h1>Hello Bot!!!</h1>;
};

export default NoBotsPage;
