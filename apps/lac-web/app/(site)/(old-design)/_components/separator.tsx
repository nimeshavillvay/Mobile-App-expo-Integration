"use client";

import * as RadixSeparator from "@radix-ui/react-separator";
import { type ComponentProps } from "react";

const Separator = (props: ComponentProps<typeof RadixSeparator.Root>) => {
  return <RadixSeparator.Root {...props} />;
};

export default Separator;
