import Image from "next/image";
import React from "react";

export default function MyImage({
  containerClasses,
  w = 500,
  h = 500,
  src,
  classNames,
  alt = "image",
}) {
  return (
    <div className={`rounded-full  bg-blue-300 ${containerClasses}`}>
      <Image
        width={w}
        height={h}
        className={`w-full  h-full ${classNames}`}
        alt={alt}
        src={src}
      />
    </div>
  );
}