import { MapPin } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
        <MapPin className="w-7 h-7 text-stone-400" />
      </div>
      <h3 className="font-serif text-lg text-stone-800 dark:text-stone-200 font-medium mb-1">
        No listings yet
      </h3>
      <p className="text-stone-500 text-sm max-w-xs">
        You haven't listed any properties yet. Click "Add Listing" to get
        started.
      </p>
    </div>
  );
}
