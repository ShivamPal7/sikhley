export const CourseCardSkeleton = () => {
    return (
      <div className="animate-pulse hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        {/* Image Skeleton */}
        <div className="relative w-full aspect-video bg-gray-300 rounded-md"></div>
  
        <div className="flex flex-col pt-2">
          {/* Title Skeleton */}
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
  
          {/* Category Skeleton */}
          <div className="h-3 bg-gray-200 rounded w-1/4 mb-3"></div>
  
          {/* Chapters Length Skeleton */}
          <div className="my-3 flex items-center gap-x-2">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
  
          {/* Progress Bar or Price Skeleton */}
          <div className="h-4 bg-gray-300 rounded w-2/4"></div>
        </div>
      </div>
    );
  };
  