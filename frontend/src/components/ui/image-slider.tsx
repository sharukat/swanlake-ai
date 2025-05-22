"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useCallback, useEffect, useState } from "react";

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
}: {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  // Track when the first image is fully loaded to show the slider
  useEffect(() => {
    if (images.length > 0) {
      // Use a DOM-based approach that's compatible with TypeScript
      const img = document.createElement("img");
      img.src = images[0];
      img.onload = () => setImagesReady(true);
    }
  }, [images]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // autoplay
    let interval: NodeJS.Timeout;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 30000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [autoplay, handleNext, handlePrevious]);

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Preload images */}
      <div className="hidden">
        {images.map((src, index) => (
          <Image
            key={`preload-${index}`}
            src={src}
            alt={`Preloaded image ${index}`}
            width={1}
            height={1}
            priority={index === (currentIndex + 1) % images.length}
            unoptimized
            onLoad={() => {
              if (index === 0 && !imagesReady) {
                setImagesReady(true);
              }
            }}
          />
        ))}
      </div>

      {imagesReady && children}
      {imagesReady && overlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)}
        />
      )}

      {imagesReady && (
        <div className="absolute inset-0 h-full w-full">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentIndex === index ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full"
              style={{ zIndex: currentIndex === index ? 2 : 1 }}
            >
              <Image
                src={src}
                alt={`Slide ${index}`}
                fill
                quality={90}
                className="object-cover object-center"
                sizes="100vw"
                unoptimized
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
