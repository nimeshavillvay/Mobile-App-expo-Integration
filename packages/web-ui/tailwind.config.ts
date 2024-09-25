import baseConfig from "@repo/tailwindcss-config/config";
import merge from "lodash/merge";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("@repo/tailwindcss-config")],
};

export default merge(baseConfig, config);
