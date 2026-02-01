"use client";

import Image from "next/image";

interface FeatureCardRedesignProps {
  image: string;
  title: string;
  description: string;
  mediaType: "image" | "video";
}

export default function FeatureCardRedesign({ image, title, description, mediaType }: FeatureCardRedesignProps) {
  return (
    <div className="relative rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="aspect-video w-full relative rounded-lg overflow-hidden bg-neutral-100 mb-4">
        {mediaType === "video" ? (
          <video
            src={image}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image src={image} alt={title} fill className="object-cover" unoptimized />
        )}
      </div>
      <h3 className="text-lg font-semibold text-[#0d173f] font-latin">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600 font-secondary">{description}</p>
    </div>
  );
}
