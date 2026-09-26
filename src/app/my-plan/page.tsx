"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useWorkouts } from '../../context/WorkoutContext';

export default function MyPlanPage() {
  const { plannedWorkouts, savedWorkouts, removePlanned, removeSaved } = useWorkouts();
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const activeWorkouts = activeTab === 'plan' ? plannedWorkouts : savedWorkouts;

  const sortedWorkouts = [...activeWorkouts].sort((a, b) => {
    if (sortBy === 'duration') return a.duration - b.duration;
    if (sortBy === 'calories') return a.caloriesBurned - b.caloriesBurned;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const totalExercises = plannedWorkouts.length;
  const totalMinutes = plannedWorkouts.reduce((acc, w) => acc + w.duration, 0);
  const totalCalories = plannedWorkouts.reduce((acc, w) => acc + w.caloriesBurned, 0);

  const handleMarkAsDone = (id: number) => {
    removePlanned(id);
    toast.success('Workout marked as done!', { icon: '✅' });
  };

  return (
    <main className="flex-1 w-full px-6 sm:px-10 py-8 sm:py-16 max-w-[1400px] mx-auto min-h-[70vh]">
      <div className="mb-8">
        <h1 
          className="text-3xl sm:text-4xl font-bold uppercase text-white mb-2" 
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          MY PLAN
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="bg-[#17181c] border border-white/5 rounded-2xl p-6 sm:p-8 mb-10 flex flex-col sm:flex-row gap-8 sm:gap-0 justify-between items-start sm:items-center">
        <div className="flex-1">
          <p className="text-neutral-500 text-xs sm:text-sm font-medium mb-1">Exercises</p>
          <p className="text-[#ccff00] text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
            {totalExercises}
          </p>
        </div>
        <div className="hidden sm:block w-px h-16 bg-white/5 mx-8"></div>
        <div className="flex-1">
          <p className="text-neutral-500 text-xs sm:text-sm font-medium mb-1">Minutes</p>
          <p className="text-white text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
            {totalMinutes}
          </p>
        </div>
        <div className="hidden sm:block w-px h-16 bg-white/5 mx-8"></div>
        <div className="flex-1">
          <p className="text-neutral-500 text-xs sm:text-sm font-medium mb-1">Calories</p>
          <p className="text-white text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-oswald)" }}>
            {totalCalories}
          </p>
        </div>
      </div>

      {/* Controls: Tabs & Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="bg-[#17181c] border border-white/5 p-1 rounded-xl inline-flex">
          <button 
            onClick={() => setActiveTab('plan')}
            className={`text-sm font-bold px-6 py-2 rounded-lg transition-colors ${
              activeTab === 'plan' ? 'bg-[#2a2b30] text-white' : 'text-neutral-500 hover:text-white'
            }`}
          >
            Today's Plan
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            className={`text-sm font-bold px-6 py-2 rounded-lg transition-colors ${
              activeTab === 'saved' ? 'bg-[#2a2b30] text-white' : 'text-neutral-500 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <span>Sort By</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#17181c] border border-white/5 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-white/20"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {sortedWorkouts.length === 0 ? (
        <div className="w-full border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center py-24 sm:py-32 text-center mt-4">
          <h2 className="text-white text-2xl font-bold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
            NOTHING HERE YET
          </h2>
          <p className="text-neutral-400 text-sm mb-6 max-w-sm">
            Browse the library and add a lift to get today moving.
          </p>
          <Link href="/" className="btn bg-[#ccff00] hover:bg-[#b8e600] border-none text-black font-bold uppercase rounded-full px-8 min-h-[2.5rem] h-10 text-xs tracking-wide">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sortedWorkouts.map((workout) => (
            <div key={workout.id} className="bg-[#17181c] rounded-2xl p-4 sm:p-5 border border-white/5 flex flex-col md:flex-row items-center gap-6">
              
              <div className="relative w-full md:w-56 h-40 md:h-28 rounded-xl overflow-hidden shrink-0 border border-white/5">
                <Image src={workout.image} alt={workout.name} fill className="object-cover" />
              </div>

              <div className="flex-1 flex flex-col justify-center w-full">
                <h3 className="text-white font-bold text-xl uppercase tracking-wide mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                  {workout.name}
                </h3>
                <p className="text-neutral-400 text-sm mb-3">
                  {workout.equipment}
                </p>
                <div className="flex items-center gap-4 text-xs font-medium text-neutral-300">
                  <span className="flex items-center gap-1.5"><svg className="text-[#ccff00]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> {workout.duration} min</span>
                  <span className="flex items-center gap-1.5"><svg className="text-[#ccff00]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path></svg> {workout.caloriesBurned} kcal</span>
                  <span className="flex items-center gap-1.5"><svg className="text-[#ccff00]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> {workout.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0 self-end md:self-center">
                <Link href={`/workouts/${workout.id}`} className="btn btn-sm bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-xs rounded-full px-5 h-9 font-medium tracking-wide">
                  View Details
                </Link>
                {activeTab === 'plan' && (
                  <button onClick={() => handleMarkAsDone(workout.id)} className="btn btn-sm bg-[#ccff00] hover:bg-[#b8e600] border-none text-black text-xs rounded-full px-5 h-9 font-bold tracking-wide flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Mark as Done
                  </button>
                )}
                <button onClick={() => activeTab === 'plan' ? removePlanned(workout.id) : removeSaved(workout.id)} className="btn btn-sm btn-circle btn-ghost text-neutral-500 hover:text-white hover:bg-white/5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}
