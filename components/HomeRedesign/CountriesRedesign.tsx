
// app/components/countries.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "phosphor-react";

interface Destination {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
}

const destinations: Destination[] = [
  { id: 1, name: "UK", slug: "uk", image: "/Images/UK.jpg", description: "1-year Master's, Graduate Route visa" },
  { id: 2, name: "Australia", slug: "australia", image: "/Images/aus.jpg", description: "High employability & quality of life" },
  { id: 3, name: "Canada", slug: "canada", image: "/Images/canada.jpg", description: "PR-friendly pathways" },
  { id: 4, name: "Germany", slug: "germany", image: "/Images/germany.jpg", description: "Low or no tuition fees" },
  { id: 5, name: "Ireland", slug: "ireland", image: "/Images/ire.jpg", description: "Strong tech & pharma job market" },
  { id: 6, name: "France", slug: "france", image: "/Images/france.jpg", description: "Business, fashion & hospitality excellence" },
  { id: 7, name: "Italy", slug: "italy", image: "/Images/italy.jpg", description: "Affordable education & scholarships" },
  { id: 8, name: "New Zealand", slug: "new-zealand", image: "/Images/nzl.jpg", description: "Work-life balance & post-study work" },
  { id: 9, name: "Dubai", slug: "dubai", image: "/Images/dubai.jpg", description: "International campuses & industry exposure" },
  { id: 10, name: "South Korea", slug: "south-korea", image: "/Images/southkorea.jpg", description: "Innovation-driven education & scholarships" },
];

export default function CountriesSwiper() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [visibleItems, setVisibleItems] = useState<Destination[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items: Destination[] = [];
    const totalItems = destinations.length;
    
    for (let i = -2; i <= 2; i++) {
      let index = currentIndex + i;
      
      if (index < 0) {
        index = totalItems + index;
      } else if (index >= totalItems) {
        index = index - totalItems;
      }
      
      items.push(destinations[index]);
    }
    
    setVisibleItems(items);
  }, [currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (isHovered) return; // Pause on hover
    
    autoPlayRef.current = setInterval(() => {
      goToNext();
    }, 2500); // 2.5 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, isHovered]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const check = () => {
      if (!sentinelRef.current) return;
      const { top } = sentinelRef.current.getBoundingClientRect();
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

  const currentDestination = destinations[currentIndex];

  const panel = (
    <div className="w-full bg-white px-4 py-10 md:py-14 h-full flex flex-col justify-center">
          <div className="text-center mb-8">
            <h3 className="text-[24px] md:text-4xl font-latin text-[#c44200] font-bold mb-4">
              <strong>Popular Study Abroad Destinations</strong>
            </h3>
            <p className="font-secondary font-medium text-[#0d173f] text-  sm:text-lg max-w-5xl mx-auto">
              We help you choose more than a country — we help you choose a future full of opportunities.
            </p>
          </div>

          {/* Swiper Container - Tight layout */}
          <div 
            className="relative max-w-[1290px] w-full mx-auto h-[450px] flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Navigation Buttons */}
            <button
              onClick={goToPrev}
              className="absolute left-0 z-50 bg-[#fff] w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors border-2 border-[#808080] hover:bg-[#fff]"
              aria-label="Previous destination"
              type="button"
            >
              <ArrowLeft size={24} className="text-[#808080]" weight="bold" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-0 z-50 bg-[#fff] w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors border-2 border-[#808080] hover:bg-[#fff]"
              aria-label="Next destination"
              type="button"
            >
              <ArrowRight size={24} className="text-[#808080]" weight="bold" />
            </button>

            {/* Slides - Minimal gap between cards */}
            <div className="flex items-center justify-center h-full w-full ">
              {visibleItems.map((destination, idx) => {
                const position = idx - 2;
                const isCenter = position === 0;
                
                // Reduced scaling difference
                const scale = isCenter ? 1 : 1 - Math.abs(position) * 0.08;
                
                // Minimal gap - just 55px between centers
                const translateX = position * 250;
                
                const zIndex = isCenter ? 30 : 20 - Math.abs(position) * 5;

                return (
                  <div
                    key={destination.id}
                    className="absolute transition-all duration-500 ease-out"
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      zIndex: zIndex,
                    }}
                    onClick={() => {
                      if (!isCenter) {
                        const newIndex = (currentIndex + position) % destinations.length;
                        if (newIndex < 0) {
                          goToSlide(destinations.length + newIndex);
                        } else {
                          goToSlide(newIndex);
                        }
                      }
                    }}
                  >
                    <div className={`relative rounded-lg overflow-hidden h-[420px] w-[300px] shadow-md ${!isCenter ? "cursor-pointer opacity-40 grayscale-[1]" : ""}`}>
                      {/* Image Section */}
                      <Image  
                        src={destination.image} 
                        alt={destination.name} 
                        fill  
                        className="object-cover rounded-[12px] shadow-[0px_0px_22px_12px_#FAF3e0]"   
                      /> 
                      <Link
                        href={`/locations/${destination.slug}`}
                        className="absolute bottom-8 right-8 p-3 rounded-full bg-[#C44200] hover:bg-[#a33600] transition-colors"
                        aria-label={`Explore ${destination.name}`}
                      >
                        <ArrowUpRight size={24} weight="bold" color="white" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-1.5">
            {destinations.map((destination, idx) => (
              <button
                key={destination.id}
                onClick={() => goToSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  idx === currentIndex ? "bg-[#c44200]" : "bg-[#b3b3b3] hover:bg-[#a3a3a3]"
                }`}
                aria-label={`Go to ${destination.name}`}
              />
            ))}
          </div>

          {/* Current Destination Info */}
          <div className="text-center mt-6">
            <h3 className="text-[22px] font-medium font-secondary text-[#0d173f]">
              Study In <span className="text-[#C44200] font-latin font-medium">{currentDestination.name}</span>
            </h3>
            <p className="font-secondary text-[#0d173f] font-medium text-sm mt-0.5">
              {currentDestination.description}
            </p>
          </div>
        </div>
  );

  return (
    <div className="relative bg-white overflow-hidden z-40">
      
      
            {panel}
         
   
    </div>
  );
}