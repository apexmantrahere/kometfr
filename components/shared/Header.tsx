"use client";
import Image from "next/image";
import { List } from "phosphor-react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

const SCROLL_THRESHOLD = 20;

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const bgClass = isHome ? "bg-[#0d173f]" : "bg-[#0d173f]";
  const iconColor = isHome ? "white" : "white";
  const borderClass = isHome ? "border-white" : "border-white";
  const decorativeBgClass = isHome ? "bg-white" : "bg-white";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= SCROLL_THRESHOLD) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <header
        className={`fixed ${bgClass} top-0 left-0 z-[100] w-full  shadow-sm transition-transform duration-300 ease-out ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-row-reverse md:flex-row items-center justify-between px-6  md:px-16 py-2 ">
          
       <div className="w-auto md:w-[180px]">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="hover:opacity-70 transition-opacity"
          aria-label="Open menu"
        >
          <List size={32} color={iconColor} />
        </button>
       </div>

   {/* Logo */}
   <div className="h-[80px] w-[80px] md:h-[100px] md:w-[100px] font-extrabold tracking-wide text-gray-900">
          <Image src="/Images/Logo/Komet_Logo.svg" alt="logo" className="brightness-[40]" width={100} height={100} />
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4 w-[180px] relative">
          
        
          {/* CTA Button */}
          <button 
            className={`rounded-full border-2 border-white text-white hover:bg-white hover:text-[#0d173f] font-secondary px-8 py-2 text-md font-semibold transition relative z-10`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => window.location.href = "/contact"}
          >
            Contact Us 
          </button>

          {/* Comment Box */}


          {isHovered && (
          <div className={`absolute -right-6 top-full mt-7 w-68 bg-white rounded-lg shadow-xl border-2 ${borderClass} animate-in fade-in slide-in-from-top-2 duration-200`}>
  {/* Comment bubble tail */}
  <div className="absolute -top-4 right-14 w-10 h-10 bg-white border-2 border-[#0d173f] transform rotate-45"></div>
  
  {/* Decorative rotated border for fancy vibe */}
  <div className="absolute -inset-0 -mb-2 -mr-2 bg-[#0d173f] rounded-lg transform -z-1 -rotate-0 pointer-events-none"></div>
  {/* Or for a more subtle effect: */}
  {/* <div className="absolute -inset-2 border-2 border-[#0d173f]/30 rounded-lg transform rotate-1 pointer-events-none"></div> */}
  
  {/* Comment content */}
  <div className="relative z-10 p-4 rounded-[20px] bg-white">
    <p className="text-sm text-gray-700 leading-relaxed">
      <span className="font-bold text-[#081E6B] font-secondary">Let's start your journey together!</span>
      <br />
      <span className="text-gray-700 font-medium font-secondary">We're here to help you achieve your study abroad dreams. Reach out and let's make it happen! 🌟</span>
    </p>
  </div>
</div>
)}
         
        </div>
      </div>
    </header>
    </>
  );
}
