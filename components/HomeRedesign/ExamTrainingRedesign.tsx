"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "phosphor-react";

const points = [
  "Small batches & personalised attention",
  "Real exam patterns & mock tests",
  "Speaking & writing improvement techniques",
  "Fast-track & regular batches available",
];

export default function ExamTrainingRedesign() {
  return (
    <section className="relative w-full bg-white py-16 md:py-24 px-4 md:px-8">
     <div className="flex flex-col lg:flex-row h-full w-full max-w-[1450px] mx-auto items-center justify-center">
      <div className="w-full lg:w-1/2 hidden lg:flex items-center justify-center pl-14 pr-10">
        <div className="relative w-full max-w-lg h-[600px] rounded-lg overflow-hidden">
          <Image
            src="/Images/exam1.jpg"
            alt="Exam Training"
            fill
            className="object-cover rounded-lg"
            unoptimized
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-0 sm:px-12">
        <motion.div className="max-w-2xl">
          <h2 className="text-[28px] md:text-5xl font-latin leading-[1.3] font-bold text-[#c44200]/90 mb-6">
            Exam Training That Delivers Results
          </h2>
          <p className="text-base sm:text-lg font-secondary text-[#0d173f]/80 leading-relaxed mb-6 font-medium">
            Language tests are gateways — and we train you to cross them confidently.
          </p>
          <div className="mb-8">
            <p className="text-base sm:text-xl flex gap-6 font-secondary font-semibold text-[#c44200] mb-4">
              <span>IELTS</span> | <span>PTE</span> | <span>OET</span> | <span>TOEFL</span>
            </p>
          </div>
          <ul className="space-y-5 sm:space-y-4 mb-8">
            {[
              "Small batches & personalised attention",
              "Real exam patterns & mock tests",
              "Speaking & writing improvement techniques",
              "Fast-track & regular batches available",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#0d173f] ">●</span>
                <span className="text-base sm:text-lg font-secondary font-medium text-[#0d173f]">{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border-2 bg-[#0d173f] font-secondary px-6 py-3 text-md font-semibold text-white transition hover:bg-white hover:text-[#0d173f] hover:border-[#0d173f]"
          >
            Attend a Free Demo Class <ArrowUpRight size={24} />
          </Link>
        </motion.div>
      </div>
    </div>
    </section>
  );
}
