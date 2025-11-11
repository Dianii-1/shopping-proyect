import Image from "next/image";

interface Props {
  alt: string;
  src?: string;
  height: number;
  width: number;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
}

export const ProductImage = ({ alt, height, width, className, src }: Props) => {
  const customSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";
  return (
    <Image
      alt={alt}
      className={className}
      src={customSrc}
      width={width}
      height={height}
    />
  );
};
