import Image, { StaticImageData } from "next/image";
import React from "react";

interface MyImageProps {
  containerClasses?: string;
  w?: number;
  h?: number;
  src: string | StaticImageData;
  classNames?: string;
  alt?: string;
}

export default function MyImage({
  containerClasses = "",
  w = 500,
  h = 500,
  src = "",
  classNames = "",
  alt = "image",
}: MyImageProps) {
  return (
    <div className={`bg-gray-50 ${containerClasses}`}>
      <Image
        width={w}
        height={h}
        className={`w-full h-full ${classNames}`}
        alt={alt}
        src={src}
      />
    </div>
  );
}
