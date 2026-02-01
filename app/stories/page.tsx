 "use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PageBanner from "@/components/shared/PageBanner";

type Testimonial = {
  id?: string;
  image: string;
  name: string;
  designation?: string;
  review: string;
  createdAt?: string;
};

export default function StoriesPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setFetched(true);
        if (data?.error) {
          console.error("[Stories Page] API error:", data.error);
          return;
        }
        if (data && Array.isArray(data.data)) {
          console.log("[Stories Page] Response:", { count: data.data.length, data: data.data });
          setTestimonials(
            data.data.map((d: { id?: string; image?: string; name: string; designation?: string; review: string; createdAt?: string }) => ({
              id: d.id,
              image: d.image ?? "",
              name: d.name,
              designation: d.designation,
              review: d.review,
              createdAt: d.createdAt,
            }))
          );
        } else {
          console.log("[Stories Page] No data array in response:", data);
        }
      })
      .catch((err) => {
        if (mounted) setFetched(true);
        console.error("[Stories Page] Fetch error:", err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {fetched && testimonials.length > 0 && (
        <div className="py-10 md:py-24 px-4 md:px-8 pt-40 md:pt-50">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-24">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={testimonial.id ?? idx}
                  className="p-8 rounded-[24px] relative flex flex-col items-center justify-center border-1 border-[#0d173f] bg-[#EFE2CB]/50 shadow-[0px_0px_12px_4px_#cecece] transition-all overflow-hidden"
                >
                <Image
                  src="/Images/quotes.png"
                  alt="quote"
                  height={120}
                  width={120}
                  className="absolute top-20 opacity-4 -left-15 h-[400px] w-[400px] object-cover"
                  unoptimized
                />

                <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden my-4">
                  {testimonial.image && testimonial.image.startsWith("http") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={testimonial.image} alt={testimonial.name} className="object-cover w-full h-full" />
                  ) : (
                    <Image src={testimonial.image || "/Images/step1.jpg"} alt={testimonial.name} fill className="object-cover" unoptimized />
                  )}
                </div>

                <p className="text-base font-secondary font-medium text-[#0d173f] text-center my-4 leading-relaxed">
                  {testimonial.review}
                </p>
                <h3 className="text-lg font-latin font-bold text-[#c44200] mb-2">
                  <strong>{testimonial.name}</strong>
                </h3>
                <p className="text-sm font-secondary font-medium text-gray-500 mb-3 text-center">
                  {testimonial.designation}
                </p>
              </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
