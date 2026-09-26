import Image from "next/image";
import Link from "next/link";
import React from "react";
import bannerImg from "../assets/banner.png";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
}

export default async function Page() {
  const workouts = await getWorkouts();

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

      <section id="library" className="mt-24 sm:mt-32 w-full">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: "var(--font-oswald)" }}>
            THE LIBRARY
          </h2>
          <p className="text-neutral-400 mt-2">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <Link 
              key={workout.id}
              href={`/workouts/${workout.id}`} 
              className="bg-[#17181c] rounded-2xl overflow-hidden border border-white/5 hover:border-[#ccff00] transition-colors group cursor-pointer flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image 
                  src={workout.image} 
                  alt={workout.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {workout.muscleGroups.map((group) => (
                    <span 
                      key={group}
                      className="bg-[#ccff00] text-black text-[10px] font-bold uppercase px-2.5 py-1 rounded-full tracking-wider"
                    >
                      {group}
                    </span>
                  ))}
                </div>
                <h3 
                  className="text-xl font-bold uppercase text-white mb-1"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {workout.name}
                </h3>
                <p className="text-neutral-400 text-sm flex-1">
                  {workout.equipment}
                </p>
                <div className="flex items-center gap-6 text-neutral-400 text-xs font-medium border-t border-white/5 pt-4 mt-4">
                  <div className="flex items-center gap-1.5">
                    <svg className="text-[#ccff00]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>{workout.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="text-[#ccff00]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                    <span>{workout.caloriesBurned} kcal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="text-[#ccff00]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>{workout.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}