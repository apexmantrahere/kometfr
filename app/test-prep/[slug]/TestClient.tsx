"use client";

import Image from "next/image";
import Link from "next/link";

type TestItem = {
  title: string;
  slug: string;
  subtitle: string;
  image?: string;
  leftImage?: string;
  description: string;
  whyChoose: string[];
  whoIsThisFor: string[];
  trainingIncludes?: string[];
  cta: string;
};

export default function TestClient({
  test,
  allTests,
  currentSlug,
}: {
  test: TestItem;
  allTests: TestItem[];
  currentSlug: string;
}) {
  const otherTests = allTests.filter((t) => t.slug !== currentSlug);

  return (
    <div className="min-h-screen bg-white px-6 md:px-16 py-16 pt-30 md:pt-40">
      <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-8 md:gap-10">
        {/* Main content — col-8 */}
        <main className="col-span-12 md:col-span-8">
          <h1 className="text-3xl md:text-4xl font-latin font-semibold text-[#c44200]">
            {test.title}
          </h1>
          <p className="mt-4 text-sm md:text-base text-[#434343]">
            {test.subtitle}
          </p>

          <div className="mt-8 w-full aspect-video md:max-h-full relative rounded-lg overflow-hidden">
            <Image
              src={test.leftImage ?? test.image ?? "/Images/exam1.jpg"}
              alt={test.title}
              fill
              
              className="object-cover"
              unoptimized
            />
          </div>

          <p className="mt-8 text-sm md:text-base text-[#434343] leading-relaxed">
            {test.description}
          </p>

          <h3 className="mt-6 font-semibold text-[#0d173f]">
            Why Choose Our {test.title}?
          </h3>
          <ul className="list-disc pl-6 mt-2 text-[#434343] space-y-1">
            {test.whyChoose.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>

          <h3 className="mt-6 font-semibold text-[#0d173f]">Who Is This For?</h3>
          <ul className="list-disc pl-6 mt-2 text-[#434343] space-y-1">
            {test.whoIsThisFor.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>

          {test.trainingIncludes && test.trainingIncludes.length > 0 && (
            <>
              <h3 className="mt-6 font-semibold text-[#0d173f]">Training Includes</h3>
              <ul className="list-disc pl-6 mt-2 text-[#434343] space-y-1">
                {test.trainingIncludes.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-8">
            <button
              onClick={() => (window.location.href = "/contact")}
              className="rounded-full bg-[#0d173f] text-white px-6 py-2 font-semibold"
            >
              {test.cta}
            </button>
          </div>
        </main>

        {/* Sidebar — col-4 */}
        <aside className="col-span-12 md:col-span-4">
          <div className="md:sticky md:top-28 rounded-lg border border-[#e5e5e5] p-6 bg-white">
            <h3 className="font-semibold text-[#0d173f] mb-4">Other Tests</h3>
            <ul className="space-y-6">
              {otherTests.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/test-prep/${t.slug}`}
                    className="block flex items-center gap-4 text-sm md:text-base text-[#434343] hover:text-[#c44200] font-medium transition"
                  >
                    <Image src={t.image ?? ""} className="h-[80px] w-[120px] rounded-lg object-cover" alt="image" height={80} width={160} unoptimized />
                    <div className="flex flex-col gap-1">
                    <p className="font-semibold text-[#0d173f]">{t.title}</p>
                   <p className="line-clamp-2 text-sm">{t.subtitle}</p> 
                      </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
