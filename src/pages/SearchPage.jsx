import FiltersSidebar from "../components/search/FiltersSidebar";
import SearchPropertyCard from "../components/search/SearchPropertyCard";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { useState } from "react";
import { PropertyCardSkeleton } from "../components/search/PropertySkeletonCard";
import { Slider } from "@/components/ui/slider";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const { data, isLoading, isFetching } = useGetListingsQuery(currentFilters);

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
    <div className="min-h-screen bg-boundry-bg-light dark:bg-boundry-bg-dark text-stone-800 dark:text-stone-200 font-display antialiased selection:bg-primary/30 selection:text-primary-dark transition-colors duration-300">
      <Navbar />
      {/* Main Content Area */}
      <div className="max-w-[1600px] pt-28 md:pt-32 mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-12 lg:gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <FiltersSidebar />
          </aside>

          {/* Listings */}
          <main className="col-span-12 lg:col-span-9 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
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

                {/* Mobile Filter Trigger */}
                <div className="lg:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-full flex items-center gap-2 border-stone-200 dark:border-stone-800">
                        <Filter className="w-4 h-4" />
                        <span>Filters</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 border-r border-stone-200 dark:border-stone-800">
                       <SheetHeader className="px-6 py-4 border-b border-stone-100 dark:border-stone-800">
                        <SheetTitle className="font-serif">Find Property</SheetTitle>
                        <SheetDescription>Adjust your search criteria.</SheetDescription>
                      </SheetHeader>
                      <div className="px-6 py-6 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
                        <FiltersSidebar isMobile={true} />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="relative group w-full sm:w-auto">
                  <Select
                    onValueChange={(value) => {
                      if (value === "desc" || value === "asc") {
                        setSortBy("createdAt");
                        setSortOrder(value); 
                      } else if (value.startsWith("price-")) {
                        setSortBy("price");
                        setSortOrder(value === "price-desc" ? "desc" : "asc");
                      } else if (value.startsWith("sqft-")) {
                        setSortBy("areaSqft");
                        setSortOrder(value === "sqft-desc" ? "desc" : "asc");
                      }
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-60 text-stone-700 dark:text-stone-300 font-medium hover:text-primary cursor-pointer focus:outline-none font-body bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 rounded-xl px-4 h-11">
                      <SelectValue placeholder="Sort results" />
                    </SelectTrigger>

                    <SelectContent className="border-stone-200 dark:border-stone-800 rounded-xl">
                      <SelectGroup>
                        <SelectLabel className="text-stone-400 text-[10px] uppercase tracking-widest font-bold px-3 py-2">Date</SelectLabel>
                        <SelectItem value="desc">Newest First</SelectItem>
                        <SelectItem value="asc">Oldest First</SelectItem>
                      </SelectGroup>

                      <SelectSeparator className="bg-stone-100 dark:bg-stone-800" />

                      <SelectGroup>
                        <SelectLabel className="text-stone-400 text-[10px] uppercase tracking-widest font-bold px-3 py-2">Price</SelectLabel>
                        <SelectItem value="price-desc text-xs">High to Low</SelectItem>
                        <SelectItem value="price-asc text-xs">Low to High</SelectItem>
                      </SelectGroup>

                      <SelectSeparator className="bg-stone-100 dark:bg-stone-800" />

                      <SelectGroup>
                        <SelectLabel className="text-stone-400 text-[10px] uppercase tracking-widest font-bold px-3 py-2">Area</SelectLabel>
                        <SelectItem value="sqft-desc">High to Low</SelectItem>
                        <SelectItem value="sqft-asc">Low to High</SelectItem>
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
                  <Link key={prop._id} to={`/listing/${prop._id}`} className="block transform transition-transform hover:-translate-y-1">
                    <SearchPropertyCard property={prop} />
                  </Link>
                ))
              ) : (
                /* Empty State */
                <div className="col-span-full py-32 text-center bg-white dark:bg-stone-900/50 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800">
                   <div className="mx-auto w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-stone-400" />
                  </div>
                  <h3 className="text-lg font-medium text-stone-600 dark:text-stone-300">
                    No properties found
                  </h3>
                  <p className="text-stone-400 text-sm mt-1">
                    Try adjusting your filters or search terms.
                  </p>
                  <Button variant="link" onClick={() => setSearchParams({})} className="mt-4 text-boundry-primary">
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center pt-16 pb-8">
              <Pagination>
                <PaginationContent className="flex-wrap justify-center gap-1">
                  {/* Previous Button */}
                  <PaginationItem>
                    <PaginationPrevious
                      className={`cursor-pointer rounded-xl bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 ${page <= 1 ? "pointer-events-none opacity-50" : ""}`}
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
                            className="cursor-pointer rounded-xl bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800"
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
                          <PaginationEllipsis className="text-stone-400" />
                        </PaginationItem>
                      );
                    }

                    return null;
                  })}

                  {/* Next Button */}
                  <PaginationItem>
                    <PaginationNext
                      className={`cursor-pointer rounded-xl bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 ${page >= pages ? "pointer-events-none opacity-50" : ""}`}
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
