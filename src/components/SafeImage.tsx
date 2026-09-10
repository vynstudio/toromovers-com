import Image, { type ImageProps } from "next/image";

/**
 * next/Image wrapper that requires an explicit `alt` (including `""` for
 * decorative marks). Prefer this in shared chrome so content images cannot
 * accidentally omit alt.
 */
export type SafeImageProps = Omit<ImageProps, "alt"> & {
  /** Required. Use `""` only for decorative images with aria-hidden ancestors. */
  alt: string;
};

export function SafeImage(props: SafeImageProps) {
  return <Image {...props} />;
}
