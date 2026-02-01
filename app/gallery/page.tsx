"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryApiItem = {
  id: string;
  media_type: string;
  media_url: string;
  createdAt?: string;
};



export default function GalleryPage() {
  const [items, setItems] = useState<GalleryApiItem[] | null>(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setFetched(true);
        if (data?.error) return;
        if (data && Array.isArray(data.data)) {
          setItems(data.data);
        }
      })
      .catch(() => {
        if (mounted) setFetched(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const displayItems = items ?? [];

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 md:py-24 pt-30 md:pt-50 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          {fetched && displayItems.length === 0 ? (
            <p className="text-center text-neutral-500 py-12">No gallery items yet.</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2">
              {displayItems.map((item) => {
                const src = item.media_url;
                const mediaType = item.media_type;
                const key = item.id;
                return (
                  <div
                    key={key}
                    className="aspect-square relative overflow-hidden rounded-[8px] group cursor-pointer"
                  >
                    {mediaType === "video" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <video src={src} className="object-cover w-full h-full" controls />
                    ) : src.startsWith("http") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={src}
                        alt="Gallery"
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <Image
                        src={src}
                        alt="Gallery"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        unoptimized
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
