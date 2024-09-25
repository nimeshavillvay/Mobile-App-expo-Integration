"use client";

import { useScrollable } from "@storefront-ui/react";
import {
  createContext,
  useContext,
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type LegacyRef,
} from "react";
import { cn } from "~/lib/utils";
import { ArrowLeft } from "../icons/arrow-left";
import { ArrowRight } from "../icons/arrow-right";
import { Button, type ButtonProps } from "../ui/button";

const ScrollableContext = createContext<ReturnType<
  typeof useScrollable
> | null>(null);
const useScrollableContext = () => {
  const scrollable = useContext(ScrollableContext);

  if (!scrollable) {
    throw new Error("Component must be a child of ScrollableRoot");
  }

  return scrollable;
};

export const ScrollableRoot = ({
  children,
  className,
  ...delegated
}: ComponentProps<"div">) => {
  const scrollable = useScrollable();

  return (
    <ScrollableContext.Provider value={scrollable}>
      <div {...delegated} className={cn("relative", className)}>
        {children}
      </div>
    </ScrollableContext.Provider>
  );
};

export const ScrollablePreviousButton = ({
  variant = "outline",
  size = "icon",
  className,
  ...delegated
}: Omit<ButtonProps, "onClick" | "disabled" | "children">) => {
  const {
    state: { hasPrev },
    getPrevButtonProps,
  } = useScrollableContext();

  return (
    <Button
      {...delegated}
      {...getPrevButtonProps()}
      variant={variant}
      size={size}
      className={cn(
        "absolute inset-y-1/2 left-1 size-8 -translate-y-1/2 rounded-full border-wurth-gray-250 shadow-md",
        !hasPrev && "hidden",
        className,
      )}
    >
      <ArrowLeft
        width={16}
        height={16}
        data-button-action="Scrollable Show previous"
      />

      <span className="sr-only">Show previous</span>
    </Button>
  );
};

export const ScrollableNextButton = ({
  variant = "outline",
  size = "icon",
  className,
  ...delegated
}: Omit<ButtonProps, "onClick" | "disabled" | "children">) => {
  const {
    state: { hasNext },
    getNextButtonProps,
  } = useScrollableContext();

  return (
    <Button
      {...delegated}
      {...getNextButtonProps()}
      variant={variant}
      size={size}
      className={cn(
        "absolute inset-y-1/2 right-1 size-8 -translate-y-1/2 rounded-full border-wurth-gray-250 shadow-md",
        !hasNext && "hidden",
        className,
      )}
    >
      <ArrowRight
        width={16}
        height={16}
        data-button-action="Scrollable Show Next"
      />

      <span className="sr-only">Show next</span>
    </Button>
  );
};

export const ScrollableContainer = ({
  children,
  className,
  ...delegated
}: ComponentPropsWithoutRef<"div">) => {
  const { containerRef } = useScrollableContext();

  return (
    <div
      {...delegated}
      ref={containerRef as LegacyRef<HTMLDivElement>}
      className={cn("flex flex-row items-center overflow-x-auto", className)}
    >
      {children}
    </div>
  );
};
