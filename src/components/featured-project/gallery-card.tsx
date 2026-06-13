"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type GalleryCardProps = {
  title: string;
  image: string;
};

export function GalleryCard({ title, image }: GalleryCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  if (failed) return null;

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card card-hover">
      <div className="relative aspect-video bg-background-secondary">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
          sizes="(max-width: 768px) 100vw, 33vw"
          onLoad={() => {
            if (mountedRef.current) setLoaded(true);
          }}
          onError={() => {
            if (mountedRef.current) setFailed(true);
          }}
        />
      </div>
      <div className="border-t border-border px-4 py-3">
        <p className="text-sm font-medium text-foreground">{title}</p>
      </div>
    </div>
  );
}
