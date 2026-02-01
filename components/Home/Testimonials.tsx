// app/components/testimonials.tsx
 "use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "phosphor-react";

interface Testimonial {
  image: string;
  name: string;
  designation?: string;
  review: string;
  createdAt?: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    image: "/Images/step1.jpg",
    name: "Becky Nelson",
    designation: "Student at University of Oxford",
    review:
      "From they fine john he give of rich he. They age and draw ms like. Improving end distrusts may instantly was household opplouded incommode",
  },
  {
    image: "/Images/step2.jpg",
    name: "Alex Johnson",
    designation: "Student at University of Melbourne",
    review:
      "The guidance and support I received was exceptional. They helped me navigate the complex application process with ease and confidence.",
  },
  {
    image: "/Images/step3.jpg",
    name: "Sarah Chen",
    designation: "Student at University of Toronto",
    review:
      "Outstanding service! The team was professional, responsive, and genuinely cared about my success. Would recommend to anyone!",
  },
];

export default function TestimonialsSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCurrent, setShowCurrent] = useState(true);
  const [waves, setWaves] = useState<Array<{ id: number }>>([]);
  const [isFixed, setIsFixed] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const waveIdRef = useRef(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);

  // Auto-play functionality
  useEffect(() => {
    if (isHovered || isAnimating) return;
    
    autoPlayRef.current = setInterval(() => {
      goToNext();
    }, 3000); // 3 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, isHovered, isAnimating]);

  // Wave animation effect - create double waves
  useEffect(() => {
    const createDoubleWaves = () => {
      // Create first wave
      const wave1 = { id: waveIdRef.current++ };
      setWaves((prev) => [...prev, wave1]);
      
      // Remove first wave after animation completes
      setTimeout(() => {
        setWaves((prev) => prev.filter((w) => w.id !== wave1.id));
      }, 2000);
      
      // Create second wave with slight delay
      setTimeout(() => {
        const wave2 = { id: waveIdRef.current++ };
        setWaves((prev) => [...prev, wave2]);
        
        // Remove second wave after animation completes
        setTimeout(() => {
          setWaves((prev) => prev.filter((w) => w.id !== wave2.id));
        }, 2000);
      }, 400); // 400ms delay between waves
    };

    // Create initial double waves
    createDoubleWaves();
    
    // Create double waves at intervals
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
    
    // Start exit animation
    setShowCurrent(false);
    
    // After exit animation completes, change content and start enter animation
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setShowCurrent(true);
      
      // After enter animation completes, enable interactions
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }, 600);
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

  // fetch testimonials from API
  useEffect(() => {
    let mounted = true;
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (data && Array.isArray(data.data)) {
          setTestimonials(
            data.data.map((d: any) => ({
              image: d.image,
              name: d.name,
              designation: d.designation,
              review: d.review,
              createdAt: d.createdAt,
            }))
          );
        }
      })
      .catch(() => {
        // keep defaults on error
      });
    return () => {
      mounted = false;
    };
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  const panel = (
    <div className="w-full bg-[#FAF3E0] px-4 py-[100px] h-full flex flex-col justify-center">
          {/* Header Section */}
          <div className="text-center mb-6">
            <h2 className="text-[24px] md:text-4xl font-latin text-[#c44200] font-bold mb-4">
              <strong>Real Students , Real Stories</strong> 
            </h2>
            <p className="font-secondary text-[#0d173f] font-medium text-sm  md:text-lg max-w-3xl mx-auto">
              Our success is measured by our students — studying, working, and thriving abroad.
            </p>
          </div>

          {/* Testimonial Swiper Container */}
          <div 
            className="relative w-full  max-w-7xl mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Navigation Buttons */}
            <button
              onClick={goToPrev}
              className="absolute left-0 top-[30%] md:top-[42%] opacity-70 transform -translate-y-1/2 z-30 bg-[#FAF3E0] w-10 h-10 rounded-full shadow-lg flex items-center justify-center border-2 border-[#808080]"
              aria-label="Previous testimonial"
              disabled={isAnimating}
            >
              <ArrowLeft size={22} className="text-[#808080]" weight="bold" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-0 top-[30%] md:top-[42%] opacity-70 transform -translate-y-1/2 z-30 bg-[#FAF3E0] w-10 h-10 rounded-full shadow-lg flex items-center justify-center border-2 border-[#808080]"
              aria-label="Next testimonial"
              disabled={isAnimating}
            >
              <ArrowRight size={22} className="text-[#808080]" weight="bold" />
            </button>

            {/* Testimonial Slide Container */}
            <div className="relative h-[500px] flex items-center justify-center">
              {/* Slide - Either animating out or in */}
              <div 
                className={`absolute w-full h-full md:pt-16 ${
                  showCurrent 
                    ? 'animate-slide-up-enter' 
                    : 'animate-slide-down-exit'
                }`}
              >
                <div className="rounded-2xl p-8 md:px-12 md:py-4">
                  {/* User Image */}
                  <div className="flex justify-center mb-16">
                    <div className="relative w-26 h-26 rounded-full overflow-visible">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        {currentTestimonial.image.startsWith("http") ? (
                          // external images - use img
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={currentTestimonial.image} alt={currentTestimonial.name} className="object-cover rounded-full w-full h-full" />
                        ) : (
                          <Image src={currentTestimonial.image} alt={currentTestimonial.name} fill className="object-cover rounded-full" />
                        )}
                      </div>
                      
                      {/* Wave animations */}
                      {waves.map((wave) => (
                        <div
                          key={wave.id}
                          className="absolute rounded-full border-4 border-[#C44200] animate-wave-ripple pointer-events-none"
                          style={{
                            top: '50%',
                            left: '50%',
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="text-center mb-16">
                    <p className="text-gray-700 text-base  md:text-xl italic font-secondary font-medium leading-relaxed max-w-3xl mx-auto">
                      "{currentTestimonial.review}"
                    </p>
                  </div>

                  {/* User Info */}
                  <div className="text-center">
                    <h3 className="text-[20px] md:text-2xl font-secondary font-medium text-[#C44200] mb-1">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-[#0d173f] text-sm md:text-lg font-medium font-secondary">
                      {currentTestimonial.designation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
          </div>
        </div>
  );

  return (
    <div className="relative bg-[#FAF3E0] z-50">
      <div
        ref={sentinelRef}
        className="absolute left-0 w-px h-px pointer-events-none opacity-0"
        style={{ top: 0 }}
        aria-hidden="true"
      />
      {!isFixed ? (
        <div className="sticky top-0 h-screen bg-[#FAF3E0] z-50 overflow-hidden">{panel}</div>
      ) : (
        <>
          <div className="h-screen" aria-hidden="true" />
          <div className="fixed top-0 left-0 w-full h-screen bg-[#FAF3E0] z-50 overflow-hidden">
            {panel}
          </div>
        </>
      )}
      <div className="h-screen" aria-hidden="true" />

      {/* Add custom animations to global styles */}
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
    </div>
  );
}