"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FileText, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import type { CertificationCredential } from "@/data/certifications";
import { cn } from "@/lib/utils";

type CertificationModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  issuer?: string;
  credential?: CertificationCredential;
  labels: {
    close: string;
    noCredential: string;
    openExternal: string;
    viewPdf: string;
  };
};

export function CertificationModal({
  open,
  onClose,
  title,
  issuer,
  credential,
  labels,
}: CertificationModalProps) {
  const mountedRef = useRef(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && mountedRef.current) onClose();
    },
    [onClose],
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            aria-label={labels.close}
          />

          <motion.div
            className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl ring-1 ring-primary/[0.06]"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
              <div>
                <h3 id="cert-modal-title" className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
                {issuer && <p className="mt-0.5 text-sm text-foreground-secondary">{issuer}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "shrink-0")}
                aria-label={labels.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              <CredentialPreview credential={credential} labels={labels} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CredentialPreview({
  credential,
  labels,
}: {
  credential?: CertificationCredential;
  labels: CertificationModalProps["labels"];
}) {
  if (!credential?.url) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background-secondary/50 px-6 py-16 text-center">
        <FileText className="mb-3 h-10 w-10 text-foreground-secondary/60" aria-hidden="true" />
        <p className="max-w-sm text-sm text-foreground-secondary">{labels.noCredential}</p>
      </div>
    );
  }

  if (credential.type === "external") {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <a
          href={credential.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "lg" }),
            "transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:shadow-primary/10",
          )}
        >
          <ExternalLink className="h-4 w-4" />
          {labels.openExternal}
        </a>
      </div>
    );
  }

  if (credential.type === "image") {
    return (
      <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-lg border border-border">
        <Image src={credential.url} alt="" fill className="object-contain" sizes="(max-width: 768px) 100vw, 672px" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <iframe
        src={credential.url}
        title={labels.viewPdf}
        className="h-[min(70vh,560px)] w-full rounded-lg border border-border bg-background-secondary"
      />
      <a
        href={credential.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full sm:w-auto")}
      >
        <ExternalLink className="h-4 w-4" />
        {labels.openExternal}
      </a>
    </div>
  );
}
