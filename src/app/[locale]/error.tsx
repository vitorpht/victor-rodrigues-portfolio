"use client";

import { ErrorContent } from "@/components/errors/error-pages";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorContent reset={reset} />;
}
