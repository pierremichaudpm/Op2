"use client";
import Image, { type ImageProps } from 'next/image';
import { useState, useMemo } from 'react';

type SmartImageProps = Omit<ImageProps, 'src'> & {
  src: string;
  fallbackWidth?: number;
  fallbackHeight?: number;
  fallbackText?: string;
};

export function SmartImage({
  src,
  alt,
  fallbackWidth = 600,
  fallbackHeight = 400,
  fallbackText = 'Image',
  ...rest
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  const computedSrc = useMemo(() => {
    if (!failed) return src;
    return `https://placehold.co/${fallbackWidth}x${fallbackHeight}?text=${encodeURIComponent(
      fallbackText
    )}`;
  }, [failed, src, fallbackWidth, fallbackHeight, fallbackText]);

  return (
    <Image
      {...rest}
      alt={alt}
      src={computedSrc}
      onError={() => setFailed(true)}
    />
  );
}




