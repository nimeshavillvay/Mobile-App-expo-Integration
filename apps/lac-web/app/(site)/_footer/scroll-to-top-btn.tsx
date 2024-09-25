"use client";

import { ArrowPathUp } from "@repo/web-ui/components/icons/arrow-path-up";
import { Button } from "@repo/web-ui/components/ui/button";

const ScrollToTopBtn = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Button
      variant="subtle"
      className="w-full font-bold md:w-fit"
      onClick={scrollToTop}
    >
      <ArrowPathUp className="size-4" data-button-action="Scroll Back to top" />

      <span data-button-action="Scroll Back to top">Back to top</span>
    </Button>
  );
};

export default ScrollToTopBtn;
