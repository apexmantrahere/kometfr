"use client";

import Link from "next/link";
import Image from "next/image";
import { FacebookLogo, InstagramLogo, LinkedinLogo, YoutubeLogo, Phone, EnvelopeSimple, MapPin } from "phosphor-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0d173f] text-[#FAF3e0] py-16 px-8 md:px-12 z-[70]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-12 mb-18">
          {/* Left: Logo, Text, Social */}
          <div className="md:col-span-2">
            <div className="mb-6 max-w-[84%] sm:pl-6">
              {/* Logo - replace with your actual logo */}
              <div className="text-2xl font-latin font-bold text-[#c44200] mb-2">
               <Image src="/Images/Logo/Komet_Logo.svg" alt="logo" className="brightness-[40]" width={120} height={120} />
              </div>
              <div className="space-y-3 text-sm font-secondary text-[#FAF3e0]/80 leading-relaxed">
                <a href="tel:9644777267" className="flex items-center gap-2 hover:text-[#c44200] transition-colors">
 
                  96447 77267
                </a>
                <a href="mailto:support@edukomet.com" className="flex items-center gap-2 hover:text-[#c44200] transition-colors">
                 
                  support@edukomet.com
                </a>
                <p className="flex items-start gap-2">
                
                  <span>2122, Street Number 5, near State Bank of India, Geetanjali Colony, Shankar Nagar, Raipur, Chhattisgarh 492001</span>
                </p>
              </div>
            </div>
            <div className="flex gap-4 sm:pl-6 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF3e0]/10 hover:bg-[#c44200] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookLogo size={20} weight="fill" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF3e0]/10 hover:bg-[#c44200] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramLogo size={20} weight="fill" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF3e0]/10 hover:bg-[#c44200] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={20} weight="fill" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF3e0]/10 hover:bg-[#c44200] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <YoutubeLogo size={20} weight="fill" />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-latin font-bold text-[#c44200] mb-4">
              <strong>Links</strong>
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Success Stories", href: "/stories" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-secondary text-[#FAF3e0]/80 hover:text-[#c44200] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Study Abroad Column */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-latin font-bold text-[#c44200] mb-4">
              <Link href="/locations" className="hover:underline">
                <strong>Study Locations</strong>
              </Link>
            </h3>
            <ul className="space-y-2">
              {[
                { label: "UK", slug: "uk" },
                { label: "Australia", slug: "australia" },
                { label: "Canada", slug: "canada" },
                { label: "Germany", slug: "germany" },
                { label: "Ireland", slug: "ireland" },
                { label: "France", slug: "france" },
                { label: "Italy", slug: "italy" },
                { label: "New Zealand", slug: "new-zealand" },
                { label: "Dubai", slug: "dubai" },
                { label: "South Korea", slug: "south-korea" },
              ].map(({ label, slug }) => (
                <li key={slug}>
                  <Link
                    href={`/locations/${slug}`}
                    className="text-sm font-secondary text-[#FAF3e0]/80 hover:text-[#c44200] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Test Preparation Column */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-latin font-bold text-[#c44200] mb-4">
              <Link href="/test-prep" className="hover:underline">
                <strong>Test Preparations</strong>
              </Link>
            </h3>
            <ul className="space-y-2">
              {[
                { label: "IELTS Coaching", slug: "ielts" },
                { label: "PTE Coaching", slug: "pte" },
                { label: "OET Coaching", slug: "oet" },
                { label: "TOEFL Coaching", slug: "toefl" },
                { label: "Free Demo Class", slug: "demo" },
              ].map(({ label, slug }) => (
                <li key={slug}>
                  <Link
                    href={`/test-prep/${slug}`}
                    className="text-sm font-secondary text-[#FAF3e0]/80 hover:text-[#c44200] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-latin font-bold text-[#c44200] mb-4">
              <Link href="/services" className="hover:underline">
                <strong>Services</strong>
              </Link>
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Career Counselling", tab: "career" },
                { label: "University Applications", tab: "applications" },
                { label: "Visa Assistance", tab: "visa" },
                { label: "SOP & Documentation", tab: "sop" },
              ].map(({ label, tab }) => (
                <li key={tab}>
                  <Link
                    href={`/services?tab=${tab}`}
                    className="text-sm font-secondary text-[#FAF3e0]/80 hover:text-[#c44200] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#FAF3e0]/20 pt-8 mt-8">
          <p className="text-sm font-secondary text-[#FAF3e0]/60 text-center">
            © {new Date().getFullYear()} Komet Study Abroad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
