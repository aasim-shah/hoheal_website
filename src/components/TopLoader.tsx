"use client";
import { useEffect, useState } from "react";
import NextTopLoader from "nextjs-toploader";

const TopLoader = () => {
  const [signatureColor, setSignatureColor] = useState("#2299DD"); // Default color

  useEffect(() => {
    // Access the CSS variable for `--signature`
    const rootStyle = getComputedStyle(document.documentElement);
    const signatureColorValue = rootStyle
      .getPropertyValue("--signature")
      .trim();
    if (signatureColorValue) {
      setSignatureColor(`hsl(${signatureColorValue})`);
    }
  }, []);

  return (
    <NextTopLoader
      color={signatureColor}
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow={`0 0 10px ${signatureColor}, 0 0 5px ${signatureColor}`}
    />
  );
};

export default TopLoader;
