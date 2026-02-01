"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const tabs = [
  { id: "career", title: "Career Counselling" },
  { id: "applications", title: "University Applications" },
  { id: "visa", title: "Visa Assistance" },
  { id: "sop", title: "SOP & Documentation" },
];

const validTabIds = new Set(tabs.map((t) => t.id));

export default function ServicesClient({ initialTab }: { initialTab?: string }) {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const resolvedInitial = validTabIds.has(tabFromUrl ?? "") ? tabFromUrl! : validTabIds.has(initialTab ?? "") ? initialTab! : "career";
  const [active, setActive] = useState(resolvedInitial);

  useEffect(() => {
    const t = searchParams.get("tab");
    if (t && validTabIds.has(t)) setActive(t);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white px-6 md:px-16 py-16 pt-40 md:pt-50">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-latin font-bold text-[#c22400] text-center">
          One Expert Team. One Transparent Process. Complete Peace of Mind.
        </h1>
        <p className="mt-6 text-center text-sm md:text-base font-secondary text-[#434343] leading-relaxed">
          At Komet Study Abroad, our services are designed to remove confusion, reduce risk, and help
          students and parents make confident, informed decisions.
        </p>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex items-center  justify-start md:justify-center overflow-x-auto scroll-smooth gap-0 w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`shrink-0 px-4 md:px-6 py-3 border-b-2 md:flex-1 font-semibold whitespace-nowrap ${
                  active === t.id
                    ? "border-[#c44200] text-[#c44200]"
                    : "text-[#0d173f] border-gray-200 hover:bg-[#e9e9e9]/30"
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-4 bg-white  rounded-lg p-0 md:p-10 ">
            {active === "career" && (
              <section className="flex w-full flex-col md:flex-row">
<div className="w-full md:w-1/2 px-2 md:pr-10">

  <Image src='/Images/career.png' unoptimized className="w-full h-auto max-h-[600px] object-cover rounded-[8px]"  alt='img' height={100} width={100} />
</div>
                <div className="w-full md:w-1/2 py-4 px-2 md:p-6">
                <h2 className="text-2xl font-latin font-semibold text-[#c22400]">
                  Career Counselling — Decisions That Shape Your Future
                </h2>
                <p className="mt-4 text-sm md:text-base text-[#434343] leading-relaxed">
                  Choosing a country or course without understanding long-term outcomes can be costly.
                  Our career counselling goes beyond admissions and focuses on career direction, ROI,
                  and global exposure.
                </p>

                <h3 className="mt-6 font-semibold text-[#0d173f]">What Makes Our Counselling Different?</h3>
                <ul className="list-disc pl-6 mt-2 text-[#434343] space-y-1">
                  <li>Interest & aptitude-based guidance</li>
                  <li>Profile-driven country and course matching</li>
                  <li>Honest feedback — no false promises</li>
                  <li>Interactive student–parent counselling sessions</li>
                </ul>

                <h3 className="mt-6 font-semibold text-[#0d173f]">Who Is This For?</h3>
                <ul className="list-disc pl-6 mt-2 text-[#434343] space-y-1">
                  <li>Students confused between countries or courses</li>
                  <li>Parents seeking clarity on safety, cost & outcomes</li>
                  <li>Students unsure about career direction</li>
                </ul>

                <div className="mt-6">
                  <button
                    onClick={() => (window.location.href = "/contact")}
                    className="rounded-full bg-[#0d173f] text-white px-6 py-2 font-medium cursor-pointer"
                  >
                    Get Free Career Counselling
                  </button>
                </div>
                </div>
              </section>
            )}

            {active === "applications" && (
              <section className="flex flex-col md:flex-row w-full">
                <div className="w-full md:w-1/2 px-2 md:pr-10">
                  <Image
                    src="/Images/university.png"
                    className="w-full h-auto max-h-[600px] object-cover rounded-[8px]"
                    alt="University Applications"
                    unoptimized
                    height={100}
                    width={100}
                  />
                </div>
                <div className="w-full md:w-1/2 py-4 px-2 md:p-6">
                  <h2 className="text-2xl font-latin font-semibold text-[#c22400]">
                    University Applications — Accurate, Transparent & Stress-Free
                  </h2>
                <p className="mt-4 text-sm md:text-base text-[#434343] leading-relaxed">
                  A strong application is not about quantity — it’s about fit and accuracy. We manage
                  the entire application process while keeping students informed at every stage.
                </p>

                  <h3 className="mt-6 font-semibold text-[#0d173f]">Our Application Support Includes</h3>
                  <ul className="list-disc pl-6 mt-2 text-[#434343] space-y-1">
                    <li>University & course shortlisting</li>
                    <li>Application strategy based on intake & deadlines</li>
                    <li>Error-free application submission</li>
                    <li>Regular status updates</li>
                  </ul>

                  <h3 className="mt-6 font-semibold text-[#0d173f]">Why Students Trust Our Process</h3>
                  <ul className="list-disc pl-6 mt-2 text-[#434343] space-y-1">
                    <li>No random applications</li>
                    <li>Clear timelines & documentation checklist</li>
                    <li>Ethical, student-first approach</li>
                  </ul>

                  <div className="mt-6">
                    <button
                      onClick={() => (window.location.href = "/contact")}
                      className="rounded-full bg-[#0d173f] text-white px-6 py-2 font-medium cursor-pointer"
                    >
                      Get a Personalised University Shortlist
                    </button>
                  </div>
                </div>
              </section>
            )}

            {active === "visa" && (
              <section className="flex flex-col md:flex-row w-full">
                <div className="w-full md:w-1/2 px-2 md:pr-10">
                  <Image
                    src="/Images/passport.jpg"
                    className="w-full h-auto max-h-[600px] object-cover rounded-[8px]"
                    alt="Visa Assistance"
                    unoptimized
                    height={100}
                    width={100}
                  />
                </div>
                <div className="w-full md:w-1/2 py-4 px-2 md:p-6">
                  <h2 className="text-2xl font-latin font-semibold text-[#c22400]">
                    Visa Assistance — Precision Over Luck
                  </h2>
                  <p className="mt-4 text-sm md:text-base text-[#434343] leading-relaxed">
                    Most visa rejections happen due to incorrect documentation or poor guidance. Our visa
                    service is built on experience, accuracy, and preparation.
                  </p>

                  <h3 className="mt-6 font-semibold text-[#0d173f]">Why Our Visa Support Works</h3>
                  <ul className="list-disc pl-6 mt-2 text-[#434343] space-y-1">
                    <li>99% visa success rate</li>
                    <li>Country-specific visa experts</li>
                    <li>Financial documentation guidance</li>
                    <li>Mock visa interviews & credibility checks</li>
                  </ul>

                  <h3 className="mt-6 font-semibold text-[#0d173f]">Countries We Support</h3>
                  <p className="mt-2 text-[#434343]">UK | Australia | Canada | Germany | Ireland | France | Italy | New Zealand | Dubai | South Korea</p>

                  <div className="mt-6">
                    <button
                      onClick={() => (window.location.href = "/contact")}
                      className="rounded-full bg-[#0d173f] text-white px-6 py-2 font-medium cursor-pointer"
                    >
                      Get Your Visa Profile Reviewed
                    </button>
                  </div>
                </div>
              </section>
            )}

            {active === "sop" && (
              <section className="flex flex-col md:flex-row w-full">
                <div className="w-full md:w-1/2 px-2 md:pr-10">
                  <Image
                    src="/Images/sop.png"
                    className="w-full h-auto max-h-[600px] object-cover rounded-[8px]"
                    alt="SOP & Documentation"
                    unoptimized
                    height={100}
                    width={100}
                  />
                </div>
                <div className="w-full md:w-1/2 py-4 px-2 md:p-6">
                  <h2 className="text-2xl font-latin font-semibold text-[#c22400]">
                    SOP & Documentation — Profiles That Stand Out
                  </h2>
                  <p className="mt-4 text-sm md:text-base text-[#434343] leading-relaxed">
                    Your Statement of Purpose is your story — and it must be clear, genuine, and convincing. We
                    help students present their profile accurately and confidently.
                  </p>

                  <h3 className="mt-6 font-semibold text-[#0d173f]">Our SOP & Documentation Support</h3>
                  <ul className="list-disc pl-6 mt-2 text-[#434343] space-y-1">
                    <li>One-on-one SOP brainstorming</li>
                    <li>Structured, plagiarism-free SOP drafting</li>
                    <li>Document review & refinement</li>
                    <li>University-specific customization</li>
                  </ul>

                  <h3 className="mt-6 font-semibold text-[#0d173f]">Ideal For</h3>
                  <ul className="list-disc pl-6 mt-2 text-[#434343] space-y-1">
                    <li>Students unsure how to present their story</li>
                    <li>Applicants targeting competitive universities</li>
                    <li>Students with career gaps or profile concerns</li>
                  </ul>

                  <div className="mt-6">
                    <button
                      onClick={() => (window.location.href = "/contact")}
                      className="rounded-full bg-[#0d173f] text-white px-6 py-2 font-medium cursor-pointer"
                    >
                      Get Your SOP Reviewed by Experts
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

