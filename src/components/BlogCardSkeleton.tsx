import { Skeleton } from "@/components/ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      {/* Image Placeholder */}
      <div className="relative w-full h-48 bg-gray-200">
        <Skeleton className="w-full h-full" />
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        {/* Category and Date */}
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-6 w-24 rounded-full" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        
        {/* Title */}
        <div className="mb-4 space-y-2">
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-3/4" />
        </div>
        
        {/* Excerpt */}
        <div className="mb-4 space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Read More Link */}
        <div className="mt-auto pt-2">
          <Skeleton className="h-5 w-28" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;