import React from 'react';
import Image from 'next/image';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6 sm:px-10 mt-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Image 
          src={logo} 
          alt="FitLog Logo Icon" 
          width={24} 
          height={24} 
          className="w-auto h-5 sm:h-6"
        />
        <span 
          className="text-white font-bold text-lg tracking-wider uppercase"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          FITLOG
        </span>
      </div>
      <p className="text-[#808080] text-xs sm:text-[13px]">
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </p>
    </footer>
  );
}
