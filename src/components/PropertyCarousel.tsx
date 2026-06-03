"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import useEmblaCarousel from "embla-carousel-react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type PropertyCarouselProps = {
  images: {
    id: string;
    imageUrl: string;
  }[];
};

export default function PropertyCarousel({
  images,
}: PropertyCarouselProps) {
  const [emblaRef, emblaApi] =
    useEmblaCarousel({
      loop: true,
    });

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(
        emblaApi.selectedScrollSnap()
      );
    };

    emblaApi.on("select", onSelect);

    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  if (!images.length) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-xl bg-gray-100">
        Tidak ada gambar
      </div>
    );
  }

  return (
    <div>
      {/* MAIN SLIDER */}
      <div className="relative">
        {/* LEFT ARROW */}
        <button
          type="button"
          onClick={scrollPrev}
          className="
            absolute
            left-4
            top-1/2
            z-20
            -translate-y-1/2
            rounded-full
            bg-white/90
            p-2
            shadow-lg
            backdrop-blur
            transition
            hover:scale-105
          "
        >
          <ChevronLeft size={22} />
        </button>

        {/* RIGHT ARROW */}
        <button
          type="button"
          onClick={scrollNext}
          className="
            absolute
            right-4
            top-1/2
            z-20
            -translate-y-1/2
            rounded-full
            bg-white/90
            p-2
            shadow-lg
            backdrop-blur
            transition
            hover:scale-105
          "
        >
          <ChevronRight size={22} />
        </button>

        {/* COUNTER */}
        <div
          className="
            absolute
            bottom-4
            right-4
            z-20
            rounded-full
            bg-black/70
            px-3
            py-1
            text-sm
            text-white
          "
        >
          {selectedIndex + 1} / {images.length}
        </div>

        {/* EMBLA */}
        <div
          ref={emblaRef}
          className="overflow-hidden rounded-xl"
        >
          <div className="flex">
            {images.map((image) => (
              <div
                key={image.id}
                className="
                  relative
                  min-w-0
                  flex-[0_0_100%]
                "
              >
                <div className="relative h-[500px]">
                  <Image
                    src={image.imageUrl}
                    alt="Property Image"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* THUMBNAILS */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() =>
              emblaApi?.scrollTo(index)
            }
            className={`
              relative
              h-20
              w-28
              shrink-0
              overflow-hidden
              rounded-lg
              border-2
              transition
              ${
                selectedIndex === index
                  ? "border-yellow-500"
                  : "border-transparent"
              }
            `}
          >
            <Image
              src={image.imageUrl}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}