"use client";
import React from 'react';
import { WorkoutProvider } from '../context/WorkoutContext';
import { Toaster } from 'react-hot-toast';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <WorkoutProvider>
      <Toaster 
        position="bottom-right" 
        toastOptions={{ 
          style: { 
            background: '#17181c', 
            color: '#fff', 
            border: '1px solid rgba(255,255,255,0.1)' 
          } 
        }} 
      />
      {children}
    </WorkoutProvider>
  );
}
