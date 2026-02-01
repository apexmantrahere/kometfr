"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Step {
  id: number;
  title: string;
  description: string;
  content: string;
}

const steps: Step[] = [
  { id: 1, title: "Initial Consultation", description: "Understanding your goals and aspirations", content: "We start with a comprehensive consultation to understand your academic goals, preferred destinations, and career aspirations. This helps us create a personalized roadmap for your study abroad journey." },
  { id: 2, title: "Profile Assessment", description: "Evaluating your academic and professional profile", content: "Our experts assess your academic records, test scores, work experience, and extracurricular activities to identify the best-fit universities and programs that align with your profile." },
  { id: 3, title: "University Selection", description: "Curating the perfect university list", content: "Based on your profile and preferences, we help you shortlist universities that match your academic goals, budget, and lifestyle preferences. We ensure you have a balanced mix of dream, target, and safety schools." },
  { id: 4, title: "Application Process", description: "Guiding you through every application step", content: "We assist you with every aspect of the application process - from writing compelling essays and preparing recommendation letters to filling out forms and meeting deadlines. Our team ensures nothing is missed." },
  { id: 5, title: "Visa & Pre-Departure", description: "Final steps to your new adventure", content: "Once accepted, we guide you through the visa application process, help with accommodation arrangements, and provide pre-departure orientation to ensure you're fully prepared for your study abroad experience." },
];

function ProcedurePanel({ activeStep, stepList }: { activeStep: number; stepList: Step[] }) {
  return (
   
   <div className="flex h-full w-full justify-between relative">
      <div className="w-[10%]  md:w-[20%] lg:w-1/2 flex items-center justify-center px-8 sm:px-12 bg-[#FAF3e0]">
        <div className="relative w-full max-w-lg">
          {stepList.map((step, idx) => {
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;
            return (
              <div key={step.id} className="relative flex items-start mb-12 last:mb-0">
                {idx < stepList.length - 1 && (
                  <div
                    className={`absolute left-6 top-12 w-0.5 h-12 sm:h-16 z-0`}
                    style={{
                      borderStyle: "dashed",
                      borderColor: isCompleted ? "#0d173f" : "#BCBCBC",
                      borderLeftWidth: 2,
                    }}
                  />
                )}
                <div className="relative z-10 flex items-start gap-12 md:gap-6">
                  <div className="flex-shrink-0 relative">
                    {isActive && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-[#0d173f]"
                          initial={{ scale: 1, opacity: 0 }}
                          animate={{ scale: [1, 1.6, 1.6], opacity: [0, 0.4, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1], times: [0, 0.5, 1] }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-[#0d173f]"
                          initial={{ scale: 1, opacity: 0 }}
                          animate={{ scale: [1, 1.6, 1.6], opacity: [0, 0.4, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1], times: [0, 0.5, 1], delay: 0.8 }}
                        />
                      </>
                    )}
                    <motion.div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative z-10 ${
                        isActive ? "bg-[#0d173f] border-[#0d173f] shadow-lg" : isCompleted ? "bg-[#0d173f] border-[#0d173f]" : "bg-transparent border-[#BCBCBC]"
                      }`}
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isCompleted ? (
                        <svg className="w-6 h-6 text-[#FAF3e0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className={`text-sm font-bold transition-colors duration-300 ${isActive ? "text-[#FAF3e0]" : "text-[#808080]"}`}>
                          {step.id}
                        </span>
                      )}
                    </motion.div>
                  </div>
                  <div className="hidden lg:flex flex-col pt-1">
                    <h3 className={`text-xl font-latin font-bold transition-colors duration-300 mb-2 ${isActive || isCompleted ? "text-[#c44200]" : "text-[#ACACAC]"}`}>
                      <strong>{step.title}</strong>
                    </h3>
                    <p className={`text-base font-secondary font-medium transition-colors duration-300 ${isActive || isCompleted ? "text-[#0d173f]/70" : "text-[#aCaCaC]"}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-[80%] lg:w-1/2 relative">
        {stepList.map((step) => (
          <div
            key={step.id}
            className="absolute inset-0 flex items-center justify-center px-12 transition-opacity duration-300"
            style={{ opacity: activeStep === step.id ? 1 : 0, pointerEvents: activeStep === step.id ? "auto" : "none" }}
          >
            <div className="max-w-2xl">
              <div className="mb-6">
                <span className="text-sm font-secondary text-[#0d173f]/80 font-medium">
                  Step {step.id} of {stepList.length}
                </span>
              </div>
              <div className="h-[140px] md:h-[240px] w-[240px] md:w-[400px] relative rounded-lg overflow-hidden mb-6">
                <Image
                  src={`/Images/step${step.id}.jpg`}
                  alt={step.title}
                  height={100}
                  width={400}
                  className="object-cover w-full"
                  unoptimized
                />
              </div>
              <h2 className="text-[24px] sm:text-[28px] md:text-5xl font-latin font-bold text-[#c44200] mb-6">
                <strong>{step.title}</strong>
              </h2>
              <p className="text-sm md:text-lg font-secondary font-medium text-[#0d173f]/80 leading-relaxed">
                {step.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Proceduresection() {
  const [activeStep, setActiveStep] = useState(1);
  const [isFixed, setIsFixed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const progress = Math.min(Math.max(0, -top / height), 1);
      const stepIdx = Math.floor(progress * steps.length);
      const current = Math.max(1, Math.min(steps.length, stepIdx + 1));
      setActiveStep(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

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

  const totalHeight = steps.length * 100;
  return (
    <div
      ref={containerRef}
      className="relative bg-[#FAF3e0] z-20"
      style={{ minHeight: `${totalHeight}vh` }}
    >
      <div ref={sentinelRef} className="absolute left-0 w-px h-px pointer-events-none opacity-0" style={{ top: 0 }} aria-hidden="true" />

      {!isFixed ? (
        <>
          <div className="sticky top-0 h-screen bg-[#FAF3e0] z-20 overflow-hidden">
            <ProcedurePanel activeStep={activeStep} stepList={steps} />
          </div>
          {Array.from({ length: steps.length - 1 }).map((_, i) => (
            <div key={i} className="h-screen" aria-hidden="true" />
          ))}
        </>
      ) : (
        <>
          <div className="h-screen" aria-hidden="true" />
          {Array.from({ length: steps.length - 1 }).map((_, i) => (
            <div key={i} className="h-screen" aria-hidden="true" />
          ))}
          <div className="fixed top-0 left-0 w-full h-screen bg-[#FAF3e0] z-20 overflow-hidden">
            <ProcedurePanel activeStep={activeStep} stepList={steps} />
          </div>
        </>
      )}

      <div className="h-screen" aria-hidden="true" />
    </div>
  );
}
