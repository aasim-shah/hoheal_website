"use client";

import { baseUrl } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import MyCard from "./MyCard";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClasses?: string;
  w?: number;
  h?: number;
  src: string;
  classNames?: string;
  alt?: string;
}

export default function MyImage(props: Props) {
  const placeHolderImage = "/images/placeholder.png";
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

  const imageSrc = !src
    ? placeHolderImage
    : src.startsWith("http")
    ? src
    : baseUrl + src;

  const [image, setImage] = useState(imageSrc);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setImage(placeHolderImage);
  };

  return (
    <div className={cn("overflow-hidden", containerClasses)}>
      {isLoading && (
        <MyCard className="w-full h-full flex justify-center items-center border-b">
          <div className="w-5 h-5 border-4 border-t-transparent border-signature-light border-solid rounded-full animate-spin"></div>
        </MyCard>
      )}

      <Image
        key={src}
        width={w as any}
        height={h as any}
        className={`w-full h-full object-cover ${classNames}`}
        src={image}
        alt={alt}
        onLoad={handleLoadingComplete}
        onError={handleError}
        {...rest}
      />
    </div>
  );
}
