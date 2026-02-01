"use client"
import tests from "../../data/tests.json";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "phosphor-react";

export default function TestListingPage() {
  const items = tests.slice(0, 5);

  return (
    <div className="min-h-screen bg-white px-6 md:px-16 py-16 pt-30   md:pt-40">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-latin font-bold text-[#c44200] text-center">
          Test Preparation – Full Training Landing Pages
        </h1>
        <p className="mt-4 text-center text-sm md:text-base text-[#434343]">
          Quality coaching across IELTS, PTE, OET, TOEFL and demo classes.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t: any) => (
            <Link key={t.slug} href={`/test-prep/${t.slug}`} className="block">
              <div className="flex flex-col bg-white    transition">
                <div className="w--full md:w-full h-[260px] relative rounded-lg overflow-hidden">
                  <Image src={t.image} alt={t.title} fill className="object-cover" unoptimized />
                </div>
                <div className="pt-4 flex-1">
                  <h3 className="text-lg font-semibold text-[#0d173f]">{t.title}</h3>
                  <p className="mt-2 text-sm text-[#434343]">{t.subtitle}</p>
                  <div className="mt-4">
                    <button className="rounded-full font-medium text-[#0d173f] hover:text-[#c44200] flex gap-2 text-sm">
                      View Details <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

