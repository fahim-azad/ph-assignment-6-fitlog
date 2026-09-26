"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWorkouts } from '../../context/WorkoutContext';

export default function MyPlanPage() {
  const { plannedWorkouts, savedWorkouts } = useWorkouts();
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const activeWorkouts = activeTab === 'plan' ? plannedWorkouts : savedWorkouts;

  if (!isClient) return null; // Avoid hydration mismatch on initial render

  return (
    <main className="flex-1 w-full px-6 sm:px-10 py-8 sm:py-16 max-w-[1400px] mx-auto min-h-[60vh]">
      <h1 
        className="text-4xl sm:text-5xl font-bold uppercase text-white mb-8" 
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        My Workspace
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 sm:gap-4 mb-10 border-b border-white/5 pb-4 overflow-x-auto whitespace-nowrap">
        <button 
          onClick={() => setActiveTab('plan')}
          className={`text-sm sm:text-base font-bold uppercase tracking-wide px-5 py-2.5 rounded-lg transition-colors ${
            activeTab === 'plan' 
              ? 'bg-[#ccff00] text-black' 
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Today's Plan ({plannedWorkouts.length})
        </button>
        <button 
          onClick={() => setActiveTab('saved')}
          className={`text-sm sm:text-base font-bold uppercase tracking-wide px-5 py-2.5 rounded-lg transition-colors ${
            activeTab === 'saved' 
              ? 'bg-[#ccff00] text-black' 
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Saved ({savedWorkouts.length})
        </button>
      </div>

      {/* Content */}
      {activeWorkouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-neutral-500 text-lg mb-4">
            You don't have any workouts here yet.
          </p>
          <Link 
            href="/"
            className="btn btn-outline border-white/20 text-white hover:bg-white/5 hover:border-white/40"
          >
            Browse Library
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeWorkouts.map((workout) => (
            <div 
              key={workout.id}
              className="bg-[#17181c] rounded-2xl overflow-hidden border border-white/5 flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image 
                  src={workout.image} 
                  alt={workout.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 
                  className="text-white font-bold text-2xl uppercase tracking-wide mb-2"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {workout.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {workout.muscleGroups.map((group) => (
                    <span 
                      key={group}
                      className="bg-[#ccff00] text-black text-[10px] font-bold uppercase px-2.5 py-1 rounded-full tracking-wider"
                    >
                      {group}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/workouts/${workout.id}`}
                  className="btn bg-[#ccff00] hover:bg-[#b8e600] border-none text-black font-bold uppercase w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
