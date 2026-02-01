"use client";

import { CheckCircle, X } from "phosphor-react";
import { useContactForm } from "@/hooks/useContactForm";

export default function WhoWeAreSection() {
  const { formData, handleChange, handleSubmit, status, showSuccessModal, setShowSuccessModal } = useContactForm();

  const panel = (
    <div className="flex flex-col md:flex-row items-center justify-center h-full w-full max-w-[1400px] mx-auto px-8 md:px-12">
      {/* Left: Who We Are */}
      <div className="w-full md:w-1/2 flex items-center justify-center pr-8 md:pr-12">
        <div className="max-w-xl">
          <h2 className="text-[24px] md:text-4xl md:text-5xl font-latin font-bold text-[#c44200] mb-6">
           Who We Are
          </h2>
          <p className="text-sm md:text-lg font-secondary text-[#0d173f] leading-relaxed font-medium">
            Komet Study Abroad is built on one belief:{" "}
            <strong className="text-[#0d173f]">Global exposure changes lives — when guided correctly.</strong>
          </p>
          <p className="text-sm md:text-lg hidden md:block font-secondary text-[#0d173f] leading-relaxed font-medium mt-4">
            We are not agents chasing commissions. We are education partners helping students make
            decisions they&apos;ll never regret.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center pl-0 md:pl-12">
        <form
          onSubmit={handleSubmit}
          className="w-full  bg-transparent pt-10 md:p-8"
        >
          <div className="mb-4 md:mb-8">
            <h3 className="text-[22px] md:text-2xl md:text-3xl font-latin font-bold text-[#c44200] mb-3">
             Take the First Step — It&apos;s Free
            </h3>
            <p className="text-base hidden md:block font-medium font-secondary text-[#0d173f] leading-relaxed">
              Your study abroad journey doesn&apos;t start with an application. It starts with the
              right advice.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-secondary font-semibold text-[#0d173f] mb-1.5"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-0 py-3 rounded-none border-0 border-b-2 border-[#0d173f]/20 font-secondary text-[#0d173f] placeholder-[#0d173f]/40 focus:border-b-2 focus:border-[#c44200] focus:outline-none focus:ring-0 transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-secondary font-semibold text-[#0d173f] mb-1.5"
              >
                Contact number
              </label>
              <input
                id="contact"
                name="contact"
                type="tel"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full px-0 py-3 rounded-none border-0 border-b-2 border-[#0d173f]/20 font-secondary text-[#0d173f] placeholder-[#0d173f]/40 focus:border-b-2 focus:border-[#c44200] focus:outline-none focus:ring-0 transition"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-secondary font-semibold text-[#0d173f] mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-0 py-3 rounded-none border-0 border-b-2 border-[#0d173f]/20 font-secondary text-[#0d173f] placeholder-[#0d173f]/40 focus:border-b-2 focus:border-[#c44200] focus:outline-none focus:ring-0 transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-secondary font-semibold text-[#0d173f] mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={2}
                className="w-full px-0 py-3 rounded-none border-0 border-b-2 border-[#0d173f]/20 font-secondary text-[#0d173f] placeholder-[#0d173f]/40 focus:border-b-2 focus:border-[#c44200] focus:outline-none focus:ring-0 transition resize-none"
                placeholder="Tell us about your goals..."
              />
            </div>
          </div>

          {status.type === "error" && (
            <p className="text-sm text-red-600 mt-2 mb-2">{status.message}</p>
          )}
          <button
            type="submit"
            disabled={status.type === "loading"}
            className="mt-6 w-full py-3.5 rounded-full bg-[#0d173f] font-secondary font-semibold text-[#FAF3e0] transition hover:bg-[#0d173f]/90 focus:ring-2 focus:ring-[#c44200] focus:ring-offset-2 focus:outline-none disabled:opacity-60"
          >
            {status.type === "loading" ? "Sending..." : "Get Free Advice"}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="relative bg-white pt-20 pb-26">
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" aria-hidden />
          <div className="relative bg-white backdrop-blur-[10px] rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition"
              aria-label="Close"
            >
              <X size={24} className="text-[#0d173f]" weight="bold" />
            </button>
            <div className="flex justify-center mb-6">
              <CheckCircle size={72} className="text-[#0d173f]" />
            </div>
            <h3 className="text-xl font-latin font-bold text-[#c44200] mb-3">
              <strong>Thank you for trusting us</strong>
            </h3>
            <p className="text-[#434343] font-secondary leading-relaxed mb-6">
              We&apos;ve received your message and will get back to you soon. Our team is here to help you with your study abroad journey.
            </p>
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 rounded-full bg-[#0d173f] font-secondary font-semibold text-[#FAF3e0] hover:bg-[#0d173f]/90 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {panel}
    </div>
  );
}
