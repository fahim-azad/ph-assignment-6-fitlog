import React from 'react';

export default function Loading() {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center py-32 min-h-[50vh]">
      <span className="loading loading-spinner loading-lg text-[#ccff00] mb-4"></span>
      <p className="text-neutral-400 font-medium tracking-widest uppercase text-sm">Loading Data...</p>
    </div>
  );
}
