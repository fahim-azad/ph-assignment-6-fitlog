"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Workout = {
  id: number;
  name: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  image: string;
  description: string;
  instructions: string[];
};

type WorkoutContextType = {
  plannedWorkouts: Workout[];
  savedWorkouts: Workout[];
  addPlanned: (workout: Workout) => boolean;
  addSaved: (workout: Workout) => boolean;
  removePlanned: (id: number) => void;
  removeSaved: (id: number) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [plannedWorkouts, setPlannedWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedPlanned = localStorage.getItem('plannedWorkouts');
    const storedSaved = localStorage.getItem('savedWorkouts');
    if (storedPlanned) setPlannedWorkouts(JSON.parse(storedPlanned));
    if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
  }, []);

  const addPlanned = (workout: Workout) => {
    if (!plannedWorkouts.find(w => w.id === workout.id)) {
      const newPlanned = [...plannedWorkouts, workout];
      setPlannedWorkouts(newPlanned);
      localStorage.setItem('plannedWorkouts', JSON.stringify(newPlanned));
      return true;
    }
    return false;
  };

  const addSaved = (workout: Workout) => {
    if (!savedWorkouts.find(w => w.id === workout.id)) {
      const newSaved = [...savedWorkouts, workout];
      setSavedWorkouts(newSaved);
      localStorage.setItem('savedWorkouts', JSON.stringify(newSaved));
      return true;
    }
    return false;
  };

  const removePlanned = (id: number) => {
    const newPlanned = plannedWorkouts.filter(w => w.id !== id);
    setPlannedWorkouts(newPlanned);
    localStorage.setItem('plannedWorkouts', JSON.stringify(newPlanned));
  };

  const removeSaved = (id: number) => {
    const newSaved = savedWorkouts.filter(w => w.id !== id);
    setSavedWorkouts(newSaved);
    localStorage.setItem('savedWorkouts', JSON.stringify(newSaved));
  };

  if (!isClient) {
    return (
      <WorkoutContext.Provider value={{ plannedWorkouts: [], savedWorkouts: [], addPlanned, addSaved, removePlanned, removeSaved }}>
        {children}
      </WorkoutContext.Provider>
    );
  }

  return (
    <WorkoutContext.Provider value={{ plannedWorkouts, savedWorkouts, addPlanned, addSaved, removePlanned, removeSaved }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutProvider');
  }
  return context;
}
