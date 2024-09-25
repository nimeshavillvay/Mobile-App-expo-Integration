"use client"; // Error components must be Client Components

import ServerErrorViewer from "@/_components/server-error-viewer";
import Link from "next/link";

const SearchErrorPage = ({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) => {
  return (
    <ServerErrorViewer
      title="Oops! Something went wrong with your search"
      description={
        <>
          Please try again later or browse our{" "}
          <Link
            href="/category/113/woodworking-and-shop-supplies"
            className="underline"
          >
            categories
          </Link>
        </>
      }
      error={error}
      reset={reset}
    />
  );
};

export default SearchErrorPage;
