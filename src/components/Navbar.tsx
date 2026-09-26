"use client";

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';
import logo from '../assets/logo.png';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="navbar bg-[#0b0c10] border-b border-white/5 px-6 sm:px-10 py-3">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden px-2 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-[#17181c] border border-white/10 rounded-box w-52">
            <li><Link href="/" className="text-white py-2">Workout</Link></li>
            <li><Link href="/my-plan" className="text-white py-2">My Plan</Link></li>
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image src={logo} alt="FitLog Logo" width={32} height={32} className="w-7 h-7 sm:w-8 sm:h-8" />
          <span className="text-white font-bold text-lg sm:text-xl tracking-widest mt-1">FITLOG</span>
        </Link>
      </div>
      
      <div className="navbar-center hidden md:flex gap-2">
        <Link 
          href="/" 
          className={`btn btn-sm no-animation shadow-none focus:outline-none rounded-full font-medium px-5 h-9 min-h-9 ${
            pathname === '/'
              ? 'bg-[#1f2812] text-[#ccff00] hover:bg-[#2a3618] border-none' 
              : 'btn-ghost text-neutral-400 hover:text-white hover:bg-transparent border-none'
          }`}
        >
          Workout
        </Link>
        <Link 
          href="/my-plan" 
          className={`btn btn-sm no-animation shadow-none focus:outline-none rounded-full font-medium px-5 h-9 min-h-9 ${
            pathname === '/my-plan' 
              ? 'bg-[#1f2812] text-[#ccff00] hover:bg-[#2a3618] border-none' 
              : 'btn-ghost text-neutral-400 hover:text-white hover:bg-transparent border-none'
          }`}
        >
          My Plan
        </Link>
      </div>

      <div className="navbar-end gap-4 sm:gap-8">
        <Link href="/my-plan" className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-white font-medium text-sm">Plan</span>
          <div className="badge bg-[#ccff00] text-black w-7 h-7 rounded-full font-bold border-none">
            0
          </div>
        </Link>
        <Link href="/my-plan" className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-neutral-400 font-medium text-sm">Saved</span>
          <div className="badge badge-outline border-neutral-700 text-neutral-400 w-7 h-7 rounded-full font-bold">
            0
          </div>
        </Link>
      </div>
    </div>
  );
}
