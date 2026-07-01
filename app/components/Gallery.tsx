"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryProps {
  title: string;
  imageSrc: string;
  exterior360?: string | null;
  interior360?: string | null;
  floorPlan?: string | null;
}

const fallbackImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1478146896981-b80c463bbf33?auto=format&fit=crop&w=600&q=80",
];

export default function Gallery({
  title,
  imageSrc,
  exterior360,
  interior360,
  floorPlan,
}: GalleryProps) {
  const extra = [
    exterior360,
    interior360,
    floorPlan,
    exterior360 ? null : interior360,
  ]
    .filter(Boolean)
    .slice(0, 4);

  const images = [imageSrc, ...extra, ...fallbackImages].filter(
    (src): src is string => Boolean(src)
  ).slice(0, 5);

  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () =>
    setLightbox((i) => (i === null ? 0 : i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setLightbox((i) => (i === null ? 0 : i === images.length - 1 ? 0 : i + 1));

  return (
    <section data-testid="gallery" className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[420px] md:h-[480px]">
        <button
          onClick={() => setLightbox(0)}
          className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group focus:outline-none"
        >
          <Image
            data-testid="gallery-image"
            src={images[0]}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </button>
        {images.slice(1).map((src, idx) => (
          <button
            key={idx}
            onClick={() => setLightbox(idx + 1)}
            className="relative rounded-2xl overflow-hidden group focus:outline-none"
          >
            <Image
              data-testid="gallery-image"
              src={src}
              alt={`${title} ${idx + 2}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close lightbox"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(null);
            }}
            className="absolute top-5 right-5 text-white hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 md:left-8 text-white hover:text-gray-300"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- lightbox needs native img for src dynamics */}
          <img
            src={images[lightbox]}
            alt="Lightbox"
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 md:right-8 text-white hover:text-gray-300"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </section>
  );
}
