import ActionMenu from "./ActionMenu";
import StatusBadge from "./StatusBadge";
import EmptyState from "./EmptyState";
import { MapPin } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";

export default function PropertyTable({
  listings = [],
  onEdit,
  onDelete,
  onView,
  onToggleSold,
  isLoading = false,
  currentPage = 1,
  totalResults = 0,
  pageSize = 5,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalResults / pageSize);
  const startResult = (currentPage - 1) * pageSize + 1;
  const endResult = Math.min(currentPage * pageSize, totalResults);

  const formatPrice = (price) => {
    if (!price) return "—";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col">
      {/* Table wrapper */}
      <div className="overflow-x-auto rounded-xl border border-stone-100 dark:border-stone-800">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/30">
              <th className="py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-stone-400">
                Property
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-stone-400 text-right">
                Price
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-stone-400 text-center">
                Status
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-stone-400">
                Listed
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-stone-400 text-center">
                Mark Sold
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-stone-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
            {isLoading ? (
              // Skeleton rows
              Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i}>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-14 rounded-lg bg-stone-100 dark:bg-stone-800 animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-3.5 w-36 bg-stone-100 dark:bg-stone-800 rounded animate-pulse" />
                        <div className="h-3 w-28 bg-stone-100 dark:bg-stone-800 rounded animate-pulse" />
                      </div>
                    </div>
                  </td>
                  {[...Array(5)].map((_, j) => (
                    <td key={j} className="py-4 px-5">
                      <div className="h-3 w-16 bg-stone-100 dark:bg-stone-800 rounded animate-pulse mx-auto" />
                    </td>
                  ))}
                </tr>
              ))
            ) : listings.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              listings.map((listing) => {
                const isSold = ["sold", "rented"].includes(
                  listing.acquiredStatus?.toLowerCase(),
                );
                const isDraft = listing.status?.toLowerCase() === "draft";

                return (
                  <tr
                    key={listing._id || listing.id}
                    className={`group transition-colors ${
                      isSold
                        ? "bg-stone-50/50 dark:bg-stone-800/10 opacity-75"
                        : "hover:bg-stone-50 dark:hover:bg-stone-800/40"
                    }`}
                  >
                    {/* Property info */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800">
                          {listing.images?.[0]?.url || listing.image ? (
                            <img
                              src={listing.images?.[0]?.url || listing.image}
                              alt={listing.title}
                              className={`h-full w-full object-cover transition-transform group-hover:scale-105 duration-300 ${isSold ? "grayscale" : ""}`}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-stone-300" />
                            </div>
                          )}
                          {isSold && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <span className="text-[9px] font-bold text-white bg-black/50 px-1.5 py-0.5 rounded tracking-wider">
                                SOLD
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link to={`/listing/${listing._id}`}>
                            <p
                              className={`font-semibold text-sm truncate max-w-[200px] ${
                                isSold
                                  ? "line-through text-stone-400 dark:text-stone-500"
                                  : "text-stone-900 dark:text-white"
                              }`}
                            >
                              {listing.title}
                            </p>
                          </Link>
                          <p className="text-stone-400 text-xs mt-0.5 truncate max-w-[200px] flex capitalize text-ellipsis items-center gap-1">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            {listing.location.area +
                              ", " +
                              listing.location.city || "Address not provided"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td
                      className={`py-4 px-5 text-right font-medium ${isSold ? "text-stone-400" : "text-stone-800 dark:text-stone-200"}`}
                    >
                      {formatPrice(listing.price)}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5 text-center">
                      <StatusBadge
                        status={
                          listing?.acquiredStatus
                            ? listing.acquiredStatus
                            : listing.isApproved
                              ? "Active"
                              : "Pending"
                        }
                      />
                    </td>

                    {/* Date */}
                    <td className="py-4 px-5 text-stone-400 text-xs">
                      {formatDate(listing.createdAt || listing.dateAdded)}
                    </td>

                    {/* Sold toggle */}
                    <td className="py-4 px-5 text-center">
                      <Switch
                        disabled={isSold || listing.isApproved === false}
                        checked={isSold}
                        onCheckedChange={(checked) =>
                          onToggleSold?.(listing._id || listing.id, checked)
                        }
                        className="data-[state=checked]:bg-boundry-primary data-[state=unchecked]:bg-black cursor-pointer"
                      />
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <ActionMenu listingId={listing._id || listing.id} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && listings.length > 0 && (
        <div className="flex items-center justify-between mt-4 px-1">
          <p className="text-xs text-stone-400 font-[Poppins]">
            Showing{" "}
            <span className="text-stone-600 dark:text-stone-300 font-medium">
              {startResult}
            </span>{" "}
            to{" "}
            <span className="text-stone-600 dark:text-stone-300 font-medium">
              {endResult}
            </span>{" "}
            of{" "}
            <span className="text-stone-600 dark:text-stone-300 font-medium">
              {totalResults}
            </span>{" "}
            listings
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => onPageChange?.(currentPage - 1)}
              className="px-3.5 py-1.5 cursor-pointer text-xs font-medium text-stone-600 dark:text-stone-300 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
              )
              .reduce((acc, p, i, arr) => {
                if (i > 0 && p - arr[i - 1] > 1) {
                  acc.push("...");
                }
                acc.push(p);
                return acc;
              }, [])
              .map((item, i) =>
                item === "..." ? (
                  <span
                    key={`dots-${i}`}
                    className="px-2 py-1.5 text-xs text-stone-400"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => onPageChange?.(item)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors border cursor-pointer ${
                      item === currentPage
                        ? "bg-boundry-primary text-white border-boundry-primary shadow-sm"
                        : "text-stone-600 dark:text-stone-300 bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}
            <button
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange?.(currentPage + 1)}
              className="px-3.5 py-1.5 cursor-pointer text-xs font-medium text-stone-600 dark:text-stone-300 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
