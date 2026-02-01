"use client";
import Image from "next/image";

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
  mediaType: "image" | "video";
}

export default function FeatureCard({ image, title, description, mediaType }: FeatureCardProps) {
  return (
    <div className="border-1 flex border-dashed border-[#bebebe] rounded-xl w-full py-4 sm:p-2">
      <div className="min-w-[160px] w-[160px] aspect-square hidden lg:block relative rounded-lg overflow-hidden">
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
      <div className="flex flex-col justify-between items-center w-full  px-4 sm:pb-4">
        <h3 className="text-[18px] md:text-[22px] text-[#c44200] text-center sm:text-start font-medium font-latin">{title}</h3>
        <p className="text-gray-700 text-xs md:text-base text-center sm:text-start font-secondary max-w-md font-medium">{description}</p>
      </div>
    </div>
  );
}
