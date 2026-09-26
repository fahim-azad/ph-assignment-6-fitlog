"use client";
import React from 'react';
import toast from 'react-hot-toast';
import { useWorkouts, Workout } from '../../../context/WorkoutContext';

export default function WorkoutButtons({ workout }: { workout: Workout }) {
  const { plannedWorkouts, addPlanned, addSaved } = useWorkouts();
  
  const isPlanFull = plannedWorkouts.length >= 5;

  const handleAddPlanned = () => {
    const success = addPlanned(workout);
    if (success) {
      toast.success("Added to today's plan", {
        icon: '✅',
        style: { background: '#ffffff', color: '#000000', fontWeight: 'bold' }
      });
    } else {
      toast.error("Cannot add twice", {
        style: { background: '#ffffff', color: '#000000', fontWeight: 'bold' }
      });
    }
  };

  const handleAddSaved = () => {
    const success = addSaved(workout);
    if (success) {
      toast.success("Saved for later", {
        icon: '🔖',
        style: { background: '#ffffff', color: '#000000', fontWeight: 'bold' }
      });
    } else {
      toast.error("Cannot save twice", {
        style: { background: '#ffffff', color: '#000000', fontWeight: 'bold' }
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-10">
      <button 
        onClick={handleAddPlanned}
        disabled={isPlanFull}
        className={`btn flex-1 border-none text-black font-bold min-h-[3.5rem] h-14 ${
          isPlanFull 
            ? 'bg-neutral-600 text-neutral-400 cursor-not-allowed' 
            : 'bg-[#ccff00] hover:bg-[#b8e600]'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
        {isPlanFull ? "Plan is full (5/5)" : "Add to today's plan"}
      </button>
      <button 
        onClick={handleAddSaved}
        className="btn flex-1 bg-transparent border border-white/10 hover:border-white/30 hover:bg-white/5 text-white font-medium min-h-[3.5rem] h-14"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
        Save for later
      </button>
    </div>
  );
}
