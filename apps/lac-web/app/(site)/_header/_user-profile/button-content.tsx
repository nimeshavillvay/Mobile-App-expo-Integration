import { compose, cva } from "@/_lib/cva.config";
import { Profile } from "@repo/web-ui/components/icons/profile";
import { buttonVariants } from "@repo/web-ui/components/ui/button";
import type { ReactNode } from "react";

export const buttonClasses = compose(
  buttonVariants,
  cva({
    variants: {
      type: {
        mobile: "size-6 md:hidden",
        desktop:
          "hidden shrink-0 md:flex md:h-min md:flex-row md:items-center md:gap-2 md:p-0",
      },
    },
  }),
);

type ButtonContentProps = {
  readonly children?: ReactNode;
};

const ButtonContent = ({
  children = "Sign in / Register",
}: ButtonContentProps) => {
  return (
    <>
      <Profile className="shrink-0 md:size-7" />

      <span className="sr-only md:not-sr-only md:min-w-0 md:shrink md:truncate md:text-base md:font-semibold">
        {children}
      </span>
    </>
  );
};

export default ButtonContent;
