"use client"; // Error components must be Client Components

import ServerErrorViewer from "@/_components/server-error-viewer";

const ErrorPage = ({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) => {
  return <ServerErrorViewer error={error} reset={reset} />;
};

export default ErrorPage;
