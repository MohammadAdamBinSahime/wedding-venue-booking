"use client";

import Image from "next/image";

interface VenueGalleryProps {
  title: string;
  imageSrc: string;
  exterior360?: string | null;
  interior360?: string | null;
}

export default function VenueGallery({
  title,
  imageSrc,
  exterior360,
  interior360,
}: VenueGalleryProps) {
  const panoImage = exterior360 || imageSrc;
  const interiorImage = interior360 || imageSrc;

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-200">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover"
          unoptimized
          priority
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-200">
          <Image
            src={panoImage}
            alt={`${title} 360° outside`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
            unoptimized
          />
          <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
            360° Outside
          </div>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-200">
          <Image
            src={interiorImage}
            alt={`${title} 360° inside`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
            unoptimized
          />
          <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
            360° Inside
          </div>
        </div>
      </div>
    </div>
  );
}
