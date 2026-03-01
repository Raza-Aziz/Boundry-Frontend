import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { Building2, Plus, Search, SlidersHorizontal, User } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import SidebarMenu from "../components/profile/SidebarMenu";
import PropertyTable from "../components/userListings/PropertyTable";
import {
  useGetUserListingsQuery,
  useUpdateAcquiredStatusMutation,
} from "../store/api/listingsApi";

const sidebarLinks = [
  { label: "Profile", icon: User, active: false, path: "/u/profile" },
  {
    label: "My Listings",
    icon: Building2,
    active: true,
    path: "/u/listings",
  },
];

const STATUS_OPTIONS = [
  "All",
  "Active",
  "Pending",
  "Draft",
  "Sold",
  "Rejected",
];
const PAGE_SIZE = 5;

export default function UserListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [updateStatus] = useUpdateAcquiredStatusMutation();

  // 1. READ ALL STATE FROM URL
  // This ensures that if someone bookmarks the page, the filters and search stay active.
  const page = Number(searchParams.get("page")) || 1;
  const statusFilter = searchParams.get("status") || "All";
  const searchQuery = searchParams.get("search") || "";

  // 2. PASS ALL PARAMS TO THE HOOK
  // FIXED: The backend was previously returning a plain array and the API slice was ignoring `status` and `search` params.
  // I updated `listingsApi.js` to correctly pass all params and the backend `listingController.js`
  // to return an object `{ userListings, totalMatches, page, pages }` so that this file destructured `data` correctly.
  const { data, isLoading } = useGetUserListingsQuery({
    page,
    status: statusFilter === "All" ? "" : statusFilter.toLowerCase(),
    search: searchQuery,
  });

  // HELPER: Update URL params without losing existing ones
  const updateParams = (newParams) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      Object.entries(newParams).forEach(([key, value]) => {
        if (value) next.set(key, value);
        else next.delete(key);
      });
      return next;
    });
  };

  // 3. HANDLERS NOW UPDATE THE URL
  const handleStatusChange = (status) => {
    updateParams({ status, page: 1 }); // Reset to page 1 when filter changes
  };

  const handleSearch = (e) => {
    updateParams({ search: e.target.value, page: 1 }); // Reset to page 1 when search changes
  };

  const handlePageChange = (newPage) => {
    updateParams({ page: newPage });
  };

  // 4. STATS LOGIC
  // Note: Since you are now paginating on the server, you should ideally get
  // these counts from a separate 'stats' API call or from the 'data' object.
  // Using a placeholder for now to keep the UI populated.
  const stats = {
    total: data?.totalMatches || 0,
    active:
      data?.userListings?.filter(
        (l) => l.isApproved === true && l.acquiredStatus === null,
      ).length || 0,
    pending:
      data?.userListings?.filter(
        (l) => l.isApproved === false && l.acquiredStatus === null,
      ).length || 0,
    sold:
      data?.userListings?.filter((l) => l.acquiredStatus === "sold" || "rented")
        .length || 0,
  };

  const handleEdit = (id) => console.log("Edit:", id);
  const handleDelete = (id) => console.log("Delete:", id);
  const handleView = (id) => console.log("View:", id);
  const handleToggleSold = (id, isChecked) => {
    const listing = data?.userListings?.find((l) => (l.id || l._id) === id);

    let newStatus = null;
    if (isChecked) {
      // If listing is for-rent, then do rented, else Sold
      if (listing?.status === "for-rent") {
        newStatus = "rented";
      } else if (listing?.status === "for-sale") {
        newStatus = "sold";
      }
    }

    console.log(listing?.title, "with status", newStatus);

    updateStatus({ id, acquiredStatus: newStatus });
  };

  return (
    <div className="bg-[#f7f7f6] dark:bg-[#1d1715] text-stone-800 dark:text-stone-200 font-[Inter] antialiased min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-white font-medium">
            Dashboard
          </h1>
          <p className="text-stone-500 mt-2 font-[Poppins] text-sm">
            Manage your account settings and listings.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <SidebarMenu sidebarLinks={sidebarLinks} />

          <main className="col-span-12 lg:col-span-9 space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: "Total Listings",
                  value: stats.total,
                  color: "text-stone-800 dark:text-white",
                },
                {
                  label: "Active",
                  value: stats.active,
                  color: "text-emerald-600 dark:text-emerald-400",
                },
                {
                  label: "Pending Review",
                  value: stats.pending,
                  color: "text-amber-600 dark:text-amber-400",
                },
                {
                  label: "Sold",
                  value: stats.sold,
                  color: "text-stone-500 dark:text-stone-400",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-[#2a2422] rounded-xl border border-stone-100 dark:border-stone-800 px-5 py-4"
                >
                  <p className="text-xs text-stone-400 font-[Poppins] mb-1">
                    {stat.label}
                  </p>
                  <p
                    className={`text-2xl font-serif font-medium ${stat.color}`}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-[#2a2422] rounded-xl border border-stone-100 dark:border-stone-800 p-6 md:p-8">
              <div className="pb-5 border-b border-stone-100 dark:border-stone-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl text-stone-900 dark:text-white font-medium">
                    My Listings
                  </h2>
                </div>
                <Link
                  to="/listings/new"
                  className="inline-flex items-center gap-2 bg-boundry-primary text-white px-4 py-2.5 rounded-full text-sm"
                >
                  <Plus className="w-4 h-4" /> Add Listing
                </Link>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by title..."
                    className="w-full pl-9 pr-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <SlidersHorizontal className="w-4 h-4 text-stone-400" />
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        statusFilter === status
                          ? "bg-boundry-primary text-white"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-500"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table with Pagination Linked to URL */}
              <PropertyTable
                listings={data?.userListings || []}
                isLoading={isLoading}
                currentPage={page}
                totalResults={data?.totalMatches || 0}
                pageSize={PAGE_SIZE}
                onPageChange={handlePageChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                onToggleSold={handleToggleSold}
              />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
