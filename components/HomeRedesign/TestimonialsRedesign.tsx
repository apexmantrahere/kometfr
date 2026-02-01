"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "phosphor-react";

interface Testimonial {
  id?: string;
  image?: string;
  name: string;
  designation?: string;
  review: string;
  createdAt?: string;
}

export default function TestimonialsRedesign() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCurrent, setShowCurrent] = useState(true);
  const [waves, setWaves] = useState<Array<{ id: number }>>([]);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const waveIdRef = useRef(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (isHovered || isAnimating) return;
    autoPlayRef.current = setInterval(() => {
      goToNext();
    }, 3000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentIndex, isHovered, isAnimating]);

  useEffect(() => {
    const createDoubleWaves = () => {
      const wave1 = { id: waveIdRef.current++ };
      setWaves((prev) => [...prev, wave1]);
      setTimeout(() => {
        setWaves((prev) => prev.filter((w) => w.id !== wave1.id));
      }, 2000);
      setTimeout(() => {
        const wave2 = { id: waveIdRef.current++ };
        setWaves((prev) => [...prev, wave2]);
        setTimeout(() => {
          setWaves((prev) => prev.filter((w) => w.id !== wave2.id));
        }, 2000);
      }, 400);
    };
    createDoubleWaves();
    const waveInterval = setInterval(createDoubleWaves, 2000);
    return () => clearInterval(waveInterval);
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    handleSlideChange(index);
  };

  const goToNext = () => {
    if (isAnimating) return;
    const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    handleSlideChange(newIndex);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    handleSlideChange(newIndex);
  };

  const handleSlideChange = (newIndex: number) => {
    setIsAnimating(true);
    setShowCurrent(false);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setShowCurrent(true);
      setTimeout(() => setIsAnimating(false), 600);
    }, 600);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    let mounted = true;
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setFetched(true);
        if (data?.error) {
          console.error("[Home Testimonials] API error:", data.error);
          return;
        }
        if (data && Array.isArray(data.data)) {
          console.log("[Home Testimonials] Response:", { count: data.data.length, data: data.data });
          setTestimonials(
            data.data.map((d: { id?: string; image?: string; name: string; designation?: string; review: string; createdAt?: string }) => ({
              id: d.id,
              image: d.image,
              name: d.name,
              designation: d.designation,
              review: d.review,
              createdAt: d.createdAt,
            }))
          );
        } else {
          console.log("[Home Testimonials] No data array in response:", data);
        }
      })
      .catch((err) => {
        if (mounted) setFetched(true);
        console.error("[Home Testimonials] Fetch error:", err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  if (!fetched) return null;
  if (!testimonials.length || !currentTestimonial) return null;

  return (
    <section className="relative w-full bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-center">
        <div className="text-center mb-6">
          <h2 className="text-[24px] md:text-4xl font-latin text-[#c44200] font-bold mb-4">
            <strong>Real Students , Real Stories</strong>
          </h2>
          <p className="font-secondary text-[#0d173f] font-medium text-sm md:text-lg max-w-3xl mx-auto">
            Our success is measured by our students — studying, working, and thriving abroad.
          </p>
        </div>

        <div
          className="relative w-full max-w-7xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={goToPrev}
            className="absolute left-0 top-[30%] md:top-[42%] opacity-70 transform -translate-y-1/2 z-30 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center border-2 border-[#808080]"
            aria-label="Previous testimonial"
            disabled={isAnimating}
          >
            <ArrowLeft size={22} className="text-[#808080]" weight="bold" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-[30%] md:top-[42%] opacity-70 transform -translate-y-1/2 z-30 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center border-2 border-[#808080]"
            aria-label="Next testimonial"
            disabled={isAnimating}
          >
            <ArrowRight size={22} className="text-[#808080]" weight="bold" />
          </button>

          <div className="relative h-[500px] flex items-center justify-center">
            <div
              className={`absolute w-full h-full md:pt-16 ${
                showCurrent ? "animate-slide-up-enter" : "animate-slide-down-exit"
              }`}
            >
              <div className="rounded-2xl p-8 md:px-12 md:py-4">
                <div className="flex justify-center mb-16">
                  <div className="relative w-26 h-26 rounded-full overflow-visible">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      {currentTestimonial.image ? (
                        currentTestimonial.image.startsWith("http") ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={currentTestimonial.image}
                            alt={currentTestimonial.name}
                            className="object-cover rounded-full w-full h-full"
                          />
                        ) : (
                          <Image
                            src={currentTestimonial.image}
                            alt={currentTestimonial.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        )
                      ) : (
                        <div className="w-full h-full bg-neutral-200 rounded-full flex items-center justify-center text-neutral-500 text-sm">
                          No image
                        </div>
                      )}
                    </div>
                    {waves.map((wave) => (
                      <div
                        key={wave.id}
                        className="absolute rounded-full border-4 border-[#C44200] animate-wave-ripple pointer-events-none"
                        style={{
                          top: "50%",
                          left: "50%",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-center mb-16">
                  <p className="text-gray-700 text-base md:text-xl italic font-secondary font-medium leading-relaxed max-w-3xl mx-auto">
                    &quot;{currentTestimonial.review}&quot;
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-[20px] md:text-2xl font-latin font-medium text-[#C44200] mb-1">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-[#0d173f] text-sm md:text-lg font-medium font-secondary">
                    {currentTestimonial.designation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideUpEnter {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDownExit {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(40px);
          }
        }
        @keyframes waveRipple {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.2;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
        .animate-slide-up-enter {
          animation: slideUpEnter 0.6s ease-in-out forwards;
        }
        .animate-slide-down-exit {
          animation: slideDownExit 0.6s ease-in-out forwards;
        }
        .animate-wave-ripple {
          animation: waveRipple 2s ease-out infinite;
        }
      `}</style>
    </section>
  );
}
