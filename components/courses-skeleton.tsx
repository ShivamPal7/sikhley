import React from 'react';
import { CourseCardSkeleton } from './course-card-skeleton';

export const CourseSkeleton = () => {
  const skeletonArray = Array(6).fill(0); // Simulate 4 skeleton items

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {skeletonArray.map((_, index) => (
        <CourseCardSkeleton key={index} />
      ))}
    </div>
  );
};
