"use client";

import { type ComponentProps } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

type ErrorBoundaryProps = ComponentProps<typeof ReactErrorBoundary>;

const ErrorBoundary = (props: ErrorBoundaryProps) => {
  return <ReactErrorBoundary {...props} />;
};

export default ErrorBoundary;
