"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "phosphor-react";
export default function Herosection(){
    return(
        <div className="fixed top-0 left-0 h-[100vh] w-[100vw] overflow-hidden z-0 bg-[#fff]">
        <div className="text-black relative   max-w-5xl mx-auto mt-32 sm:h-full  sm:mt-14 xl:h-auto xl:mt-38 px-2 xl:px-0 flex flex-col items-center justify-center">
          <h1 className="font-bold text-[#0d173f] max-w-4xl text-[32px] sm:text-[56px] text-center font-latin">Your Journey to Study Abroad Starts Here</h1>
        
          <p className="text-sm sm:text-[18px] text-[#0d173f] max-w-5xl text-center mt-4 leading-6 font-secondary font-medium">At <span className="text-[#c44200]">Komet Study Abroad</span> , we help students and parents make clear, confident, and correct 
decisions about international education. No fake promises. No pressure tactics. Just honest 
guidance that leads to real results.</p>
   {/* CTA Button */}
   <Link 
           href=""
          className="rounded-full flex gap-2 border-2 mt-10 bg-[#0d173f] font-secondary px-4 py-2 text-md font-semibold text-[#DCCFB8] transition hover:bg-[#DCCFB8] hover:text-[#0d173f] relative z-10"
          >
            Book Free Counselling <ArrowUpRight size={24}/>
          </Link>
        </div>
        <div className="flex w-full items-center justify-center">
          <Image src="/Images/scooter.gif" className="absolute bottom-50  md:bottom-30 z-10 h-[180px] w-[260px] flex sm:hidden xl:flex items-center justify-center" alt="" height={100} width={100} />
        </div>
        <div className="absolute bottom-[-260px] sm:bottom-[-850px] left-0 flex sm:hidden xl:flex items-center justify-center w-full ">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 40,
             
              ease: "linear",
            }}
          >
            <Image
              className="min-h-[580px] scale-[2] sm:scale-[1] md:h-[1500px] min-w-[580px] md:w-[1500px]"
              quality={100}
              src="/Images/world.png"
              unoptimized
              alt=""
              height={100}
              width={100}
            />
          </motion.div>
        </div>
        
        </div>
    )
}