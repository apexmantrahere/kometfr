"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import GalleryPopup from "@/components/shared/GalleryPopup";

type GalleryApiItem = {
  id: string;
  media_type: string;
  media_url: string;
  createdAt?: string;
};

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryApiItem[] | null>(null);
  const [fetched, setFetched] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupIndex, setPopupIndex] = useState(0);

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

  const mediaItems = displayItems.map((item) => ({
    type: (item.media_type === "video" ? "video" : "image") as "image" | "video",
    src: item.media_url,
    alt: "Gallery",
  }));

  const openPopup = (index: number) => {
    setPopupIndex(index);
    setPopupOpen(true);
  };

  const onClose = useCallback(() => setPopupOpen(false), []);
  const onNext = useCallback(() => {
    setPopupIndex((i) => (i + 1) % mediaItems.length);
  }, [mediaItems.length]);
  const onPrev = useCallback(() => {
    setPopupIndex((i) => (i - 1 + mediaItems.length) % mediaItems.length);
  }, [mediaItems.length]);

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 md:py-24 pt-30 md:pt-50 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          {fetched && displayItems.length === 0 ? (
            <p className="text-center text-neutral-500 py-12">No gallery items yet.</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2">
              {displayItems.map((item, index) => {
                const src = item.media_url;
                const mediaType = item.media_type;
                const key = item.id;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => openPopup(index)}
                    className="aspect-square relative overflow-hidden rounded-[8px] group cursor-pointer w-full border-0 p-0 bg-transparent text-left"
                  >
                    {mediaType === "video" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <video src={src} className="object-cover w-full h-full" controls onClick={(e) => e.stopPropagation()} />
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
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <GalleryPopup
        mediaItems={mediaItems}
        isOpen={popupOpen}
        currentIndex={popupIndex}
        onClose={onClose}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  );
}
