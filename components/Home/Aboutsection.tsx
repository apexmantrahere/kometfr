"use client";
import { useEffect, useRef, useState } from "react";
import FeatureCard from "./FeatureCard";
import featureCardsData from "./featureCards.json";
import { motion } from "framer-motion";

function AboutContent({ hasAnimated }: { hasAnimated: boolean }) {
  return (
    <div className="flex max-w-[1200px] mx-auto flex-col items-center justify-center h-full  md:py-[40px]">
      <div
        className="flex flex-col items-center justify-center"
       
      >
        <h3 className="text-[20px] md:text-4xl max-w-3xl text-center text-[#0d173f] mb-5 font-latin">
          Why 1000+ Students & Parents Trust{" "} <br />
          <strong className="text-[#c44200]">Komet Study Abroad</strong>
        </h3>
        <p className="text-gray-700 text-sm sm:text-base font-secondary max-w-md px-4 font-medium text-center">
          Choosing to study abroad is a life decision — not a sales decision.
          That&apos;s why students trust us.
        </p>
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-16 sm:mt-8 px-6 lg:px-0 w-full">
        {featureCardsData.slice(0, 3).map((card, index) => (
          <div >
            <FeatureCard
              image={card.image}
              title={card.title}
              description={card.description}
              mediaType={card.mediaType as "image" | "video"}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 lg:mt-8 px-6 lg:px-0 mb-16 sm:mb-0  w-full max-w-[800px] mx-auto">
        {featureCardsData.slice(3, 5).map((card, index) => (
          <div
          >
            <FeatureCard
              image={card.image}
              title={card.title}
              description={card.description}
              mediaType={card.mediaType as "image" | "video"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Aboutsection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) setHasAnimated(true);
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    const check = () => {
      if (!sentinelRef.current) return;
      const { top } = sentinelRef.current.getBoundingClientRect();
      // Fix when section hits top; unfix when scrolled back up (sentinel above viewport)
      setIsFixed(top <= 0);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div className="relative bg-[#FAF3e0] z-10" ref={containerRef}>
      {/* Sentinel at top of About: when it hits viewport top, About becomes fixed */}
      <div
        ref={sentinelRef}
        className="absolute left-0 w-px h-px pointer-events-none opacity-0"
        style={{ top: 0 }}
        aria-hidden="true"
      />

      {!isFixed ? (
        <div className="sticky top-0 h-screen bg-[#FAF3e0] z-10 overflow-hidden">
          <AboutContent hasAnimated={hasAnimated} />
        </div>
      ) : (
        <>
          <div className="h-screen" aria-hidden="true" />
          <div className="fixed top-0 left-0 w-full h-screen bg-[#FAF3e0] z-10 overflow-hidden">
            <AboutContent hasAnimated={hasAnimated} />
          </div>
        </>
      )}

      {/* Scroll spacer so Procedure can scroll over */}
      <div className="h-screen" aria-hidden="true" />
    </div>
  );
}
