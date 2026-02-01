"use client";

import FeatureCardRedesign from "./FeatureCardRedesign";
import featureCardsData from "../Home/featureCards.json";
import FeatureCard from "../Home/FeatureCard";
export default function AboutRedesign() {
  return (
    <section className="relative w-full bg-white py-16 md:py-24 px-4 md:px-8">
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
    </section>
  );
}
