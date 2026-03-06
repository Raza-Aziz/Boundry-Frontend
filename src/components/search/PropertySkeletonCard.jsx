import { Skeleton } from "@/components/ui/skeleton";

export function PropertyCardSkeleton() {
  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden bg-white dark:bg-stone-900 shadow-sm">
      {/* Aspect Ratio Box for Image */}
      <Skeleton className="aspect-[4/3] w-full rounded-none" />

      <div className="p-4 space-y-3">
        {/* Title and Price */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>

        {/* Location */}
        <Skeleton className="h-3 w-full" />

        {/* Specs (Beds, Baths, Sqft) */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </div>
  );
}
