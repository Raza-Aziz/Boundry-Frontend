import FiltersSidebar from "../components/search/FiltersSidebar";
import SearchPropertyCard from "../components/search/SearchPropertyCard";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { useState } from "react";
import { PropertyCardSkeleton } from "../components/search/PropertySkeletonCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { Link, useSearchParams } from "react-router-dom";
import { useGetListingsQuery } from "../store/api/listingsApi";

export default function SearchPage() {
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("newest");

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const search = searchParams.get("search") || "";
  const currentFilters = {
    ...Object.fromEntries([...searchParams]),
    page,
    sortBy,
    sortOrder,
    search,
  };

  const { data, isLoading, isFetching, isError, error } =
    useGetListingsQuery(currentFilters);

  const showSkeletons = isLoading || isFetching;

  const pages = data?.pages || 1;
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);

    if (newPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", newPage);
    }

    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-boundry-bg-light dark:bg-background-dark text-stone-800 dark:text-stone-200 font-display antialiased selection:bg-primary/30 selection:text-primary-dark">
      <Navbar />
      {/* Main Content Area */}
      <div className="max-w-[1600px]  mt-12 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <FiltersSidebar />

          {/* Listings */}
          <main className="col-span-12 lg:col-span-9 xl:col-span-9 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center mt-8 justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <h1 className="text-xl md:text-2xl font-serif text-stone-900 dark:text-white">
                {showSkeletons ? (
                  <Skeleton className="h-8 w-48" />
                ) : (
                  <span className="font-normal">
                    {data?.totalMatches || 0}{" "}
                    {data?.totalMatches === 1 ? "Property" : "Properties"} Found
                  </span>
                )}
              </h1>
              <div className="flex gap-3">
                <div className="relative group">
                  <Select
                    onValueChange={(value) => {
                      if (value === "desc" || value === "asc") {
                        setSortBy("createdAt");
                        setSortOrder(value); // or map to "asc"/"desc" if backend expects that
                      } else if (value.startsWith("price-")) {
                        setSortBy("price");
                        setSortOrder(value === "price-desc" ? "desc" : "asc");
                      } else if (value.startsWith("sqft-")) {
                        setSortBy("areaSqft");
                        setSortOrder(value === "sqft-desc" ? "desc" : "asc");
                      }
                    }}
                  >
                    <SelectTrigger className="w-full max-w-80 text-stone-700 dark:text-stone-300 font-medium hover:text-primary cursor-pointer focus:outline-none font-body">
                      <SelectValue placeholder="Sort by Price or Area" />
                    </SelectTrigger>

                    <SelectContent position="popper">
                      <SelectGroup>
                        <SelectLabel>Sort by Date</SelectLabel>
                        <SelectItem value="desc">Newest First</SelectItem>
                        <SelectItem value="asc">Oldest First</SelectItem>
                      </SelectGroup>

                      <SelectSeparator />

                      <SelectGroup>
                        <SelectLabel>Sort by Price</SelectLabel>
                        <SelectItem value="price-desc">
                          Price (High to Low)
                        </SelectItem>
                        <SelectItem value="price-asc">
                          Price (Low to High)
                        </SelectItem>
                      </SelectGroup>

                      <SelectSeparator />

                      <SelectGroup>
                        <SelectLabel>Sort by Area</SelectLabel>
                        <SelectItem value="sqft-desc">
                          Sqft (High to Low)
                        </SelectItem>
                        <SelectItem value="sqft-asc">
                          Sqft (Low to High)
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 transition-opacity duration-200">
              {showSkeletons ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))
              ) : data?.listings?.length > 0 ? (
                data.listings.map((prop) => (
                  <Link key={prop._id} to={`/listing/${prop._id}`}>
                    <SearchPropertyCard property={prop} />
                  </Link>
                ))
              ) : (
                /* Empty State */
                <div className="col-span-full py-20 text-center">
                  <h3 className="text-lg font-medium text-stone-600">
                    No properties found
                  </h3>
                  <p className="text-stone-400">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center pt-12 pb-8">
              <Pagination>
                <PaginationContent>
                  {/* Previous Button */}
                  <PaginationItem>
                    <PaginationPrevious
                      className={`cursor-pointer ${page <= 1 ? "pointer-events-none opacity-50" : ""}`}
                      onClick={() => handlePageChange(page - 1)}
                    />
                  </PaginationItem>

                  {/* Logic to render page numbers */}
                  {[...Array(pages)].map((_, index) => {
                    const pageNum = index + 1;

                    // Logic: Show first page, last page, and pages around the current page
                    if (
                      pageNum === 1 ||
                      pageNum === pages ||
                      (pageNum >= page - 1 && pageNum <= page + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            className="cursor-pointer"
                            isActive={page === pageNum}
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    // Show Ellipsis if there is a gap
                    if (pageNum === page - 2 || pageNum === page + 2) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    return null;
                  })}

                  {/* Next Button */}
                  <PaginationItem>
                    <PaginationNext
                      className={`cursor-pointer ${page >= pages ? "pointer-events-none opacity-50" : ""}`}
                      onClick={() => handlePageChange(page + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
