"use client";

import { baseUrl } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClasses?: string;
  w?: number;
  h?: number;
  src: string;
  classNames?: string;
  alt?: string;
}

export default function MyImage(props: Props) {
  const {
    containerClasses = "",
    w = 200,
    h = 200,
    src,
    classNames = "",
    alt = "image",
    ...rest
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const imageSrc =
    error || !src
      ? "/images/placeholder.png"
      : src.startsWith("http")
      ? src
      : baseUrl + src;

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div className={cn("overflow-hidden", containerClasses)}>
      {isLoading && !error && (
        <div className="w-full h-full flex justify-center items-center bg-secondary rounded-md">
          <div className="w-5 h-5 border-4 border-t-transparent border-signature-light border-solid rounded-full animate-spin"></div>
        </div>
      )}

      <Image
        width={w as any}
        height={h as any}
        className={`w-full h-full object-cover ${classNames} ${
          isLoading ? "hidden" : ""
        }`}
        alt={alt}
        src={imageSrc}
        onLoad={handleLoadingComplete}
        onError={handleError}
        {...rest}
      />
    </div>
  );
}
