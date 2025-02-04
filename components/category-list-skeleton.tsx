"use client";

import { FcLandscape } from "react-icons/fc";

export const CategoryListSkeleton = () => {
  const skeletonArray = Array(6).fill(0); // Assuming 7 category placeholders

  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {skeletonArray.map((_, index) => (
        <button key={index}
        className="p-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 animate-pulse bg-gray-200"
        type="button"
    >
        <div className="w-5 h-5 bg-gray-300 rounded-full"></div> {/* Simulating Icon */}
        <div className="w-24 h-4 bg-gray-300 rounded"></div> {/* Simulating Label */}
    </button>
      ))}
    </div>
  );
};
