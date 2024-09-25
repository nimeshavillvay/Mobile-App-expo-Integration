import { defineConfig } from "cva";
import { twMerge } from "./utils";

export const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: (className) => twMerge(className),
  },
});

export type { VariantProps } from "cva";
