import type { CSSProperties, ImgHTMLAttributes } from "react";

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: string;
  unoptimized?: boolean;
  blurDataURL?: string;
};

/**
 * Runtime stand-in for next/image. Serves the original public file (same alt,
 * same src path) instead of a /_next/image proxy.
 */
export default function Image({
  src,
  alt,
  fill,
  priority,
  quality: _quality,
  placeholder: _placeholder,
  unoptimized: _unoptimized,
  blurDataURL: _blur,
  style,
  className,
  loading,
  ...rest
}: ImageProps) {
  const fillStyle: CSSProperties = fill
    ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        inset: 0,
        color: "transparent",
      }
    : { color: "transparent" };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : (loading ?? "lazy")}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      style={{ ...fillStyle, ...style }}
      {...rest}
    />
  );
}
