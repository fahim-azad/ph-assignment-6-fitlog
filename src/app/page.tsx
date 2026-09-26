import Image from "next/image";
import Link from "next/link";
import React from "react";
import bannerImg from "../assets/banner.png";

export default function Page() {
  return (
    <main className="flex-1 w-full px-6 sm:px-10 py-8 sm:py-12">
      <section className="bg-[#17181c] rounded-3xl overflow-hidden border border-white/5 relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16 gap-12">
        <div className="flex-1 flex flex-col items-start z-10 xl:max-w-3xl">
          <p className="text-[#ccff00] font-bold text-xs tracking-[0.15em] mb-4 uppercase">
            WORKOUT LIBRARY
          </p>
          <h1
            className="text-5xl md:text-6xl lg:text-[4.5rem] xl:text-7xl font-bold uppercase text-white leading-[1.05] mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            <span className="whitespace-nowrap">TRAIN WITH INTENT. LOG</span> <br className="hidden md:block" /> EVERY SET.
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-[600px]">
            <span className="hidden md:inline whitespace-nowrap">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it</span>
            <span className="md:hidden">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it</span> <br className="hidden md:block" /> into today's plan, and watch the week's work add up.
          </p>
          <Link
            href="#library"
            className="btn no-animation bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold uppercase border-none rounded-md px-8 min-h-[3rem] h-12 text-sm tracking-wide"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        <div className="flex-1 w-full flex justify-center md:justify-end relative">
          <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
            <Image
              src={bannerImg}
              alt="Gym Equipment Banner"
              className="object-contain w-full h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      <section id="library" className="mt-32">
        <h2 className="text-2xl font-bold mb-4 text-white">Library Section</h2>
        <div className="h-64 border border-neutral-800 rounded-xl flex items-center justify-center text-neutral-500">
          Scroll target for Browse Workouts
        </div>
      </section>
    </main>
  );
}