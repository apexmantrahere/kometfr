"use client";

import Link from "next/link";
import { CheckCircle, X } from "phosphor-react";
import { useContactForm } from "@/hooks/useContactForm";

export default function ContactPage() {
  const { formData, handleChange, handleSubmit, status, showSuccessModal, setShowSuccessModal } = useContactForm();

  return (
    <div className="min-h-screen bg-white">  {/* Success modal – stays until user closes */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 ">
          <div className="absolute inset-0  bg-black/70" aria-hidden />
          <div className="relative  bg-white  backdrop-blur-[10px] rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition"
              aria-label="Close"
            >
              <X size={24} className="text-[#0d173f]" weight="bold" />
            </button>
            <div className="flex justify-center mb-6">
              <CheckCircle size={72} className="text-[#0d173f]"  />
            </div>
            <h3 className="text-xl font-latin font-bold text-[#c44200] mb-3">
             <strong> Thank you for trusting us </strong>
            </h3>
            <p className="text-[#434343] font-secondary leading-relaxed mb-6">
              We’ve received your message and will get back to you soon. Our team is here to help you with your study abroad journey.
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

      {/* Form Section */}
      <div className="pt-10 md:pt-24 py-24 px-4 md:px-8 mt-[80px] md:mt-[60px]">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="w-full bg-transparent">
            <div className="mb-10 text-center">
              <h3 className="text-[26px] md:text-3xl font-latin font-bold text-[#c44200] mb-3">
                <strong>We’re Here to Help You Decide Right</strong>
              </h3>
              <p className="text-base font-medium font-secondary text-[#0d173f] leading-relaxed">
              Share a few details, and our experts will guide you step by step — starting today.
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

            <div className="mt-4">
              {status.type === "error" && (
                <p className="text-sm text-red-600 mb-2">{status.message}</p>
              )}
              <button
                type="submit"
                disabled={status.type === "loading"}
                className="mt-2 w-full py-3.5 rounded-full bg-[#0d173f] font-secondary font-semibold text-[#FAF3e0] transition hover:bg-[#0d173f]/90 focus:ring-2 focus:ring-[#c44200] focus:ring-offset-2 focus:outline-none disabled:opacity-60"
              >
                {status.type === "loading" ? "Sending..." : "Get Free Advice"}
              </button>
            </div>
          </form>
        </div>
      </div>



      <div className="max-w-[1000px] mx-auto ">
        <h2 className="text-2xl md:text-3xl font-latin font-bold text-[#c44200] px-4 mb-16 text-center"><strong>Other ways to reach us</strong></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-24 px-4">
          <Link href="https://wa.me/919876543210" className=" px-4 py-8 rounded-[24px] flex flex-col items-center justify-center hover:border-2 border-[#0d173f] bg-[#EFE2CB]">
         <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><g fill="none" stroke="#0d173f" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path stroke-dasharray="70" d="M3 19.5v-15.5c0 -0.55 0.45 -1 1 -1h16c0.55 0 1 0.45 1 1v12c0 0.55 -0.45 1 -1 1h-14.5Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="70;0"/></path><g stroke-dasharray="10" stroke-dashoffset="10"><path d="M8 7h8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" to="0"/></path><path d="M8 10h8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" to="0"/></path></g><path stroke-dasharray="6" stroke-dashoffset="6" d="M8 13h4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" to="0"/></path></g></svg>
              <h3 className="text-lg font-latin font-bold text-[#c44200] mb-2 mt-4"><strong>WhatsApp</strong></h3>
              <p className="text-sm font-secondary font-medium text-[#0d173f] mb-3">+91 98765 43210</p>
            </Link>


            <Link href="mailto:info@kometstudyabroad.com" className=" px-4 py-8 rounded-[24px] flex flex-col items-center justify-center hover:border-2 border-[#0d173f] bg-[#EFE2CB]">


            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><defs><mask id="SVGwmTVw6iw"><path fill="#fff" fill-opacity="0" d="M12 11l-8 -5h16l-8 5Z"><animate fill="freeze" attributeName="fill-opacity" begin="4.5s" dur="0.75s" to="0.3"/></path><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path stroke-dasharray="66" d="M4 5h16c0.55 0 1 0.45 1 1v12c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-12c0 -0.55 0.45 -1 1 -1Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="3s" values="66;0"/></path><path stroke-dasharray="24" stroke-dashoffset="24" d="M3 6.5l9 5.5l9 -5.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="3s" dur="1.5s" to="0"/></path></g><path d="M19 13c3.31 0 6 2.69 6 6c0 3.31 -2.69 6 -6 6c-3.31 0 -6 -2.69 -6 -6c0 -3.31 2.69 -6 6 -6Z" opacity="0"><set fill="freeze" attributeName="opacity" begin="5.75s" to="1"/></path></mask></defs><path fill="#0D173f" d="M0 0h24v24H0z" mask="url(#SVGwmTVw6iw)"/><g fill="none" stroke="#0D173f" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path stroke-dasharray="8" stroke-dashoffset="8" d="M19 21v-5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="5.75s" dur="1s" to="0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M19 16l2 2M19 16l-2 2"><animate fill="freeze" attributeName="stroke-dashoffset" begin="6.75s" dur="1s" to="0"/></path></g></svg>

              <h3 className="text-lg font-latin font-bold text-[#c44200] mb-2 mt-4"><strong>Email</strong></h3>
              <p className="text-sm font-secondary font-medium text-[#0d173f] mb-3">info@kometstudyabroad.com</p>
            </Link>



            <Link href="https://maps.app.goo.gl/zDQFFHpsDQ48fUfE9" className="px-4 py-8 rounded-[24px] flex flex-col items-center justify-center hover:border-2 border-[#0d173f] bg-[#EFE2CB]">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="none" stroke="#0d173f" stroke-dasharray="48" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 20.5c0 0 -6 -7 -6 -11.5c0 -3.31 2.69 -6 6 -6c3.31 0 6 2.69 6 6c0 4.5 -6 11.5 -6 11.5Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="3s" values="48;0"/></path><circle cx="12" cy="9" fill="#0d173f"><animate fill="freeze" attributeName="r" begin="3.5s" dur="1s" to="2.5"/></circle></svg>
                <h3 className="text-lg font-latin font-bold text-[#c44200] mb-2 mt-4"><strong>Address</strong></h3>
                <p className="text-sm font-secondary font-medium text-[#0d173f] mb-3">Raipur , Chhattisgrah</p>
              </Link>
            
          </div>

    </div>

    
    </div>
  );
}
