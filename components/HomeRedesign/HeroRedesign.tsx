"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "phosphor-react";

const heroSlides = [
  {
    title: "Your Journey to Study Abroad Starts Here",
    description:
      "At Komet Study Abroad, we help students and parents make clear, confident, and correct decisions about international education. No fake promises. No pressure tactics. Just honest guidance that leads to real results.",
    image: "/Images/step3.jpg",
  },
  {
    title: "From First Counselling to Your Dream University",
    description:
      "We guide you through every step — profile assessment, university shortlisting, applications, and visa support. One transparent process, end-to-end, so you can focus on what matters: your future.",
    image: "/Images/step3.jpg",
  },
  {
    title: "Study Abroad with Confidence & Clarity",
    description:
      "Thousands of students have trusted us to find the right country, course, and university. Get personalised counselling, honest advice, and support that puts your goals first.",
    image: "/Images/step3.jpg",
  },
];

export default function HeroRedesign() {
  const [index, setIndex] = useState(0);
  const slide = heroSlides[index];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full   h-screen overflow-hidden bg-white flex flex-col lg:flex-row">
      {/* Left: text (auto-rotating) */}
      <div className="w-full z-50  flex flex-col justify-center px-6 md:px-12 lg:pl-24 h-full ">
        <div className="max-w-2xl h-full flex flex-col justify-center mt-[80px]">
          <h1
            key={`title-${index}`}
            className="font-latin font-semibold text-[#c44200] text-3xl   lg:text-xl xl:text-6xl leading-tight animate-fade-in"
          >
            {slide.title}
          </h1>
          <p
            key={`desc-${index}`}
            className="mt-6 text-base sm:text-lg text-[#fff] font-secondary font-medium leading-relaxed animate-fade-in"
          >
            {slide.description}
          </p>

          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-full mt-10 bg-[#0d173f] font-secondary px-6 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-[#0d173f] hover:border-[#0d173f]"
          >
            Book Free Counselling <ArrowUpRight size={22} weight="bold" />
          </Link>
        </div>
      </div>

      {/* Right: image (changes with slide) */}
      <div className="absolute w-screen h-screen flex items-center justify-center ">
        <div
          className="h-full w-full animate-fade-in"
        >
          <Image
            src='/Images/hero.jpg'
            alt=""
            fill
            className="object-cover  brightness-[0.2]"
            priority
            unoptimized
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes heroFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: heroFadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
