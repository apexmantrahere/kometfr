"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PageBannerProps {
  label: string;
}

export default function PageBanner({ label }: PageBannerProps) {
  const [showImage, setShowImage] = useState(true);

  return (
    <div className="h-[250px] mt-[70px] md:mt-[110px] bg-[#EFE2CB] flex items-center justify-center relative overflow-hidden">
      {showImage && (
        <motion.div
          initial={{ x: "100%", y: "100%" }}
          animate={{ x: "-100%", y: "-100%" }}
          transition={{
            duration: 10,
            ease: "linear",
          }}
          onAnimationComplete={() => setShowImage(false)}
          className="absolute"
        >
          <Image
            src="/Images/airbus.png"
            alt={label}
            unoptimized
            width={600}
            height={250}
            className="w-[600px] opacity-20 object-cover"
          />
        </motion.div>
      )}
      <div className="text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-latin font-bold text-[#C44200]">
          <strong>{label}</strong>
        </h1>
      </div>
    </div>
  );
}
