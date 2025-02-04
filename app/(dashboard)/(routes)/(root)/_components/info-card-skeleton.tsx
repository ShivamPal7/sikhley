export const InfoCardSkeleton = () => {
    return (
        <div className="border rounded-md flex items-center gap-x-2 p-3">
            <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
            <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
        </div>
    )
} 