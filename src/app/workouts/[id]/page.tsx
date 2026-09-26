import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import WorkoutButtons from './WorkoutButtons';
import { Workout } from '../../../context/WorkoutContext';

async function getWorkout(id: string): Promise<Workout | null> {
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function WorkoutDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const workout = await getWorkout(resolvedParams.id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="flex-1 w-full px-6 sm:px-10 py-8 sm:py-16 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left Side: Visual/Media */}
        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[4/5] overflow-hidden rounded-3xl border border-white/5">
          <Image 
            src={workout.image} 
            alt={workout.name} 
            fill 
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Sections */}
        <div className="flex flex-col lg:pt-4">
          <h1 
            className="text-4xl sm:text-5xl lg:text-5xl font-bold uppercase text-white mb-4"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            {workout.name}
          </h1>
          <p className="text-neutral-400 text-base leading-relaxed mb-6">
            {workout.description}
          </p>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {workout.muscleGroups.map((group) => (
              <span 
                key={group}
                className="bg-[#ccff00] text-black text-[11px] font-bold uppercase px-3 py-1 rounded-full tracking-wide"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Key Specs Table */}
          <div className="bg-[#17181c] border border-white/5 rounded-2xl p-6 mb-8 flex flex-col gap-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/5 text-sm">
              <span className="text-neutral-500 font-medium">EQUIPMENT</span>
              <span className="text-neutral-300 font-medium">{workout.equipment}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/5 text-sm">
              <span className="text-neutral-500 font-medium">DIFFICULTY</span>
              <span className="text-neutral-300 font-medium">{workout.difficulty}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/5 text-sm">
              <span className="text-neutral-500 font-medium">SETS</span>
              <span className="text-neutral-300 font-medium">{workout.sets}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/5 text-sm">
              <span className="text-neutral-500 font-medium">REPS</span>
              <span className="text-neutral-300 font-medium">{workout.reps}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/5 text-sm">
              <span className="text-neutral-500 font-medium">DURATION</span>
              <span className="text-neutral-300 font-medium">{workout.duration} min</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/5 text-sm">
              <span className="text-neutral-500 font-medium">CALORIES</span>
              <span className="text-neutral-300 font-medium">{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-500 font-medium">RATING</span>
              <span className="text-neutral-300 font-medium">{workout.rating}</span>
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <h3 className="text-lg font-bold uppercase text-white mb-4 tracking-widest">INSTRUCTIONS</h3>
          <ol className="space-y-4 list-decimal list-outside ml-4 text-neutral-400 leading-relaxed text-sm">
            {workout.instructions.map((step, idx) => (
              <li key={idx} className="pl-2"><span className="text-neutral-300">{step}</span></li>
            ))}
          </ol>

          {/* Call-to-action buttons */}
          <WorkoutButtons workout={workout} />
        </div>
      </div>
    </main>
  );
}
