"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, FacebookLogo, InstagramLogo, LinkedinLogo, YoutubeLogo, CaretDown, CaretUp } from "phosphor-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type MenuItem =
  | { type: "link"; label: string; href: string }
  | { type: "accordion"; title: string; headingHref: string; items: string[] };

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleAccordion = (title: string) => {
    setOpenAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  const locationSlugs: { label: string; slug: string }[] = [
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
  ];
  const testPrepSlugs: { label: string; slug: string }[] = [
    { label: "IELTS Coaching", slug: "ielts" },
    { label: "PTE Coaching", slug: "pte" },
    { label: "OET Coaching", slug: "oet" },
    { label: "TOEFL Coaching", slug: "toefl" },
    { label: "Free Demo Class", slug: "demo" },
  ];
  const serviceTabs: { label: string; tab: string }[] = [
    { label: "Career Counselling", tab: "career" },
    { label: "University Applications", tab: "applications" },
    { label: "Visa Assistance", tab: "visa" },
    { label: "SOP & Documentation", tab: "sop" },
  ];

  const menuItems: MenuItem[] = [
    { type: "link", label: "Home", href: "/" },
    { type: "accordion", title: "Study Locations", headingHref: "/locations", items: locationSlugs.map((x) => x.label) },
    { type: "accordion", title: "Test Preparations", headingHref: "/test-prep", items: testPrepSlugs.map((x) => x.label) },
    { type: "accordion", title: "Services", headingHref: "/services", items: serviceTabs.map((x) => x.label) },
    { type: "link", label: "Success Stories", href: "/stories" },
    { type: "link", label: "Gallery", href: "/gallery" },
    { type: "link", label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[320px] sm:w-[480px] bg-[#0d173f] text-[#FAF3e0] z-[101] transform transition-transform duration-300 ease-in-out overflow-y-auto scrollbar-hide ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between p-6 border-b border-[#FAF3e0]/20">
            <div className="flex items-center gap-3">
              <Image
                src="/Images/Logo/Komet_Logo.svg"
                alt="Komet Logo"
                width={100}
                height={100}
                className="brightness-[40]"
              />
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#FAF3e0]/10 hover:bg-[#c44200] flex items-center justify-center transition-colors"
              aria-label="Close menu"
            >
              <X size={24} weight="bold" />
            </button>
          </div>

          {/* Menu Sections */}
          <div className="flex-1 p-6 space-y-2 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {menuItems.map((item, idx) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="block py-3 text-lg font-latin font-bold text-[#FAF3e0] hover:text-[#c44200] transition-colors border-b border-[#FAF3e0]/10 last:border-b-0"
                  >
                    {item.label}
                  </Link>
                );
              } else {
                const accordionOpen = openAccordions.has(item.title);
                return (
                  <div key={item.title} className="border-b border-[#FAF3e0]/10 last:border-b-0">
                    <div className="w-full flex items-center justify-between py-3">
                      <Link
                        href={item.headingHref}
                        onClick={onClose}
                        className="flex-1 text-lg font-latin font-bold text-[#FAF3e0] hover:text-[#c44200] transition-colors"
                      >
                        {item.title}
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleAccordion(item.title);
                        }}
                        className="shrink-0 p-1 rounded hover:bg-[#FAF3e0]/10 transition-colors"
                        aria-label={accordionOpen ? "Close menu" : "Open menu"}
                      >
                        {accordionOpen ? (
                          <CaretUp size={20} weight="bold" className="text-[#c44200]" />
                        ) : (
                          <CaretDown size={20} weight="bold" className="text-[#FAF3e0]/60" />
                        )}
                      </button>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        accordionOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="space-y-2 pb-4 pl-2">
                        {item.items.map((subItem, itemIdx) => {
                          let href: string;
                          if (item.title === "Study Locations") {
                            href = `/locations/${locationSlugs[itemIdx]?.slug ?? subItem.toLowerCase().replace(/\s+/g, "-")}`;
                          } else if (item.title === "Test Preparations") {
                            href = `/test-prep/${testPrepSlugs[itemIdx]?.slug ?? subItem.toLowerCase().replace(/\s+/g, "-")}`;
                          } else if (item.title === "Services") {
                            href = `/services?tab=${serviceTabs[itemIdx]?.tab ?? "career"}`;
                          } else {
                            href = "#";
                          }
                          return (
                            <li key={itemIdx}>
                              <Link
                                href={href}
                                onClick={onClose}
                                className="text-sm font-secondary text-[#FAF3e0]/80 hover:text-[#c44200] transition-colors block py-1.5"
                              >
                                {subItem}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          {/* Footer with Social Links */}
          <div className="p-6 border-t border-[#FAF3e0]/20">
            <p className="text-sm font-secondary text-[#FAF3e0]/80 leading-relaxed mb-4">
              Your trusted partner for study abroad success.
            </p>
            <div className="flex gap-4">
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
        </div>
      </aside>
    </>
  );
}
