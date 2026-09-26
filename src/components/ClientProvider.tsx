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
            background: '#ffffff', 
            color: '#000000', 
            fontWeight: 'bold',
            borderRadius: '10px'
          } 
        }} 
      />
      {children}
    </WorkoutProvider>
  );
}
