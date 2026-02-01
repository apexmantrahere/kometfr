"use client";

import Image from "next/image";
import PageBanner from "@/components/shared/PageBanner";
import Link from "next/link";
import { ArrowUpRight } from "phosphor-react";

interface Destination {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  flag: string;
}

// slugs match data/countries.json for detail page links
const destinations: Destination[] = [
  { id: 1, name: "UK", slug: "uk", image: "/Images/UK.jpg", description: "1-year Master's, Graduate Route visa", flag: "https://flagcdn.com/gb.svg" },
  { id: 2, name: "Australia", slug: "australia", image: "/Images/aus.jpg", description: "High employability & quality of life", flag: "https://flagcdn.com/au.svg" },
  { id: 3, name: "Canada", slug: "canada", image: "/Images/canada.jpg", description: "PR-friendly pathways", flag: "https://flagcdn.com/ca.svg" },
  { id: 4, name: "Germany", slug: "germany", image: "/Images/germany.jpg", description: "Low or no tuition fees", flag: "https://flagcdn.com/de.svg" },
  { id: 5, name: "Ireland", slug: "ireland", image: "/Images/ire.jpg", description: "Strong tech & pharma job market", flag: "https://flagcdn.com/ie.svg" },
  { id: 6, name: "France", slug: "france", image: "/Images/france.jpg", description: "Business, fashion & hospitality excellence", flag: "https://flagcdn.com/fr.svg" },
  { id: 7, name: "Italy", slug: "italy", image: "/Images/italy.jpg", description: "Affordable education & scholarships", flag: "https://flagcdn.com/it.svg" },
  { id: 8, name: "New Zealand", slug: "new-zealand", image: "/Images/nzl.jpg", description: "Work-life balance & post-study work", flag: "https://flagcdn.com/nz.svg" },
  { id: 9, name: "Dubai", slug: "dubai", image: "/Images/dubai.jpg", description: "International campuses & industry exposure", flag: "https://flagcdn.com/ae.svg" },
  { id: 10, name: "South Korea", slug: "south-korea", image: "/Images/southkorea.jpg", description: "Innovation-driven education & scholarships", flag: "https://flagcdn.com/kr.svg" },
];

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-white">
     
      <div className="bg-white py-10 md:py-20 px-4 md:px-8 pt-40 md:pt-50">
        <div className="max-w-[1200px] mx-auto">
        

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {destinations.map((d) => (
              <div key={d.id}>
                {/* Full image card */}
                <div className="rounded-[12px] overflow-hidden border border-[#0d173f]/15 hover:border-[#0d173f]/40 transition-colors bg-white group">
                  <div className="relative w-full aspect-[9/12]">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      className="object-cover transition-all duration-300 group-hover:blur-[12px]"
                      unoptimized
                    />

                    {/* subtle dark layer so text is readable */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover content (fade + slide up) */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <Link
                      href={`/locations/${d.slug}`}
                      className="relative mb-4 w-18 h-12 rounded-[6px] border-none shadow-lg transition-transform duration-200 hover:scale-105"
                      aria-label={`Explore ${d.name}`}
                      style={{
                        backgroundImage: `url(${d.flag})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <span className="sr-only">Explore more</span>
                    </Link>
                      <h3 className="text-xl md:text-2xl font-latin font-bold text-white drop-shadow">
                        Study in <span className="text-[#FAF3e0]">{d.name}</span>
                      </h3>
                      <p className="mt-3 text-sm md:text-base font-secondary font-medium text-white/95 max-w-[28ch] drop-shadow">
                        {d.description}
                      </p>
                      <Link href={`/locations/${d.slug}`} className="mt-6 text-sm md:text-base font-secondary font-semibold text-white rounded-full border-2 border-white  py-1  px-4  underline-offset-4 drop-shadow">
                        Explore more
                      </Link>
                    </div>

                    {/* Floating button (same as Countries component) */}
                  
                  </div>
                </div>

                {/* Text OUTSIDE the card, below the image */}
                <div className="mt-3 px-1">
                  <h3 className="text-lg font-latin text-center font-bold text-[#C44200]">
                    <strong>{d.name}</strong>
                  </h3>
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

