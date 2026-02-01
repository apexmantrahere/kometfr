"use client";

import Image from "next/image";
import Link from "next/link";

type CountryItem = {
  country: string;
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
  para1: string;
  para2: string;
  universities?: { src: string; alt: string; title?: string; tagline?: string }[];
  reasons: string[];
};

// Same flag URLs as /locations page (flagcdn.com)
const SLUG_TO_FLAG: Record<string, string> = {
  uk: "https://flagcdn.com/gb.svg",
  australia: "https://flagcdn.com/au.svg",
  canada: "https://flagcdn.com/ca.svg",
  germany: "https://flagcdn.com/de.svg",
  ireland: "https://flagcdn.com/ie.svg",
  france: "https://flagcdn.com/fr.svg",
  italy: "https://flagcdn.com/it.svg",
  "new-zealand": "https://flagcdn.com/nz.svg",
  dubai: "https://flagcdn.com/ae.svg",
  "south-korea": "https://flagcdn.com/kr.svg",
};

export default function CountryClient({
  country,
  allCountries,
  currentSlug,
}: {
  country: CountryItem;
  allCountries: CountryItem[];
  currentSlug: string;
}) {
  const universities = country.universities || [];
  const otherCountries = allCountries.filter((c) => c.slug !== currentSlug);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 md:px-8 pt-10 md:pt-[180px] pb-12 md:pb-14">
        <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-8 md:gap-10">
          {/* Main content — col-8 */}
          <main className="col-span-12 md:col-span-8">
            <h1 className="text-3xl md:text-5xl font-latin font-bold text-[#c44200]">
              <strong>{country.title}</strong>
            </h1>
            <p className="text-sm mt-6 md:text-base font-secondary font-medium text-[#0d173f] leading-relaxed">
              {country.subtitle}
            </p>

            <div className="mt-8 relative w-full aspect-[16/10] max-h-[500px] rounded-[12px] overflow-hidden">
              <Image
                src={country.coverImage}
                alt={country.country}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <p className="text-sm text-justify mt-8 mb-6 md:text-base font-secondary font-medium text-[#434343] leading-relaxed">
              {country.para1}
            </p>
            <p className="text-sm text-justify mb-8 md:text-base font-secondary font-medium text-[#434343] leading-relaxed">
              {country.para2}
            </p>

            {universities.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-latin mb-6 font-bold text-[#c44200]">
                  <strong>Top 10 Universities We Represent in the {country.country}</strong>
                </h2>
                <ol className="list-decimal list-inside space-y-2 text-sm md:text-base font-secondary font-medium text-[#434343]">
                  {universities.map((u, i) => (
                    <li key={u.title ?? i}>{u.title ?? u.tagline ?? u.alt}</li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-12">
              <h2 className="text-2xl font-latin font-bold text-[#c44200] mb-8">
                <strong>Why Choose the {country.country} for Your Studies?</strong>
              </h2>
              <ul className="list-none space-y-3 text-sm md:text-base font-secondary font-medium text-[#434343]">
                {country.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-block rounded-full bg-[#0d173f] text-white px-6 py-2.5 font-semibold font-secondary hover:bg-[#0d173f]/90 transition"
                >
                  Get Free Counselling
                </Link>
              </div>
            </div>
          </main>

          {/* Sidebar — col-4 */}
          <aside className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-24 rounded-lg border border-[#e5e5e5]  p-6 ">
              <h3 className="font-semibold text-[#0d173f] mb-4">Other destinations</h3>
              <ul className="space-y-5">
                {otherCountries.map((c) => {
                  const flagUrl = SLUG_TO_FLAG[c.slug];
                  return (
                    <li key={c.slug}>
                      <Link
                        href={`/locations/${c.slug}`}
                        className="flex items-center gap-3 text-sm md:text-base text-[#434343] hover:text-[#c44200] font-medium transition"
                      >
                        {flagUrl && (
                          <span
                            className="shrink-0 w-14 h-8 rounded-[4px] border border-[#e5e5e5] bg-cover bg-center"
                            style={{ backgroundImage: `url(${flagUrl})` }}
                            aria-hidden
                          />
                        )}
                        <span>{c.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
