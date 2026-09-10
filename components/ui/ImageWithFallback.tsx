"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

type ImageWithFallbackProps = Omit<ImageProps, "src" | "onError"> & {
  src?: string | null;
};

export default function ImageWithFallback({ src, alt, ...rest }: ImageWithFallbackProps) {
  const initialSrc = src && !src.startsWith("/uploads/") ? src : PLACEHOLDER_IMAGE;
  const [currentSrc, setCurrentSrc] = useState(initialSrc || PLACEHOLDER_IMAGE);

  return (
    <Image
      {...rest}
      alt={alt}
      src={currentSrc}
      onError={() => setCurrentSrc(PLACEHOLDER_IMAGE)}
    />
  );
}
