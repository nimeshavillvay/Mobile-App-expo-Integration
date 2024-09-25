"use client";

import { cn } from "@/_lib/utils";
import { Button } from "@/old/_components/ui/button";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

type BackButtonProps = {
  readonly title: string;
  readonly className?: string;
};

const BackButton = ({ title = "Back", className }: BackButtonProps) => {
  const router = useRouter();

  return (
    <>
      {/* Desktop back button */}
      <Button
        variant="ghost"
        className={cn("hidden px-0 text-base text-black md:flex", className)}
        onClick={() => router.back()}
      >
        <FaArrowLeft data-button-action="Order History Web Back Summary" />{" "}
        {title}
      </Button>

      {/* Mobile back button */}
      <Button
        className="h-[2.625rem] w-full justify-start bg-brand-gray-200 font-bold normal-case text-brand-gray-500 md:hidden"
        onClick={() => router.back()}
      >
        <FaArrowLeft data-button-action="Order History Mobile Back Summary" />
        <span data-button-action="Order History Mobile Back Summary">Back</span>
      </Button>
    </>
  );
};

export default BackButton;
